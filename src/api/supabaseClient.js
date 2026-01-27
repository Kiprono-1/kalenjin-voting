import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigValid = supabaseUrl && supabaseUrl.startsWith('https://') && supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE';

let supabaseInstance = null;

if (isConfigValid) {
    try {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    } catch (e) {
        console.error('Failed to initialize DB:', e);
    }
} else {
    console.warn('DB credentials missing or invalid.V');
}

// Export a safety proxy to prevent crashing if config is missing
// This allows the app to load and show "Connection Error" instead of white-screening
const createMockChain = () => {
    const fn = () => fn;
    fn.then = (cb) => cb({ data: null, error: new Error('DB not configured') });
    fn.catch = (cb) => cb(new Error('DB not configured'));
    fn.single = () => fn;
    fn.select = () => fn;
    fn.from = () => fn;
    fn.eq = () => fn;
    fn.order = () => fn;
    fn.limit = () => fn;
    fn.insert = () => fn;
    fn.update = () => fn;
    fn.delete = () => fn;
    fn.neq = () => fn;
    fn.upload = () => Promise.reject(new Error('DB not configured'));
    fn.getPublicUrl = () => ({ data: { publicUrl: null } });
    return fn;
};

export const supabase = supabaseInstance || new Proxy({}, {
    get: (target, prop) => {
        if (prop === 'auth') {
            return {
                getUser: () => Promise.resolve({ data: { user: null }, error: null }),
                signInWithPassword: () => Promise.reject(new Error('DB not configured')),
                signInWithOAuth: () => Promise.reject(new Error('DB not configured')),
                signInWithOtp: () => Promise.reject(new Error('DB not configured')),
                verifyOtp: () => Promise.reject(new Error('DB not configured')),
                signUp: () => Promise.reject(new Error('DB not configured')),
                signOut: () => Promise.resolve({ error: null }),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
                resetPasswordForEmail: () => Promise.reject(new Error('DB not configured')),
                updateUser: () => Promise.reject(new Error('DB not configured')),
            };
        }
        if (prop === 'storage') {
            return { from: () => createMockChain() };
        }
        if (prop === 'from') {
            return () => createMockChain();
        }
        return createMockChain();
    }
});
