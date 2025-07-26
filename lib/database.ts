import { supabase } from './supabase'
import type { Database } from '../supabase/integrations/supabase/types'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']
type UserProfileInsert = Database['public']['Tables']['user_profiles']['Insert']
type UserProfileUpdate = Database['public']['Tables']['user_profiles']['Update']

type RoomListing = Database['public']['Tables']['room_listings']['Row']
type RoomListingInsert = Database['public']['Tables']['room_listings']['Insert']

type SavedRoom = Database['public']['Tables']['saved_rooms']['Row']
type SavedRoomInsert = Database['public']['Tables']['saved_rooms']['Insert']

type Message = Database['public']['Tables']['messages']['Row']
type MessageInsert = Database['public']['Tables']['messages']['Insert']

// User Profile Operations
export const userProfileService = {
  // Get current user's profile
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return data
  },

  // Create or update user profile
  async upsertUserProfile(profile: UserProfileInsert): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(profile)
      .select()
      .single()

    if (error) {
      console.error('Error upserting user profile:', error)
      return null
    }

    return data
  },

  // Update user profile
  async updateUserProfile(updates: UserProfileUpdate): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating user profile:', error)
      return null
    }

    return data
  },

  // Calculate profile completion percentage
  calculateProfileCompletion(profile: UserProfile): number {
    const fields = [
      'full_name',
      'phone',
      'date_of_birth',
      'gender',
      'occupation',
      'bio',
      'budget_min',
      'budget_max',
      'preferred_areas',
      'room_type',
      'move_in_date',
      'smoking_preference',
      'pets_preference',
      'social_level',
      'cleanliness_level'
    ]

    const completedFields = fields.filter(field => 
      profile[field as keyof UserProfile] !== null && 
      profile[field as keyof UserProfile] !== undefined
    )

    return Math.round((completedFields.length / fields.length) * 100)
  }
}

// Room Listing Operations
export const roomListingService = {
  // Get all available room listings
  async getAvailableListings(): Promise<RoomListing[]> {
    const { data, error } = await supabase
      .from('room_listings')
      .select(`
        *,
        user_profiles!room_listings_owner_id_fkey (
          full_name,
          is_verified
        )
      `)
      .eq('is_available', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching room listings:', error)
      return []
    }

    return data || []
  },

  // Get room listing by ID
  async getRoomListing(id: string): Promise<RoomListing | null> {
    const { data, error } = await supabase
      .from('room_listings')
      .select(`
        *,
        user_profiles!room_listings_owner_id_fkey (
          full_name,
          phone,
          is_verified
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching room listing:', error)
      return null
    }

    return data
  },

  // Create new room listing
  async createRoomListing(listing: RoomListingInsert): Promise<RoomListing | null> {
    const { data, error } = await supabase
      .from('room_listings')
      .insert(listing)
      .select()
      .single()

    if (error) {
      console.error('Error creating room listing:', error)
      return null
    }

    return data
  },

  // Get user's own listings
  async getUserListings(): Promise<RoomListing[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from('room_listings')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user listings:', error)
      return []
    }

    return data || []
  }
}

// Saved Rooms Operations
export const savedRoomsService = {
  // Get user's saved rooms
  async getSavedRooms(): Promise<SavedRoom[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from('saved_rooms')
      .select(`
        *,
        room_listings!saved_rooms_room_id_fkey (*)
      `)
      .eq('user_id', user.id)
      .order('saved_at', { ascending: false })

    if (error) {
      console.error('Error fetching saved rooms:', error)
      return []
    }

    return data || []
  },

  // Save a room
  async saveRoom(roomId: string): Promise<SavedRoom | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('saved_rooms')
      .insert({ user_id: user.id, room_id: roomId })
      .select()
      .single()

    if (error) {
      console.error('Error saving room:', error)
      return null
    }

    return data
  },

  // Remove saved room
  async removeSavedRoom(roomId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
      .from('saved_rooms')
      .delete()
      .eq('user_id', user.id)
      .eq('room_id', roomId)

    if (error) {
      console.error('Error removing saved room:', error)
      return false
    }

    return true
  },

  // Check if room is saved
  async isRoomSaved(roomId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data, error } = await supabase
      .from('saved_rooms')
      .select('id')
      .eq('user_id', user.id)
      .eq('room_id', roomId)
      .single()

    if (error) return false
    return !!data
  }
}

// Messages Operations
export const messagesService = {
  // Get user's conversations
  async getConversations(): Promise<Message[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        user_profiles!messages_sender_id_fkey (full_name),
        user_profiles!messages_receiver_id_fkey (full_name)
      `)
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching conversations:', error)
      return []
    }

    return data || []
  },

  // Send a message
  async sendMessage(message: MessageInsert): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single()

    if (error) {
      console.error('Error sending message:', error)
      return null
    }

    return data
  },

  // Mark message as read
  async markAsRead(messageId: string): Promise<boolean> {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', messageId)

    if (error) {
      console.error('Error marking message as read:', error)
      return false
    }

    return true
  }
} 