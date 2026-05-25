from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import logging
import uuid
import re
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Annotated
from bson import ObjectId

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response, status
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr, BeforeValidator


# ---------------------------------------------------------------------------
# Setup
# ---------------------------------------------------------------------------

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_ALGORITHM = "HS256"
JWT_SECRET = os.environ['JWT_SECRET']
ADMIN_EMAIL = os.environ['ADMIN_EMAIL'].lower()
ADMIN_PASSWORD = os.environ['ADMIN_PASSWORD']

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------------------------------------------------------------------------
# Auth Helpers
# ---------------------------------------------------------------------------

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, access_token: str, refresh_token: str):
    response.set_cookie(
        key="access_token", value=access_token, httponly=True,
        secure=False, samesite="lax", max_age=43200, path="/",
    )
    response.set_cookie(
        key="refresh_token", value=refresh_token, httponly=True,
        secure=False, samesite="lax", max_age=604800, path="/",
    )


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------------------------------------------------------------------------
# Pydantic Models
# ---------------------------------------------------------------------------

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str


class BlogPostBase(BaseModel):
    title: str
    excerpt: str
    content: str
    category: str
    image: str = ""
    author: str = "CA Raghav Mittal"
    read_time: str = "5 min read"


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None
    author: Optional[str] = None
    read_time: Optional[str] = None


class BlogPost(BlogPostBase):
    id: str
    slug: str
    published_at: str


class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=30)
    subject: str = Field(..., min_length=2, max_length=200)
    message: str = Field(..., min_length=5, max_length=5000)


class ContactSubmission(ContactSubmissionCreate):
    id: str
    submitted_at: str


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"\s+", "-", text).strip("-")
    return text[:80] or str(uuid.uuid4())[:8]


def serialize_blog(doc: dict) -> dict:
    return {
        "id": str(doc["_id"]),
        "title": doc.get("title", ""),
        "slug": doc.get("slug", ""),
        "excerpt": doc.get("excerpt", ""),
        "content": doc.get("content", ""),
        "category": doc.get("category", "General"),
        "image": doc.get("image", ""),
        "author": doc.get("author", "CA Raghav Mittal"),
        "read_time": doc.get("read_time", "5 min read"),
        "published_at": doc.get("published_at", datetime.now(timezone.utc).isoformat()),
    }


def serialize_contact(doc: dict) -> dict:
    return {
        "id": str(doc["_id"]),
        "name": doc["name"],
        "email": doc["email"],
        "phone": doc["phone"],
        "subject": doc["subject"],
        "message": doc["message"],
        "submitted_at": doc.get("submitted_at", datetime.now(timezone.utc).isoformat()),
    }


# ---------------------------------------------------------------------------
# Auth Routes
# ---------------------------------------------------------------------------

@api_router.post("/auth/login")
async def login(payload: LoginRequest, response: Response):
    email = payload.email.lower()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    user_id = str(user["_id"])
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    set_auth_cookies(response, access_token, refresh_token)

    return {
        "id": user_id,
        "email": user["email"],
        "name": user.get("name", "Admin"),
        "role": user.get("role", "admin"),
    }


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out"}


@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "id": current_user["_id"],
        "email": current_user["email"],
        "name": current_user.get("name", "Admin"),
        "role": current_user.get("role", "admin"),
    }


# ---------------------------------------------------------------------------
# Public Blog Routes
# ---------------------------------------------------------------------------

@api_router.get("/blog")
async def list_blog_posts(category: Optional[str] = None, search: Optional[str] = None):
    query = {}
    if category and category != "All":
        query["category"] = category
    if search:
        query["$or"] = [
            {"title": {"$regex": re.escape(search), "$options": "i"}},
            {"excerpt": {"$regex": re.escape(search), "$options": "i"}},
        ]
    cursor = db.blog_posts.find(query).sort("published_at", -1)
    posts = [serialize_blog(p) async for p in cursor]
    return posts


