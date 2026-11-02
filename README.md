# ReadMera

Live site: <add the deployed URL here>

ReadMera is a web library for discovering books, managing personal listings, and borrowing and returning books.

## Features

- Browse, search, sort, and filter the public book collection.
- View book details, availability, and borrowing information.
- Create an account with email and password or Google sign-in.
- Add books with uploaded cover images, then edit or delete your own listings.
- Borrow available books and return them from your personal borrow list.
- Track borrow and return dates in a mobile-friendly interface.
- Use the interface in light or dark theme on mobile, tablet, and desktop.
- Explore featured library content in the rotating Swiper home slider.

## Tech stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS and shadcn/ui
- Better Auth with the MongoDB adapter
- Express API for book and borrow data
- Swiper for the home slider
- Sonner for notifications

## Getting started

1. Install the project dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set the values for your environment.
3. Configure and start the ReadMera Express API. Set `NEXT_PUBLIC_API_URL` to its base URL.
4. Start the frontend:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the Express API |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Public Better Auth URL used by the client |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth |
| `BETTER_AUTH_URL` | Base URL of the Better Auth server |
| `MONGODB_URL` | MongoDB connection string for Better Auth |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `IMGBB_API_KEY` | Server-side key used for cover image uploads |

Keep secret values private. Do not add `.env.local` to version control.

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run start` serves the production build.
- `npm run lint` runs ESLint.

## Server repository

Server repository: <add the server repository URL here>
