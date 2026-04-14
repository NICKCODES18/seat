# 10B — Office Seat Booking System

A Next.js web app for managing office seat allocations across two batches of 10 squads (80 people, 50 seats).

---

## Overview

Teams visit the office on a rotating fortnightly schedule. The system enforces designated seating, handles vacation releases, and gates floater/non-designated bookings behind a daily 3 PM cutoff.

### Seat Layout

| Seats | Type | Description |
|---|---|---|
| 1 – 40 | Designated | 5 squads × 8 members per batch |
| 41 – 50 | Floater | Open to any non-designated team |

### Batch Schedule (repeating every 2 ISO weeks)

| Week | Batch 1 | Batch 2 |
|---|---|---|
| Odd week | Mon – Wed | Thu – Fri |
| Even week | Thu – Fri | Mon – Wed |

Each squad of 8 has 8 fixed seats. Squads 1–5 → Batch 1, Squads 6–10 → Batch 2.

---

## Features

- **Week-wise seat view** — browse any week using the navigation arrows
- **Designated seat** — automatically reserved; owner can vacate if not coming in
- **Seat release** — vacated seats become bookable by non-designated users
- **Floater seats** — bookable by non-designated users after 3 PM the prior work day
- **Same-day booking** — always allowed (no 3 PM restriction)
- **Holiday blocking** — booking is disabled on public holidays; days are flagged in the UI
- **One booking per day** — once a non-designated user books any seat, all other Book buttons disappear
- **Color-coded grid** — green (your seat), orange (you vacated), sky (vacated by owner), blue (floater), gray (occupied), dimmed (locked until 3 PM)
- **Context banner** — tells you whether it's your designated day or when you can book

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | MongoDB via Mongoose |
| Auth | JWT (jose) + HTTP-only cookies |
| Styling | Tailwind CSS v4 + shadcn/ui |
| State | Zustand (auth) |
| Forms | React Hook Form + Zod |
| Notifications | Sonner |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- A running MongoDB instance

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Create environment file
cp .env.local.example .env.local
# Fill in MONGO_URI and JWT_SECRET

# 3. Seed the database (creates 80 users across 10 squads)
pnpm seed

# 4. Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign auth tokens |
| `SEED_PASSWORD` | Default password for seeded users (default: `Password@123`) |

---

## Seed Script

`scripts/seed.ts` creates 10 squads × 8 members = **80 users** with:

- Correct `batch` (1 or 2) based on squad number
- `defaultSeat` assigned sequentially within the squad's seat block
- Email format: `squad{N}.{firstname}@example.com`
- Default password: `Password@123` (override via `SEED_PASSWORD` env var)

Already-existing users (matched by email) are skipped.

```bash
pnpm seed
```

---

## Project Structure

```
app/
  api/
    auth/          # login, logout, register, /me
    seats/
      route.ts     # GET week allocations
      actions/     # POST book / release / cancel
  login/
  register/
  seats/           # Main seat grid page
components/
  seats/
    types.ts       # Shared types, status styles, legend
    WeekNav.tsx    # Week header + prev/next
    DayTabs.tsx    # Day picker with holiday/batch labels
    ContextBanner.tsx  # Designated / non-designated info
    SeatCard.tsx   # Individual seat card + action buttons
    SeatGrid.tsx   # Squad blocks + floater section
hooks/
  useRequireAuth.ts
lib/
  dateUtils.ts     # Holiday list, batch schedule logic, 3 PM rule
  squads.ts        # Squad → batch + seat range helpers
  db.ts            # Mongoose connection
  jwt.ts           # Token sign/verify
models/
  User.ts
  Booking.ts
scripts/
  seed.ts          # User seed script
store/
  useAuthStore.ts  # Zustand auth store
```

---

## Business Rules

1. **Designated day** — a user's batch is in-office. Their seat is auto-occupied; they can release it.
2. **Non-designated day** — user can book a released designated seat or a floater seat, but only after 3 PM of the prior work day (bypassed on the same day, and in `development` mode).
3. **Holidays** — no bookings of any kind; all action buttons are hidden and the grid is replaced with a holiday message.
4. **One seat per day** — a non-designated user cannot book more than one seat on the same day.
5. **Cancel** — any booking (release or book) can be cancelled by the user who made it.

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm seed` | Seed 80 users into MongoDB |
