Finance Dashboard Backend

Overview

This project is a backend system for a finance dashboard that manages users, financial records, and analytics.

It demonstrates role-based access control, secure authentication, and dashboard-level data aggregation, similar to real-world backend systems.

---

 Tech Stack

- Node.js + Express.js
- Prisma ORM
- SQLite
- JWT Authentication
- Bcrypt

---

Architecture

Routes → Controllers → Prisma (DB)

---

Features
 User & Role Management

- Register & login users
- Roles:
  - Viewer
  - Analyst
  - Admin
- Admin can:
  - View users
  - Update roles
  - Activate / deactivate users

---

Financial Records

- Create, update, delete records (Admin only)
- View records (All users)

Fields:

- Amount
- Type (income / expense)
- Category
- Date
- Notes

Filtering:

- Type
- Category
- Date range

Pagination:

- "?page=1&limit=10"

---

 Dashboard APIs

- Total Income
- Total Expense
- Net Balance
- Category Breakdown
- Monthly Trends

---

 Access Control

- JWT Authentication
- Role-based authorization middleware

---

 Validation & Error Handling

- Input validation
- Secure responses
- Proper HTTP status codes

---

 Database

- SQLite with Prisma ORM
- Relation: User → Records

---

 Getting Started

 Clone Repository

git clone https://github.com/<your-username>/finance-dashboard-backend.git
cd finance-dashboard-backend

---

 Install Dependencies

npm install

---

 Environment Setup

Create a ".env" file in root:

DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key"

---

 Setup Database

npx prisma migrate dev
npx prisma generate

(Optional: open DB UI)

npx prisma studio

---

Run Server

npm run dev

Server runs at:

http://localhost:3000

---

 Authentication

Use JWT token in headers:

Authorization: Bearer <token>

---

 API Endpoints

 Auth

- POST "/auth/register"
- POST "/auth/login"

Users (Admin)

- GET "/users"
- PATCH "/users/:id"

Records

- POST "/records"
- GET "/records"
- PUT "/records/:id"
- DELETE "/records/:id"

 Summary

- GET "/summary"
- GET "/summary/categories"
- GET "/summary/trends"

---

 Highlights

- Clean architecture
- Role-based access control
- Secure authentication
- Filtering & pagination
- Analytics-ready APIs

---

Future Improvements

- Search functionality
- Soft delete
- Swagger documentation
- Deployment
- Testing

---
 Submission Links

- GitHub Repo: <YOUR_GITHUB_LINK>
- API Docs (Postman): <YOUR_POSTMAN_LINK>

---

Author

Backend system built as part of an assignment demonstrating real-world API design and implementation.
