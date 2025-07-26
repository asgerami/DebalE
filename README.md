# DebalE

A modern web application built with Next.js, React, and TypeScript.

## Features

- Modern UI components with Radix UI
- Responsive design with Tailwind CSS
- Type-safe development with TypeScript
- Form handling with React Hook Form
- Theme support with next-themes

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   Create a `.env.local` file in the root directory with the following variables:

   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

   **Note**: The `NEXT_PUBLIC_` prefix is required for client-side access in Next.js. These keys are safe to expose in the browser as they are the public anon key.

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Theming**: next-themes

## Backend Integration (Supabase)

### Supabase Client Setup

- The Supabase client is configured in `lib/supabase.ts`.
- TypeScript types for main tables (profiles, listings, messages, matches) are included for type safety.

### CRUD Utilities

- Use functions from `lib/supabase-crud.ts` for all main operations:

```ts
import {
  getProfile,
  createProfile,
  updateProfile,
  getActiveListings,
  createListing,
  updateListing,
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
  // ...other fields
});
```

### Real-time Messaging

- Subscribe to new messages for a match:

```ts
import { subscribeToMessages } from "./lib/supabase-crud";

const subscription = subscribeToMessages(matchId, (message) => {
  // Handle new message
  console.log("New message:", message);
});
```

### Storage Uploads

- Upload a photo to a listing or profile:

```ts
import { uploadListingPhoto, uploadProfilePhoto } from "./lib/supabase-crud";

await uploadListingPhoto(file, listingId);
await uploadProfilePhoto(file, userId);
```

---

- All utilities throw on error, so wrap in try/catch for error handling.
- See `lib/supabase-crud.ts` for more details and extend as needed for your app.
