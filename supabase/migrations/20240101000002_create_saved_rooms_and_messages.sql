-- Create saved rooms table
CREATE TABLE IF NOT EXISTS public.saved_rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    room_id UUID REFERENCES public.room_listings(id) ON DELETE CASCADE NOT NULL,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, room_id)
);

-- Enable Row Level Security
ALTER TABLE public.saved_rooms ENABLE ROW LEVEL SECURITY;

-- Create policies for saved rooms
CREATE POLICY "Users can view their own saved rooms" ON public.saved_rooms
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save rooms" ON public.saved_rooms
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved rooms" ON public.saved_rooms
    FOR DELETE USING (auth.uid() = user_id);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    room_id UUID REFERENCES public.room_listings(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policies for messages
CREATE POLICY "Users can view messages they sent or received" ON public.messages
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON public.messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their own messages" ON public.messages
    FOR UPDATE USING (auth.uid() = sender_id);

-- Create indexes for better performance
CREATE INDEX idx_saved_rooms_user_id ON public.saved_rooms(user_id);
CREATE INDEX idx_saved_rooms_room_id ON public.saved_rooms(room_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON public.messages(receiver_id);
CREATE INDEX idx_messages_room_id ON public.messages(room_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at); 