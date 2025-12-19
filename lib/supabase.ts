import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- TypeScript types for main tables ---
export type Profile = {
  id: string;
  user_type: "seeker" | "provider";
  full_name: string;
  age: number | null;
  gender: "male" | "female" | "any" | null;
  phone: string | null;
  phone_verified: boolean;
  avatar_url: string | null;
  occupation: string | null;
  languages: string[];
  current_location: string | null;
  bio: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
  last_active: string;
};

export type Listing = {
  id: string;
  provider_id: string;
  title: string;
  description: string | null;
  monthly_rent: number;
  deposit_amount: number | null;
  utilities_included: boolean;
  area: string;
  neighborhood: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  room_type: string;
  room_size: string | null;
  furnished: boolean;
  private_bathroom: boolean;
  wifi: boolean;
  kitchen_access: boolean;
  laundry: boolean;
  parking: boolean;
  security: boolean;
  house_rules: string | null;
  available_from: string | null;
  lease_duration: number | null;
  current_roommates: number;
  max_roommates: number;
  preferred_tenant_age_min: number;
  preferred_tenant_age_max: number;
  preferred_tenant_gender: "male" | "female" | "any";
  preferred_tenant_occupation: string[];
  is_active: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
};

export type Message = {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  message_type: string;
  read_at: string | null;
  created_at: string;
};

export type Match = {
  id: string;
  seeker_id: string;
  provider_id: string;
  listing_id: string;
  compatibility_score: number;
  seeker_interested: boolean | null;
  provider_interested: boolean | null;
  mutual_match: boolean;
  created_at: string;
};
