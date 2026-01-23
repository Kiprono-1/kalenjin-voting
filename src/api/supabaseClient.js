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

// Export a safety proxy to prevent crashing if config is missing
export const supabase = supabaseInstance || new Proxy({}, {
    get: (target, prop) => {
        if (prop === 'auth') {
            return {
                getUser: () => Promise.resolve({ data: { user: null }, error: null }),
                signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
                signInWithOAuth: () => Promise.reject(new Error('Supabase not configured')),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } })
            };
        }
        return () => ({
            from: () => { throw new Error('Supabase not configured. Check your .env file.'); },
            select: () => { throw new Error('Supabase not configured. Check your .env file.'); }
        });
    }
});
