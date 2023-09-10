import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://srqmhaicvoypcpcnblpq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNycW1oYWljdm95cGNwY25ibHBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczMzUzMjgsImV4cCI6MjAwMjkxMTMyOH0.OrvEGESFZP8TPnDwDD39vQm86GhcoZ9SocipJW9_ftM';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;