# PRD – Raghav Mittal & Associates (CA Firm Website)

## Original Problem Statement
Create a modern, premium and trustworthy website for a Chartered Accountant firm
named "Raghav Mittal & Associates". Multi-page corporate site (Home, About, Services,
Industries, Why Choose Us, Blog, Contact) with white + navy blue color theme,
professional images, FAQ, contact form, blog/news section, Google Maps,
WhatsApp button, sticky nav, footer, social media icons, etc.

## Stack
- Frontend: React + TailwindCSS + shadcn/ui
- Backend: FastAPI + MongoDB (Motor)
- Auth: JWT in httpOnly cookies (bcrypt password hashing)

## User Personas
1. Admin (CA Raghav Mittal) – manages blog & contact submissions via /admin
2. Prospective clients (businesses, startups, individuals, NRIs) browsing services
3. Existing/returning clients fetching tax updates from blog

## Core Requirements (static)
- Public pages: Home, About, Services, Industries, WhyUs, Blog (list + detail), Contact
- Functional blog (DB-backed CRUD via admin panel)
- Functional contact form (saved to DB)
- Admin login at /admin/login, dashboard at /admin
- Navy blue + white + green accent color scheme (no gold)
- CA India logo (white circle, navy CA with tricolor checkmark)
- Sticky nav with 3 sections (contact bar / logo bar / nav bar)
- Elegant Playfair Display headings + Inter body + Cormorant Garamond for editorial

## Implemented
**Dec 2025 – v1 (frontend MVP)**
- All 8 pages with sample content, navy/gold theme, mock blog data
- Contact form UI only

**Dec 2025 – v2 (rebrand to new firm + style cleanup)**
- Removed all gold/yellow accents; navy + white + light-blue palette
- Removed "Book Consultation" CTAs from header
- Removed "experienced firm" claims (500+ clients, 15+ years, 98% satisfaction)
- Repositioned as ICAI-qualified new firm
- Removed "Need Expert Financial Guidance" CTA on Services
- Removed "Measurable Results" on Why Choose Us
- Replaced "Experienced Team" with "ICAI Qualified Professionals"

**Dec 2025 – v3 (functional backend + new logo)**
- New CA-INDIA SVG logo with Indian tricolor checkmark + Playfair Display firm name
- Sticky 3-row header (contact bar / logo bar / nav bar) — hamburger removed, all
  nav links always visible horizontally
- Green accent color introduced (active nav indicator, hover highlights, success CTAs)
- Multi-font typography: Playfair Display (headings), Cormorant Garamond
  (editorial body), Inter (UI), Fira Sans (accents)
- Founder image (CA Raghav Mittal) added to About page with navy-blue blend-mode
  wrapper to integrate with site theme
- **Functional blog backend**: MongoDB-backed CRUD via /api/blog (public),
  /api/admin/blog (auth required). 6 initial posts auto-seeded
- **Functional contact form**: POSTs to /api/contact, saved to DB, viewable
  in admin panel
- **Admin panel**: /admin/login (email + password), /admin dashboard with
  Blog Posts and Contact Submissions tabs (create / edit / delete posts,
  view / delete submissions)
- JWT cookie-based auth (httpOnly access + refresh tokens), bcrypt hashing,
  admin seeded on startup
- Backend test report: 28/28 passing (100%)

## Admin Credentials
- Email: `admin@raghavmittal.com`
- Password: `admin123`
- Stored in `/app/memory/test_credentials.md`

## Prioritized Backlog
**P1 (nice-to-have, deferred)**
- Email notifications to admin when contact form submitted (Resend/SMTP)
- Image upload for blog (currently URL-based only)
- Rich text editor (TipTap/Tiptap) for blog content instead of raw HTML
- Brute-force lockout on /api/auth/login
- Replace CORS `regex=.*` with explicit allowed origins for prod

**P2 (future enhancement)**
- "Free Tax Consultation" lead form on homepage hero
- Blog comments / share buttons
- Newsletter subscription with double opt-in
- Admin analytics dashboard (page views, popular posts, contact trends)
- Multi-author support
