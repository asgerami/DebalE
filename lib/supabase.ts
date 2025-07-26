import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wmqjffwlotnacrqokale.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcWpmZndsb3RuYWNycW9rYWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MjA5NDIsImV4cCI6MjA2OTA5Njk0Mn0.qBwabvFQqFDXOmiTnNuYD7xTDMQzmvm-BZHTaBC2QGU";

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
