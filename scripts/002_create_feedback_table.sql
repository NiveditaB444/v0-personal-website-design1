-- Create feedback table with proper structure and RLS policies
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read feedback (public viewing)
CREATE POLICY "Allow public read access" ON public.feedback
    FOR SELECT USING (true);

-- Create policy to allow anyone to insert feedback (public submission)
CREATE POLICY "Allow public insert access" ON public.feedback
    FOR INSERT WITH CHECK (true);

-- Create index for better performance when ordering by created_at
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON public.feedback(created_at DESC);
