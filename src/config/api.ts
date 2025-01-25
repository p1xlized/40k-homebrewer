import { createClient } from "@supabase/supabase-js";

// Ensure these environment variables are defined in your `.env` file
const supabaseUrl = import.meta.env.VITE_API_URL; // Your Supabase URL
const supabaseKey = import.meta.env.VITE_API_KEY; // Your Supabase Key

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
