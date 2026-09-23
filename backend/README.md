# TreeMint Backend - REST API Service

> **Digital Tree Sponsorship, Plantation Verification & Growth Tracking Platform**  
> Computer Science Final Year Project (FYP) Backend

---

## 🌲 Overview

The **TreeMint Backend** is an enterprise-grade RESTful API built with **Node.js, Express, TypeScript, and MySQL**. It powers the end-to-end tree lifecycle:

1. **Sponsorship**: Donors sponsor native trees across verified campaigns.
2. **Identification**: Automatic generation of unique, standardized Tree IDs (e.g., `TREE-KHI-2026-00125`).
3. **Plantation Proof**: Field teams upload GPS-stamped geotagged photos and soil reports.
4. **Auditor Verification**: Admins review and approve/reject proofs in a dedicated audit queue.
5. **Certification & Points**: Automatic digital certificate creation (`CERT-2026-000125`), Green Points allocation (+100 for sponsorship, +50 for verification), and gamification badges.

---

## 📁 Architecture & Directory Structure

```
backend/
├── database/
│   ├── schema.sql              # Complete MySQL DDL schema (19 tables, indexes, constraints)
│   └── seed.sql                # Seed data (Pakistani cities, campaigns, trees, proofs, certs)
├── docs/
│   ├── TreeMint.postman_collection.json # Postman API test collection
│   └── api-spec.json           # OpenAPI 3.0 specification
├── src/
│   ├── config/
│   │   └── env.ts              # Environment variables loader
│   ├── constants/
│   │   ├── roles.ts            # RBAC Roles (DONOR, ADMIN, ORGANIZATION, PLANTATION_TEAM)
│   │   ├── tree-status.ts      # Tree lifecycle states & valid state transitions
│   │   └── points.ts           # Green points & badge threshold constants
│   ├── database/
│   │   └── connection.ts       # MySQL2 connection pool with automatic demo fallback
│   ├── middleware/
│   │   ├── auth.middleware.ts  # JWT Bearer token authentication
│   │   ├── rbac.middleware.ts  # Role-Based Access Control
│   │   ├── validate.middleware.ts # Zod request validation
│   │   ├── rate-limiter.middleware.ts # DDoS & brute-force protection
│   │   └── error.middleware.ts # Centralized exception handler
│   ├── repositories/           # Direct database query layer (SQL)
│   │   ├── user.repository.ts
│   │   ├── organization.repository.ts
│   │   ├── campaign.repository.ts
│   │   ├── tree.repository.ts
│   │   ├── sponsorship.repository.ts
│   │   ├── verification.repository.ts
│   │   ├── growth.repository.ts
│   │   ├── certificate.repository.ts
│   │   ├── reward.repository.ts
│   │   ├── notification.repository.ts
│   │   └── audit.repository.ts
│   ├── services/               # Business logic & transaction orchestration
│   │   ├── auth.service.ts
│   │   ├── tree.service.ts
│   │   ├── sponsorship.service.ts
│   │   ├── verification.service.ts
│   │   ├── analytics.service.ts
│   │   ├── email.service.ts
│   │   └── storage.service.ts
│   ├── validators/             # Zod validation schemas
│   │   ├── auth.validator.ts
│   │   ├── campaign.validator.ts
│   │   └── sponsorship.validator.ts
│   ├── controllers/            # HTTP request & response handlers
│   ├── routes/                 # Express route definitions
│   ├── utils/
│   │   ├── api-response.ts     # Standardized JSON response envelope
│   │   ├── tree-id-generator.ts # Tree ID & Certificate number generator
│   │   ├── jwt.ts              # JWT signing and verification
│   │   └── logger.ts           # Structured console logger
│   ├── app.ts                  # Express application setup
│   └── server.ts               # Server entry point
├── tests/
│   └── api.test.ts             # Automated test suite
├── .env.example
├── package.json
└── tsconfig.json
```

---

## ⚙️ Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **MySQL Server**: `8.0+` (optional for local evaluation; includes automatic zero-crash mock engine)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update your MySQL database credentials:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=treemint
DB_USER=root
DB_PASSWORD=your_password
```

### 3. Initialize MySQL Database
Run the schema and seed scripts using MySQL CLI:
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 4. Start the Development Server
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

---

## 🧪 Running Tests
```bash
npm test
```

---

## 🔑 Demo Login Credentials (from `seed.sql`)

| Role | Email | Password |
|---|---|---|
| **Donor** | `muhammadanaskhaann@gmail.com` | `Password123!` |
| **Admin / Auditor** | `admin@treemint.org` | `Password123!` |
| **Organization Lead** | `forestry@sindh.gov.pk` | `Password123!` |
| **Plantation Team** | `team.alpha@treemint.org` | `Password123!` |

---

## 📚 API Endpoints Summary

### Auth (`/api/v1/auth`)
- `POST /register` - Register a donor account
- `POST /login` - Sign in and receive JWT access & refresh tokens
- `GET /me` - Get currently authenticated user profile
- `POST /refresh` - Refresh an expired access token

### Public Directory (`/api/v1/public` & `/api/v1/`)
- `GET /campaigns` - List all campaigns with filters (city, status, page, limit)
- `GET /campaigns/:slug` - Get single campaign details
- `GET /trees/:treeCode` - Public immutable Tree Passport Ledger
- `GET /certificates/:certificateNumber` - Public certificate verification

### Donor Dashboard (`/api/v1/dashboard`)
- `GET /overview` - Personalized donor statistics & impact
- `GET /trees` - List trees sponsored by donor
- `POST /sponsor` - Sponsor a new tree
- `GET /certificates` - View digital certificates
- `GET /rewards` - Green points and badges

### Field Team (`/api/v1/team`)
- `POST /plantation-proof` - Upload GPS coordinates, photo, and planting details
- `POST /growth-update` - Log periodic height and survival checks

### Admin Verification Queue (`/api/v1/admin`)
- `GET /verification` - View pending plantation audit queue
- `PATCH /verification/:id/approve` - Approve plantation proof and issue certificate
- `PATCH /verification/:id/reject` - Reject proof with auditor remarks
- `GET /analytics/overview` - Platform-wide statistics
