import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigValid = supabaseUrl && supabaseUrl.startsWith('https://') && supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE';

let supabaseInstance = null;

if (isConfigValid) {
    try {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    } catch (e) {
        console.error('Failed to initialize Supabase:', e);
    }
} else {
    console.warn('Supabase credentials missing or invalid. Please update your .env file with live credentials.');
}

export const supabase = supabaseInstance;
