import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null | undefined;

// These are public Supabase client values. Vercel may omit VITE_* values from a
// cached/static build, so keep a project-scoped fallback for the browser client.
// Never place a service-role key here.
const PUBLIC_SUPABASE_URL = "https://dgfjqfntkkivnrwwsxle.supabase.co";
const PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnZmpxZm50a2tpdm5yd3dzeGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MDEyMDcsImV4cCI6MjEwMjI3NzIwN30.ZgY7tK-w8iajPvRNzuMPe8Z2XwTWc4Lkqae_TGjfqKI";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance !== undefined) return supabaseInstance;

  

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel Environment Variables.");
    supabaseInstance = null;
    return supabaseInstance;
  }

  supabaseInstance = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return supabaseInstance;
}

export const supabase = getSupabaseClient();
