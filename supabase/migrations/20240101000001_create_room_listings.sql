-- Create room listings table
CREATE TABLE IF NOT EXISTS public.room_listings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    currency TEXT DEFAULT 'ETB',
    room_type TEXT CHECK (room_type IN ('single', 'shared', 'studio', 'apartment')) NOT NULL,
    location TEXT NOT NULL,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    area_sqm INTEGER,
    available_from DATE,
    available_until DATE,
    is_available BOOLEAN DEFAULT TRUE,
    images TEXT[],
    amenities TEXT[],
    house_rules TEXT[],
    preferred_tenant_type TEXT CHECK (preferred_tenant_type IN ('student', 'professional', 'any')),
    max_tenants INTEGER DEFAULT 1,
    utilities_included BOOLEAN DEFAULT FALSE,
    internet_included BOOLEAN DEFAULT FALSE,
    parking_available BOOLEAN DEFAULT FALSE,
    pet_friendly BOOLEAN DEFAULT FALSE,
    smoking_allowed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.room_listings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view available listings" ON public.room_listings
    FOR SELECT USING (is_available = TRUE);

CREATE POLICY "Users can view their own listings" ON public.room_listings
    FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can create their own listings" ON public.room_listings
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own listings" ON public.room_listings
    FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own listings" ON public.room_listings
    FOR DELETE USING (auth.uid() = owner_id);

-- Create trigger for updated_at
CREATE TRIGGER update_room_listings_updated_at
    BEFORE UPDATE ON public.room_listings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column(); 