import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://qvnsflyuonkzlhsuuxtu.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2bnNmbHl1b25remxoc3V1eHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxNDQyNjYsImV4cCI6MjAyMDcyMDI2Nn0.Y3LuVclc3qGJmCpRMZjXrKj919rNINKpqoR6SdyJ6us';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
