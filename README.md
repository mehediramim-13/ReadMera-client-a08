# ReadMera

> A small online library where readers can add books, borrow available titles, and return them.

[![Live site](https://img.shields.io/badge/Live%20site-ReadMera-15803d?logo=vercel&logoColor=white)](https://read-mera.vercel.app/)

🔗 **Live site:** [https://read-mera.vercel.app/](https://read-mera.vercel.app/)

## ✨ Features

- Email/password registration and login with Google sign-in using Better Auth.
- Session-based route protection and callback redirects after login.
- JWT authentication for protected requests to the Express API.
- Create book listings with cover image uploads through a server-side imgbb integration.
- Edit and delete your own book listings.
- Borrow books, track available copies, and return borrowed titles.
- Browse and search the catalogue with category, availability, and sort filters.
- A three-slide Swiper hero slider and latest-book arrivals on the home page.
- Light, dark, and system theme options, plus Motion-based interface animations.
- Responsive layouts, loading skeletons, a custom 404 page, and Sonner toast notifications.

## 🧰 Tech stack

### Main technologies

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-Authentication-111827)](https://www.better-auth.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47a248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Swiper](https://img.shields.io/badge/Swiper-Slider-6332f6?logo=swiper&logoColor=white)](https://swiperjs.com/)
[![Motion](https://img.shields.io/badge/Motion-Animation-8b5cf6)](https://motion.dev/)

### Runtime packages

- **Framework and UI:** Next.js, React, Tailwind CSS, shadcn, `@base-ui/react`, `class-variance-authority`, `tw-animate-css`
- **Authentication and data:** Better Auth, `@better-auth/mongo-adapter`, MongoDB
- **Forms and validation:** React Hook Form, `@hookform/resolvers`, Zod
- **Interface components and utilities:** `cmdk`, `cn`, `date-fns`, `react-day-picker`, `next-themes`
- **Icons and animation:** `lucide-react`, `@hugeicons/react`, `@hugeicons/core-free-icons`, Motion
- **Media, notifications, and carousel:** Swiper, Sonner

### Development packages

`@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom`, `babel-plugin-react-compiler`, ESLint, `eslint-config-next`, and TypeScript.

## 🚀 Getting started

### Prerequisites

- Node.js and npm
- MongoDB and Google OAuth credentials for the Better Auth setup
- The ReadMera Express API

### Install and run

```bash
git clone https://github.com/mehediramim-13/ReadMera-client-a08.git
cd ReadMera-client-a08
npm install
```

Copy `.env.example` to `.env.local` and provide values for the variables required by your local environment:

```text
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_BETTER_AUTH_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
MONGODB_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
IMGBB_API_KEY
```

Start the Express API, then run the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🗂️ Project structure

```text
src/
├── app/          App Router pages, layouts, loading/error UI, and API routes
├── components/   Shared layout, auth, book, and UI components
├── hooks/        Client-side React hooks
├── lib/          Auth, API, validation, formatting, and upload helpers
└── types/        Shared TypeScript types
```

## 📜 Scripts

- `npm run dev` — start the development server.
- `npm run build` — create a production build.
- `npm run start` — serve the production build.
- `npm run lint` — run ESLint.
