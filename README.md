<div align="center">

# 📚 ReadMera

**A small online library. Add a book, borrow a book, return a book.**

[![Live Site](https://img.shields.io/badge/Live%20Site-read--mera.vercel.app-15803d?logo=vercel&logoColor=white)](https://read-mera.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47a248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

🔗 **Live site: [https://read-mera.vercel.app/](https://read-mera.vercel.app/)**

</div>

---

## 📖 About the project

ReadMera is a simple community library where anyone can browse the catalogue, but members can do a lot more. Once you sign in, you can list your own books, borrow someone else's for a few days, and hand it back when you're done. The app keeps track of how many copies are available, so a book that's fully borrowed can't be borrowed again until someone returns it.

I built the client with Next.js (App Router) and paired it with a separate Express and MongoDB API for the book and borrow data.

## ✨ Features

- 🔐 **Secure authentication** with email and password, plus one-click Google sign-in, powered by Better Auth with the MongoDB adapter.
- 🛡️ **Protected private routes.** Add Book, My Books, My Borrows and Book Details are only for signed-in users. If you're logged out, you're sent to Login and brought back to the page you wanted. Reloading a private page keeps you signed in.
- 🔑 **JWT-protected API requests** so only authorised users can create, edit, delete, borrow or return.
- ➕ **Add your own books** with title, author, category, description, total copies and a cover image uploaded through imgbb.
- ✏️ **Edit and delete your books** from My Books. The edit form opens pre-filled, and deleting asks for confirmation in a custom modal (no browser popups).
- 📥 **Borrow and return system** with live copy tracking. Borrowing reduces available copies, returning brings them back, and a book with no copies left shows "Not Available".
- 🚫 **No double borrowing.** If you already have a book borrowed, you can't borrow the same one again.
- 🔎 **Browse and filter the catalogue** by search, category, availability and sort order.
- 🎠 **Home page with a Swiper hero slider**, the latest arrivals, and helpful sections like how borrowing works and top categories.
- 🌗 **Light, dark and system themes**, with smooth Motion animations across the interface.
- 📱 **Fully responsive design**, with loading skeletons, a custom 404 page, a page title for every route, and toast notifications for every success and error message.

## 🧰 Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling and UI | Tailwind CSS 4, shadcn/ui, Base UI, tw-animate-css, class-variance-authority |
| Authentication | Better Auth, `@better-auth/mongo-adapter`, JWT |
| Database | MongoDB |
| Forms and validation | React Hook Form, Zod, `@hookform/resolvers` |
| Slider and animation | Swiper, Motion |
| Notifications and theming | Sonner, next-themes |
| Icons | Lucide React, Hugeicons |
| Utilities | date-fns, cmdk, react-day-picker |
| Tooling | ESLint, React Compiler (Babel plugin) |
| Hosting | Vercel |

## 🚀 Getting started

### What you'll need

- Node.js and npm
- A MongoDB database and Google OAuth credentials (for Better Auth)
- The ReadMera Express API running locally or deployed

### Run it locally

```bash
git clone https://github.com/mehediramim-13/ReadMera-client-a08.git
cd ReadMera-client-a08
npm install
```

Copy `.env.example` to `.env.local` and fill in these variables:

```bash
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
MONGODB_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
IMGBB_API_KEY=
```

Start the API server, then run the client:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're good to go.

## 🗂️ Project structure

```
src/
├── app/          Pages, layouts, loading and error UI, API routes
├── components/   Layout, auth, book and shared UI components
├── hooks/        Custom React hooks
├── lib/          Auth, API, validation, formatting and upload helpers
└── types/        Shared TypeScript types
```

## 📜 Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run start` | Serves the production build |
| `npm run lint` | Runs ESLint |

---

<div align="center">

Made with ☕ and a lot of reading by **MD Mehedi Hasan**

[GitHub](https://github.com/mehediramim-13) · [Live Site](https://read-mera.vercel.app/)

</div>
