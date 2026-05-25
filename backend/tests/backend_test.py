"""
Backend API tests for Raghav Mittal & Associates CA firm website.

Tests cover:
- Auth (login/logout/me) with httpOnly cookies
- Public blog endpoints (list, categories, single by slug)
- Admin blog CRUD (create/update/delete) - cookie-based auth
- Contact form submission
- Admin contact endpoints
- 401 enforcement on admin endpoints
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://financial-trust-7.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@raghavmittal.com"
ADMIN_PASSWORD = "admin123"


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture(scope="session")
def anon_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def auth_client():
    """Logged-in session with httpOnly cookies."""
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    resp = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    if resp.status_code != 200:
        pytest.skip(f"Admin login failed ({resp.status_code}): {resp.text}")
    return s


# ---------------------------------------------------------------------------
# Health
# ---------------------------------------------------------------------------

class TestHealth:
    def test_root(self, anon_client):
        r = anon_client.get(f"{API}/")
        assert r.status_code == 200
        assert "message" in r.json()


# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------

class TestAuth:
    def test_login_success_sets_cookies(self, anon_client):
        s = requests.Session()
        r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"].lower() == ADMIN_EMAIL
        assert data["role"] == "admin"
        assert "id" in data
        # httpOnly cookies should be set
        cookie_names = {c.name for c in s.cookies}
        assert "access_token" in cookie_names, f"access_token cookie missing. Got: {cookie_names}"
        assert "refresh_token" in cookie_names, f"refresh_token cookie missing. Got: {cookie_names}"

    def test_login_invalid_password(self, anon_client):
        r = anon_client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpass"})
        assert r.status_code == 401

    def test_login_invalid_email(self, anon_client):
        r = anon_client.post(f"{API}/auth/login", json={"email": "noone@nowhere.com", "password": "x"})
        assert r.status_code == 401

    def test_me_authenticated(self, auth_client):
        r = auth_client.get(f"{API}/auth/me")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"].lower() == ADMIN_EMAIL
        assert data["role"] == "admin"

    def test_me_unauthenticated(self, anon_client):
        s = requests.Session()
        r = s.get(f"{API}/auth/me")
        assert r.status_code == 401

    def test_logout_clears_cookies(self):
        s = requests.Session()
        r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
        assert s.cookies.get("access_token") is not None
        r2 = s.post(f"{API}/auth/logout")
        assert r2.status_code == 200
        # After logout, /me should fail
        r3 = s.get(f"{API}/auth/me")
        assert r3.status_code == 401


# ---------------------------------------------------------------------------
# Public Blog
# ---------------------------------------------------------------------------

class TestPublicBlog:
    def test_list_blog_posts(self, anon_client):
        r = anon_client.get(f"{API}/blog")
        assert r.status_code == 200
        posts = r.json()
        assert isinstance(posts, list)
        assert len(posts) >= 6, f"Expected >=6 seeded posts, got {len(posts)}"
        sample = posts[0]
        for k in ["id", "title", "slug", "excerpt", "content", "category", "published_at"]:
            assert k in sample, f"Field {k} missing in blog response"

    def test_list_categories(self, anon_client):
        r = anon_client.get(f"{API}/blog/categories")
        assert r.status_code == 200
        cats = r.json()
        assert isinstance(cats, list)
        assert cats[0] == "All", f"First category should be 'All', got {cats[0]}"
        assert len(cats) > 1

    def test_get_blog_by_valid_slug(self, anon_client):
        # Use the first post slug from list endpoint
        posts = anon_client.get(f"{API}/blog").json()
        slug = posts[0]["slug"]
        r = anon_client.get(f"{API}/blog/{slug}")
        assert r.status_code == 200
        data = r.json()
        assert data["slug"] == slug
        assert data["title"] == posts[0]["title"]

    def test_get_blog_by_invalid_slug(self, anon_client):
        r = anon_client.get(f"{API}/blog/financial-trust-7")
        assert r.status_code == 404

    def test_filter_blog_by_category(self, anon_client):
        cats = anon_client.get(f"{API}/blog/categories").json()
        # Pick a non-'All' category
        cat = next((c for c in cats if c != "All"), None)
        if not cat:
            pytest.skip("No categories besides 'All'")
        r = anon_client.get(f"{API}/blog", params={"category": cat})
        assert r.status_code == 200
        for p in r.json():
            assert p["category"] == cat


# ---------------------------------------------------------------------------
# Admin Blog CRUD
# ---------------------------------------------------------------------------

class TestAdminBlog:
    def test_create_post_requires_auth(self, anon_client):
        s = requests.Session()
        r = s.post(f"{API}/admin/blog", json={
            "title": "TEST should fail", "excerpt": "x", "content": "y", "category": "Test"
        })
        assert r.status_code == 401

    def test_update_post_requires_auth(self):
        r = requests.put(f"{API}/admin/blog/000000000000000000000000", json={"title": "x"})
        assert r.status_code == 401

    def test_delete_post_requires_auth(self):
        r = requests.delete(f"{API}/admin/blog/000000000000000000000000")
        assert r.status_code == 401

    def test_create_update_delete_flow(self, auth_client):
        unique = uuid.uuid4().hex[:8]
        title = f"TEST Blog Post {unique}"
        # CREATE
        r = auth_client.post(f"{API}/admin/blog", json={
            "title": title,
            "excerpt": "TEST excerpt",
            "content": "<p>TEST content body</p>",
            "category": "TEST",
            "image": "https://example.com/x.jpg",
            "author": "Tester",
            "read_time": "1 min read",
        })
        assert r.status_code == 200, r.text
        created = r.json()
        assert created["title"] == title
        assert created["slug"].startswith(f"test-blog-post-{unique}")
        post_id = created["id"]

        # GET via public slug to verify persistence
        slug = created["slug"]
        r_get = auth_client.get(f"{API}/blog/{slug}")
        assert r_get.status_code == 200
        assert r_get.json()["title"] == title

        # UPDATE
        new_title = f"TEST Updated {unique}"
        r_upd = auth_client.put(f"{API}/admin/blog/{post_id}", json={"title": new_title, "excerpt": "Updated excerpt"})
        assert r_upd.status_code == 200, r_upd.text
        updated = r_upd.json()
        assert updated["title"] == new_title
        assert updated["excerpt"] == "Updated excerpt"
        # slug should reflect new title
        new_slug = updated["slug"]
        r_verify = auth_client.get(f"{API}/blog/{new_slug}")
        assert r_verify.status_code == 200
        assert r_verify.json()["title"] == new_title

        # DELETE
        r_del = auth_client.delete(f"{API}/admin/blog/{post_id}")
        assert r_del.status_code == 200
        # Verify gone
        r_gone = auth_client.get(f"{API}/blog/{new_slug}")
        assert r_gone.status_code == 404

    def test_update_invalid_id(self, auth_client):
        r = auth_client.put(f"{API}/admin/blog/not-an-objectid", json={"title": "x"})
        assert r.status_code == 400

    def test_update_nonexistent(self, auth_client):
        r = auth_client.put(f"{API}/admin/blog/000000000000000000000000", json={"title": "x"})
        assert r.status_code == 404

    def test_delete_nonexistent(self, auth_client):
        r = auth_client.delete(f"{API}/admin/blog/000000000000000000000000")
        assert r.status_code == 404


# ---------------------------------------------------------------------------
# Contact Form
# ---------------------------------------------------------------------------

class TestContact:
    def test_submit_contact_success(self, anon_client):
        payload = {
            "name": "TEST User",
            "email": "test_user@example.com",
            "phone": "9999999999",
            "subject": "TEST inquiry",
            "message": "This is a test contact message for QA.",
        }
        r = anon_client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data
        assert "message" in data

    def test_submit_contact_validation_error(self, anon_client):
        # Missing required fields
        r = anon_client.post(f"{API}/contact", json={"name": "X"})
        assert r.status_code == 422

    def test_submit_contact_invalid_email(self, anon_client):
        r = anon_client.post(f"{API}/contact", json={
            "name": "Bad Email", "email": "not-an-email", "phone": "1234567",
            "subject": "Hi there", "message": "Hello world testing",
        })
        assert r.status_code == 422


# ---------------------------------------------------------------------------
# Admin Contacts
# ---------------------------------------------------------------------------

class TestAdminContacts:
    def test_list_contacts_requires_auth(self):
        r = requests.get(f"{API}/admin/contacts")
        assert r.status_code == 401

    def test_delete_contact_requires_auth(self):
        r = requests.delete(f"{API}/admin/contacts/000000000000000000000000")
        assert r.status_code == 401

    def test_list_and_delete_contact_flow(self, auth_client, anon_client):
        # First create a submission
        payload = {
            "name": "TEST DeleteMe",
            "email": "test_delete_me@example.com",
            "phone": "9999999999",
            "subject": "TEST delete",
            "message": "Created for deletion test.",
        }
        r = anon_client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200
        contact_id = r.json()["id"]

        # List
        r_list = auth_client.get(f"{API}/admin/contacts")
        assert r_list.status_code == 200, r_list.text
        contacts = r_list.json()
        assert isinstance(contacts, list)
        ids = [c["id"] for c in contacts]
        assert contact_id in ids, "Newly created contact missing from admin list"
        # Validate shape
        sample = next(c for c in contacts if c["id"] == contact_id)
        assert sample["email"] == payload["email"]
        assert sample["name"] == payload["name"]

        # Delete
        r_del = auth_client.delete(f"{API}/admin/contacts/{contact_id}")
        assert r_del.status_code == 200

        # Verify gone
        r_list2 = auth_client.get(f"{API}/admin/contacts")
        ids2 = [c["id"] for c in r_list2.json()]
        assert contact_id not in ids2

    def test_delete_contact_invalid_id(self, auth_client):
        r = auth_client.delete(f"{API}/admin/contacts/not-valid")
        assert r.status_code == 400

    def test_delete_contact_nonexistent(self, auth_client):
        r = auth_client.delete(f"{API}/admin/contacts/000000000000000000000000")
        assert r.status_code == 404


# ---------------------------------------------------------------------------
# Bcrypt format sanity (via direct DB inspection skipped; verified by login working)
# ---------------------------------------------------------------------------

class TestSecuritySanity:
    def test_admin_password_bcrypt_works(self):
        """If login succeeds with admin123, bcrypt hash format is functional."""
        r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
