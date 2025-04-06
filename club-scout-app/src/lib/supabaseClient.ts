import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create and export the Supabase client instance with type annotation.
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);
