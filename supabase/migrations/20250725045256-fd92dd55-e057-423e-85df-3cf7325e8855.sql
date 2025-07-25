-- Fix RLS policies for bookings table to require authentication
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

-- Create new secure policies that require authentication
-- Users can only view their own bookings (based on email match)
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
TO authenticated
USING (email = auth.jwt() ->> 'email');

-- Allow authenticated users to create bookings with their own email
CREATE POLICY "Users can create their own bookings" 
ON public.bookings 
FOR INSERT 
TO authenticated
WITH CHECK (email = auth.jwt() ->> 'email');

-- Allow public (unauthenticated) booking creation for the booking form
-- This is needed for the public booking form to work
CREATE POLICY "Allow public booking creation" 
ON public.bookings 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Admin users can view all bookings (we'll implement admin role later if needed)
-- For now, we'll create a simple admin check based on a specific email
CREATE POLICY "Admin can view all bookings" 
ON public.bookings 
FOR SELECT 
TO authenticated
USING (auth.jwt() ->> 'email' = 'admin@travelagency.com');

-- Admin users can update and delete bookings
CREATE POLICY "Admin can update all bookings" 
ON public.bookings 
FOR UPDATE 
TO authenticated
USING (auth.jwt() ->> 'email' = 'admin@travelagency.com');

CREATE POLICY "Admin can delete all bookings" 
ON public.bookings 
FOR DELETE 
TO authenticated
USING (auth.jwt() ->> 'email' = 'admin@travelagency.com');