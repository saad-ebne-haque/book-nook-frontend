# BookNook

BookNook is a small online library where readers can discover books, share titles with the community, borrow available copies, and return them when they are done.

**Live website:** [https://book-nook-lime.vercel.app/](https://book-nook-lime.vercel.app/)

## Features

- Browse the public book collection with search, sorting, and pagination.
- Explore the latest arrivals and featured stories on the home page.
- Register and sign in with email/password or Google.
- Add books with a cover image, category, description, and copy count.
- Edit or delete books you added.
- Borrow available copies, view your active borrows, and return books.
- Manage your profile and see availability updated as books are borrowed or returned.
- Responsive layouts, loading states, notifications, and a custom not-found page.

## Tech stack

- Next.js App Router, React, and TypeScript
- Better Auth with the MongoDB adapter and Google OAuth
- HeroUI, Tailwind CSS, and Swiper
- Express/MongoDB backend API
- ImgBB for book-cover uploads

## Local development

Requirements: Node.js and access to a MongoDB database.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in this directory and configure:

   ```dotenv
   NEXT_PUBLIC_API=http://localhost:5000
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_SECRET_URI=<your-mongodb-connection-string>
   GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-oauth-client-secret>
   IMGBB_API_KEY=<your-imgbb-api-key>
   ```

   For production, set `NEXT_PUBLIC_API` to `https://book-nook-backend-api.vercel.app` and `BETTER_AUTH_URL` to `https://book-nook-lime.vercel.app`. Configure the frontend origin and Better Auth callback URL in Google Cloud. Keep credentials in environment settings; do not commit them.

3. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Related project

- **Backend repository:** This project’s Express API is deployed at [https://book-nook-backend-api.vercel.app/](https://book-nook-backend-api.vercel.app/).
