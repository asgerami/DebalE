import { supabase, Profile, Listing, Message } from "./supabase";

// --- Profiles ---
export async function getProfile(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Profile;
}

export async function createProfile(profile: Partial<Profile>) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([profile])
    .single();
  if (error) throw error;
  return data as Profile;
}

export async function updateProfile(id: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Profile;
}

// --- Listings ---
export async function getActiveListings() {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Listing[];
}

export async function getListing(id: string) {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Listing;
}

export async function createListing(listing: Partial<Listing>) {
  const { data, error } = await supabase
    .from("listings")
    .insert([listing])
    .single();
  if (error) throw error;
  return data as Listing;
}

export async function updateListing(id: string, updates: Partial<Listing>) {
  const { data, error } = await supabase
    .from("listings")
    .update(updates)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Listing;
}

// --- Real-time Messaging ---
export function subscribeToMessages(
  matchId: string,
  callback: (message: Message) => void
) {
  return supabase
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `match_id=eq.${matchId}`,
      },
      (payload) => callback(payload.new as Message)
    )
    .subscribe();
}

export async function sendMessage(
  matchId: string,
  senderId: string,
  content: string
) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ match_id: matchId, sender_id: senderId, content }])
    .single();
  if (error) throw error;
  return data as Message;
}

// --- Storage Uploads ---
export async function uploadListingPhoto(file: File, listingId: string) {
  const filePath = `${listingId}/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("listing-photos")
    .upload(filePath, file);
  if (error) throw error;
  return data;
}

export async function uploadProfilePhoto(file: File, userId: string) {
  const filePath = `${userId}/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("profile-photos")
    .upload(filePath, file);
  if (error) throw error;
  return data;
}
