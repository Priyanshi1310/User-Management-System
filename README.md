
## UserManagment System
A responsive, feature-rich User Management Dashboard built with modern frontend technologies. This project was developed as part of a React Frontend Assignment and simulates a lightweight internal tool for managing users.

---

## Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **TailwindCSS**
- **Radix UI** (Dialog, Select, Switch)
- **TanStack React Query v5**
- **Axios**
- **Zustand**

## Features

### User Table
- Fetches users from [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users)
- Displays avatar (initials), name, email, phone, company
- Search by name (live filtering)
- Sort by email (A-Z / Z-A)
- Filter by company (Radix Select)
- Pagination (React Query helpers)

### Add / Edit User
- Radix Dialog form with fields: Name, Email, Phone, Company
- Optimistic updates using React Query mutations
- Axios for fake POST/PUT requests

### Delete User
- Radix Confirmation Dialog
- Optimistic removal via React Query mutation

### Dark Mode
- Toggle via Radix Switch in Navbar
- Zustand-powered global state

### Logged-in User
- Hardcoded user stored in Zustand
- Avatar + name displayed in Navbar

### User Detail Page
- Dynamic route: `/users/[id]`
- Displays full user info including address
- Fetched via React Query

### Activity Log (Bonus)
- Logs actions: add, edit, delete
- Stored in Zustand
- Displayed in sidebar

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Priyanshi1310/User-Management-System.git
cd User-Management-System

# Install dependencies
npm install

# Run locally
npm run dev

