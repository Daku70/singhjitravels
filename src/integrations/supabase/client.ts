// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yczuzxbuaivmsyixpdbn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljenV6eGJ1YWl2bXN5aXhwZGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMzAzMTgsImV4cCI6MjA2ODYwNjMxOH0.805NmOOPK0SGZAqyKqhsMI7huZnFNWldRdosLBkqZL4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});