export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          date_of_birth: string | null
          gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
          occupation: string | null
          university: string | null
          bio: string | null
          languages: string[] | null
          budget_min: number | null
          budget_max: number | null
          preferred_areas: string[] | null
          room_type: 'single' | 'shared' | 'studio' | 'apartment' | null
          move_in_date: string | null
          smoking_preference: 'non_smoker' | 'smoker' | 'no_preference' | null
          pets_preference: 'no_pets' | 'have_pets' | 'ok_with_pets' | null
          social_level: 'introvert' | 'extrovert' | 'balanced' | null
          cleanliness_level: 'very_clean' | 'clean' | 'moderate' | 'relaxed' | null
          id_type: string | null
          student_id: string | null
          employment_letter: boolean | null
          profile_complete_percentage: number | null
          is_verified: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
          occupation?: string | null
          university?: string | null
          bio?: string | null
          languages?: string[] | null
          budget_min?: number | null
          budget_max?: number | null
          preferred_areas?: string[] | null
          room_type?: 'single' | 'shared' | 'studio' | 'apartment' | null
          move_in_date?: string | null
          smoking_preference?: 'non_smoker' | 'smoker' | 'no_preference' | null
          pets_preference?: 'no_pets' | 'have_pets' | 'ok_with_pets' | null
          social_level?: 'introvert' | 'extrovert' | 'balanced' | null
          cleanliness_level?: 'very_clean' | 'clean' | 'moderate' | 'relaxed' | null
          id_type?: string | null
          student_id?: string | null
          employment_letter?: boolean | null
          profile_complete_percentage?: number | null
          is_verified?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
          occupation?: string | null
          university?: string | null
          bio?: string | null
          languages?: string[] | null
          budget_min?: number | null
          budget_max?: number | null
          preferred_areas?: string[] | null
          room_type?: 'single' | 'shared' | 'studio' | 'apartment' | null
          move_in_date?: string | null
          smoking_preference?: 'non_smoker' | 'smoker' | 'no_preference' | null
          pets_preference?: 'no_pets' | 'have_pets' | 'ok_with_pets' | null
          social_level?: 'introvert' | 'extrovert' | 'balanced' | null
          cleanliness_level?: 'very_clean' | 'clean' | 'moderate' | 'relaxed' | null
          id_type?: string | null
          student_id?: string | null
          employment_letter?: boolean | null
          profile_complete_percentage?: number | null
          is_verified?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      room_listings: {
        Row: {
          id: string
          owner_id: string
          title: string
          description: string | null
          price: number
          currency: string | null
          room_type: 'single' | 'shared' | 'studio' | 'apartment'
          location: string
          address: string | null
          latitude: number | null
          longitude: number | null
          area_sqm: number | null
          available_from: string | null
          available_until: string | null
          is_available: boolean | null
          images: string[] | null
          amenities: string[] | null
          house_rules: string[] | null
          preferred_tenant_type: 'student' | 'professional' | 'any' | null
          max_tenants: number | null
          utilities_included: boolean | null
          internet_included: boolean | null
          parking_available: boolean | null
          pet_friendly: boolean | null
          smoking_allowed: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          owner_id: string
          title: string
          description?: string | null
          price: number
          currency?: string | null
          room_type: 'single' | 'shared' | 'studio' | 'apartment'
          location: string
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          area_sqm?: number | null
          available_from?: string | null
          available_until?: string | null
          is_available?: boolean | null
          images?: string[] | null
          amenities?: string[] | null
          house_rules?: string[] | null
          preferred_tenant_type?: 'student' | 'professional' | 'any' | null
          max_tenants?: number | null
          utilities_included?: boolean | null
          internet_included?: boolean | null
          parking_available?: boolean | null
          pet_friendly?: boolean | null
          smoking_allowed?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          owner_id?: string
          title?: string
          description?: string | null
          price?: number
          currency?: string | null
          room_type?: 'single' | 'shared' | 'studio' | 'apartment'
          location?: string
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          area_sqm?: number | null
          available_from?: string | null
          available_until?: string | null
          is_available?: boolean | null
          images?: string[] | null
          amenities?: string[] | null
          house_rules?: string[] | null
          preferred_tenant_type?: 'student' | 'professional' | 'any' | null
          max_tenants?: number | null
          utilities_included?: boolean | null
          internet_included?: boolean | null
          parking_available?: boolean | null
          pet_friendly?: boolean | null
          smoking_allowed?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      saved_rooms: {
        Row: {
          id: string
          user_id: string
          room_id: string
          saved_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          room_id: string
          saved_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          room_id?: string
          saved_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          room_id: string | null
          content: string
          is_read: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          room_id?: string | null
          content: string
          is_read?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          room_id?: string | null
          content?: string
          is_read?: boolean | null
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
