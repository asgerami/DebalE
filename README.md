# DebalE

DebalE is a room‑rental platform for Ethiopia: find a room to rent, list your available room, and connect safely with compatible roommates. Built during the Cursor Addis Ababa Hackathon (awarded 3rd place), it emphasizes a clean UI, fast UX, and type‑safe integrations.

## Highlights

- Modern UI with Radix UI + Tailwind CSS
- End‑to‑end type safety with TypeScript
- Forms powered by React Hook Form + Zod
- Theme support via next-themes (dark/light)
- Supabase for auth, database, storage, and real‑time

## What You Can Do

- Browse rooms by area, budget, and type
- Save favorites and revisit them
- List your room (for landlords or tenants)
- View details for any listing
- Create and manage your profile
- Chat with matches in real‑time in

## Tech Stack

- Framework: Next.js 15
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: Radix UI
- Icons: Lucide React
- Forms & Validation: React Hook Form + Zod
- Theming: next-themes
- Backend: Supabase (Auth, Postgres, Storage, Realtime)

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Environment variables

Create a `.env.local` in the project root:

```bash
# Supabase (Public)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Note: The `NEXT_PUBLIC_` prefix is required for client-side access in Next.js. These are public anon keys intended for use in the browser.

3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

Tip: The home page at [app/page.tsx](app/page.tsx) surfaces quick actions for seekers (“Find Rooms”, search) and providers (“List Your Room”).

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## Supabase Integration

- Client setup lives in [lib/supabase.ts](lib/supabase.ts)
- Typed CRUD helpers in [lib/supabase-crud.ts](lib/supabase-crud.ts)

Example usage:

```ts
import {
  getProfile,
  createProfile,
  updateProfile,
  getActiveListings,
  createListing,
  updateListing,
  subscribeToMessages,
  uploadListingPhoto,
  uploadProfilePhoto,
} from "./lib/supabase-crud";

// Fetch a user profile
const profile = await getProfile(userId);

// Create a new listing
const newListing = await createListing({
  provider_id: userId,
  title: "Modern Room in Bole",
  monthly_rent: 2000,
  area: "Bole",
  room_type: "private",
});

// Subscribe to realtime messages for a match
const subscription = subscribeToMessages(matchId, (message) => {
  console.log("New message:", message);
});

// Upload photos
await uploadListingPhoto(file, listingId);
await uploadProfilePhoto(file, userId);
```

All utilities throw on error; wrap calls in `try/catch` for robust handling.

## Notes

- This repository was developed during the Cursor Hackathon and placed 3rd. The code favors clarity, speed of iteration, and strong typing.
- Extend the CRUD utilities and UI components as your product grows.

## Architecture Snapshot

- App Router pages under [app/](app) for core flows (search, listing detail, list‑room, messages, profile, dashboard, help).
- UI primitives in [components/ui](components/ui) with Radix UI and Tailwind.
- Auth context and guards in [contexts/AuthContext.tsx](contexts/AuthContext.tsx) and [components/auth-guard.tsx](components/auth-guard.tsx).
- Domain hooks in [hooks/](hooks) for listings, messages, profile, and uploads.
- Supabase client and typed CRUD utilities in [lib/supabase.ts](lib/supabase.ts) and [lib/supabase-crud.ts](lib/supabase-crud.ts).
