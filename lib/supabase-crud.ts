import { supabase, Profile, Listing, Message } from "./supabase";

// --- Listing Photos ---
export async function getListingPhotos(listingId: string): Promise<string[]> {
  const { data, error } = await supabase.storage
    .from("listing-photos")
    .list(listingId);

  if (error) {
    console.error("Error fetching listing photos:", error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Get public URLs for each photo
  const photoUrls = data
    .filter((file) => file.name !== ".emptyFolderPlaceholder")
    .map((file) => {
      const { data: urlData } = supabase.storage
        .from("listing-photos")
        .getPublicUrl(`${listingId}/${file.name}`);
      return urlData.publicUrl;
    });

  return photoUrls;
}

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
    .select()
    .single();
  if (error) throw error;
  return data as Profile;
}

export async function updateProfile(id: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select()
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

export async function getUserListings(userId: string) {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("provider_id", userId)
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("getUserListings error:", error);
    throw new Error(error.message || "Failed to fetch listings");
  }
  
  return (data || []) as Listing[];
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
    .select()
    .single();
  if (error) throw error;
  return data as Listing;
}

export async function updateListing(id: string, updates: Partial<Listing>) {
  const { data, error } = await supabase
    .from("listings")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Listing;
}

export async function deleteListing(id: string) {
  const { error } = await supabase
    .from("listings")
    .delete()
    .eq("id", id);
  if (error) throw error;
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
    .select()
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


// --- Saved Listings ---
export async function getSavedListings(userId: string) {
  const { data, error } = await supabase
    .from("saved_listings")
    .select("listing_id")
    .eq("user_id", userId);
  if (error) throw error;
  return data?.map((item) => item.listing_id) || [];
}

export async function saveListing(userId: string, listingId: string) {
  const { data, error } = await supabase
    .from("saved_listings")
    .insert([{ user_id: userId, listing_id: listingId }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function unsaveListing(userId: string, listingId: string) {
  const { error } = await supabase
    .from("saved_listings")
    .delete()
    .eq("user_id", userId)
    .eq("listing_id", listingId);
  if (error) throw error;
}

export async function isListingSaved(userId: string, listingId: string) {
  const { data, error } = await supabase
    .from("saved_listings")
    .select("id")
    .eq("user_id", userId)
    .eq("listing_id", listingId)
    .single();
  if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows found
  return !!data;
}

// --- Paginated Listings ---
export async function getActiveListingsPaginated(page: number = 1, limit: number = 9) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("listings")
    .select("*", { count: "exact" })
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { listings: data as Listing[], total: count || 0 };
}
