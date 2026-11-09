# 🚗 LuxeRent — Luxury Car Rental Platform

A full-stack, production-quality car rental web application built with **Next.js 16**, **TypeScript**, **Prisma**, and **SQLite**. Features a stunning glassmorphic dark-mode UI, role-based authentication (Customer & Admin), and a complete booking lifecycle.

![LuxeRent Preview](https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80)

---

## ✨ Features

- **Glassmorphic Dark UI** — Premium, animated interface with Tailwind CSS v4
- **Role-Based Auth** — JWT-based sessions with `CUSTOMER` and `ADMIN` roles
- **Car Browsing** — Filter by category, search, and view detailed car pages
- **Booking System** — Select dates, calculate pricing, and manage bookings
- **Admin Dashboard** — Full CRUD for fleet management and booking oversight
- **Route Protection** — Middleware-based guards for `/dashboard` and `/admin`

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | SQLite (via Prisma ORM) |
| Auth | JWT (`jose`) + bcrypt |
| Icons | Lucide React |
| Validation | Zod |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/car_rental.git
cd car_rental
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your values. For `JWT_SECRET`, generate one with:

```bash
openssl rand -base64 32
```

### 4. Set up the database

```bash
# Push the Prisma schema to SQLite
npx prisma db push

# Seed with demo data (cars + admin/customer accounts)
npx tsx prisma/seed.ts
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 👤 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@luxerent.com | admin123 |
| **Customer** | john@example.com | customer123 |

> ⚠️ Change these credentials before deploying to production.

---

## 📁 Project Structure

```
car_rental/
├── app/
│   ├── (public)/          # Public routes (home, cars, auth)
│   ├── admin/             # Admin dashboard (protected)
│   └── dashboard/         # Customer dashboard (protected)
├── components/            # Reusable UI components
├── lib/
│   ├── actions/           # Server Actions (CRUD operations)
│   ├── auth/              # Auth helpers & session management
│   └── db.ts              # Prisma client singleton
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Demo data seeder
└── proxy.ts               # Route protection middleware
```

---

## 📜 License

MIT