@api_router.get("/blog/categories")
async def list_categories():
    cats = await db.blog_posts.distinct("category")
    return ["All"] + sorted(cats)


@api_router.get("/blog/{slug}")
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return serialize_blog(post)


# ---------------------------------------------------------------------------
# Admin Blog Routes
# ---------------------------------------------------------------------------

@api_router.post("/admin/blog")
async def create_blog_post(
    payload: BlogPostCreate,
    current_user: dict = Depends(get_current_user),
):
    slug = slugify(payload.title)

    # Make slug unique
    existing = await db.blog_posts.find_one({"slug": slug})
    if existing:
        slug = f"{slug}-{str(uuid.uuid4())[:6]}"

    doc = payload.model_dump()
    doc["slug"] = slug
    doc["published_at"] = datetime.now(timezone.utc).isoformat()
    doc["author_id"] = current_user["_id"]

    result = await db.blog_posts.insert_one(doc)
    doc["_id"] = result.inserted_id
    return serialize_blog(doc)


@api_router.put("/admin/blog/{post_id}")
async def update_blog_post(
    post_id: str,
    payload: BlogPostUpdate,
    current_user: dict = Depends(get_current_user),
):
    try:
        oid = ObjectId(post_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid post id")

    update_data = {k: v for k, v in payload.model_dump().items() if v is not None}
    if "title" in update_data:
        new_slug = slugify(update_data["title"])
        # ensure uniqueness if slug actually changes
        existing = await db.blog_posts.find_one({"slug": new_slug, "_id": {"$ne": oid}})
        if existing:
            new_slug = f"{new_slug}-{str(uuid.uuid4())[:6]}"
        update_data["slug"] = new_slug

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = await db.blog_posts.update_one({"_id": oid}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")

    updated = await db.blog_posts.find_one({"_id": oid})
    return serialize_blog(updated)


@api_router.delete("/admin/blog/{post_id}")
async def delete_blog_post(
    post_id: str,
    current_user: dict = Depends(get_current_user),
):
    try:
        oid = ObjectId(post_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid post id")
    result = await db.blog_posts.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Deleted"}


# ---------------------------------------------------------------------------
# Contact Form Routes
# ---------------------------------------------------------------------------

@api_router.post("/contact")
async def submit_contact(payload: ContactSubmissionCreate):
    doc = payload.model_dump()
    doc["submitted_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.contact_submissions.insert_one(doc)
    doc["_id"] = result.inserted_id
    logging.info(f"New contact submission from {doc['email']}: {doc['subject']}")
    return {"message": "Thank you for reaching out. We will get back to you within 24 hours.", "id": str(result.inserted_id)}


@api_router.get("/admin/contacts")
async def list_contacts(current_user: dict = Depends(get_current_user)):
    cursor = db.contact_submissions.find({}).sort("submitted_at", -1)
    contacts = [serialize_contact(c) async for c in cursor]
    return contacts


@api_router.delete("/admin/contacts/{contact_id}")
async def delete_contact(
    contact_id: str,
    current_user: dict = Depends(get_current_user),
):
    try:
        oid = ObjectId(contact_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid contact id")
    result = await db.contact_submissions.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact submission not found")
    return {"message": "Deleted"}


# ---------------------------------------------------------------------------
# Health
# ---------------------------------------------------------------------------

@api_router.get("/")
async def root():
    return {"message": "Raghav Mittal & Associates API"}


# ---------------------------------------------------------------------------
# Startup tasks
# ---------------------------------------------------------------------------

INITIAL_BLOG_POSTS = [
    {
        "title": "GST Return Filing: Key Deadlines and Compliance Requirements for 2025",
        "excerpt": "Stay updated with the latest GST return filing deadlines and compliance requirements to avoid penalties and ensure smooth business operations.",
        "content": """<p>Goods and Services Tax (GST) compliance is crucial for businesses operating in India. Understanding the filing deadlines and requirements can save your business from penalties and legal complications.</p>
<h2>Key GST Return Filing Deadlines</h2>
<ul><li><strong>GSTR-1:</strong> Monthly - 11th of the following month</li><li><strong>GSTR-3B:</strong> Monthly - 20th of the following month</li><li><strong>GSTR-9:</strong> Annual - 31st December of the following financial year</li></ul>
<h2>Common Compliance Mistakes to Avoid</h2>
<ol><li>Late filing of returns</li><li>Incorrect GSTIN details</li><li>Mismatch in invoice data</li><li>Improper input tax credit claims</li></ol>
<p>At Raghav Mittal & Associates, we help businesses maintain GST compliance effortlessly with our expert consultancy services.</p>""",
        "category": "GST & Taxation",
        "image": "https://images.unsplash.com/photo-1554224311-beee460c201f?w=800",
        "author": "CA Raghav Mittal",
        "read_time": "5 min read",
    },
    {
        "title": "Income Tax Deductions: Smart Tax Planning Strategies for Salaried Individuals",
        "excerpt": "Maximize your tax savings with these effective tax planning strategies and deduction opportunities available for salaried professionals.",
        "content": """<p>Tax planning is essential for maximizing your take-home income. Understanding available deductions under the Income Tax Act can significantly reduce your tax liability.</p>
<h2>Popular Tax Deductions Under Section 80C</h2>
<ul><li>Employee Provident Fund (EPF)</li><li>Public Provident Fund (PPF)</li><li>Life Insurance Premiums</li><li>National Savings Certificate (NSC)</li><li>Home Loan Principal Repayment</li></ul>
<h2>Additional Deductions</h2>
<ul><li><strong>80D:</strong> Health Insurance Premiums</li><li><strong>80E:</strong> Education Loan Interest</li><li><strong>80G:</strong> Charitable Donations</li><li><strong>24(b):</strong> Home Loan Interest (up to \u20b92 lakhs)</li></ul>""",
        "category": "Income Tax",
        "image": "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800",
        "author": "CA Raghav Mittal",
        "read_time": "6 min read",
    },
    {
        "title": "Startup Registration in India: Complete Guide to Company Incorporation",
        "excerpt": "A comprehensive guide to registering your startup in India, covering legal requirements, documentation, and compliance procedures.",
        "content": """<p>Starting a business in India requires proper registration and compliance with various regulations.</p>
<h2>Types of Business Entities</h2>
<ul><li><strong>Private Limited Company:</strong> Most preferred for startups</li><li><strong>Limited Liability Partnership (LLP):</strong> Flexible structure</li><li><strong>One Person Company (OPC):</strong> For solo entrepreneurs</li><li><strong>Sole Proprietorship:</strong> Simplest form</li></ul>
<h2>Documents Required</h2>
<ol><li>PAN and Aadhaar of Directors/Partners</li><li>Address Proof of Registered Office</li><li>MOA and AOA</li><li>DIN (Director Identification Number)</li><li>DSC (Digital Signature Certificate)</li></ol>
<p>Raghav Mittal & Associates provides end-to-end support for startup registration.</p>""",
        "category": "Business Advisory",
        "image": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
        "author": "CA Raghav Mittal",
        "read_time": "8 min read",
    },
    {
        "title": "ROC Compliance: Annual Filing Requirements Every Company Must Know",
        "excerpt": "Understand your company's ROC compliance obligations and avoid hefty penalties with timely filing of statutory returns.",
        "content": """<p>Registrar of Companies (ROC) compliance is mandatory for all registered companies in India.</p>
<h2>Annual ROC Filing Requirements</h2>
<ul><li><strong>AOC-4:</strong> Annual Financial Statements</li><li><strong>MGT-7:</strong> Annual Return</li><li><strong>ADT-1:</strong> Appointment of Auditor</li><li><strong>DIR-3 KYC:</strong> Director KYC</li></ul>
<h2>Important Deadlines</h2>
<ul><li>Annual General Meeting: Within 6 months from FY end</li><li>AOC-4 Filing: Within 30 days from AGM</li><li>MGT-7 Filing: Within 60 days from AGM</li></ul>""",
        "category": "Compliance",
        "image": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
        "author": "CA Raghav Mittal",
        "read_time": "5 min read",
    },
    {
        "title": "Financial Audit: Importance and Benefits for Your Business",
        "excerpt": "Discover how regular financial audits can strengthen your business operations, improve financial transparency, and build stakeholder trust.",
        "content": """<p>Financial audits are essential for maintaining transparency and ensuring compliance.</p>
<h2>Types of Audits</h2>
<ul><li><strong>Statutory Audit:</strong> Mandatory for companies</li><li><strong>Internal Audit:</strong> For process improvement</li><li><strong>Tax Audit:</strong> Required under IT Act</li><li><strong>GST Audit:</strong> For GST compliance</li></ul>
<h2>Benefits of Regular Audits</h2>
<ol><li>Ensures financial accuracy and transparency</li><li>Identifies operational inefficiencies</li><li>Strengthens internal controls</li><li>Builds investor and lender confidence</li></ol>""",
        "category": "Audit Services",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        "author": "CA Raghav Mittal",
        "read_time": "7 min read",
    },
    {
        "title": "Virtual CFO Services: Strategic Financial Management for Growing Businesses",
        "excerpt": "Learn how Virtual CFO services can provide strategic financial guidance without the cost of a full-time CFO.",
        "content": """<p>As businesses grow, the need for strategic financial management becomes critical. Virtual CFO services offer expert financial guidance at a fraction of the cost.</p>
<h2>Key Services Offered</h2>
<ul><li>Financial Planning & Analysis</li><li>Cash Flow Management</li><li>Budgeting & Forecasting</li><li>Fundraising & Investor Relations</li><li>Financial Reporting & MIS</li></ul>
<h2>Benefits Over Full-time CFO</h2>
<ol><li>Cost-effective solution (60-70% savings)</li><li>Flexible engagement models</li><li>Access to experienced professionals</li><li>Scalable as per business needs</li></ol>""",
        "category": "Financial Advisory",
        "image": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800",
        "author": "CA Raghav Mittal",
        "read_time": "6 min read",
    },
]


@app.on_event("startup")
async def startup_db():
    # Indexes
    await db.users.create_index("email", unique=True)
    await db.blog_posts.create_index("slug", unique=True)
    await db.blog_posts.create_index("published_at")

    # Seed admin
    existing = await db.users.find_one({"email": ADMIN_EMAIL})
    if existing is None:
        await db.users.insert_one({
            "email": ADMIN_EMAIL,
            "password_hash": hash_password(ADMIN_PASSWORD),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc),
        })
        logging.info(f"Seeded admin user: {ADMIN_EMAIL}")
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        await db.users.update_one(
            {"email": ADMIN_EMAIL},
            {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}},
        )
        logging.info(f"Updated admin password for: {ADMIN_EMAIL}")

    # Seed initial blog posts if none exist
    count = await db.blog_posts.count_documents({})
    if count == 0:
        now = datetime.now(timezone.utc)
        for i, post in enumerate(INITIAL_BLOG_POSTS):
            doc = dict(post)
            doc["slug"] = slugify(doc["title"])
            doc["published_at"] = (now - timedelta(days=i * 5)).isoformat()
            await db.blog_posts.insert_one(doc)
        logging.info(f"Seeded {len(INITIAL_BLOG_POSTS)} initial blog posts")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------

# Get allowed origins
cors_origins_env = os.environ.get('CORS_ORIGINS', '*')
if cors_origins_env == '*':
    cors_origins = ['*']
else:
    cors_origins = [origin.strip() for origin in cors_origins_env.split(',')]

# When using credentials, "*" is not allowed
# Allow any origin by reflecting it back via regex
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router)


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
