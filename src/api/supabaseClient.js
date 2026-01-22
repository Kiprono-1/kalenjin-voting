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

// Export a proxy or the instance to avoid crashes when calling .from()
// This proxy supports the chaining pattern used by supabase-js: .from().select().eq()...
const createChainProxy = () => {
    const chain = (...args) => chain;

    // Add known Supabase methods
    const methods = ['from', 'select', 'eq', 'order', 'single', 'insert', 'update', 'delete', 'match', 'range', 'limit'];
    methods.forEach(m => chain[m] = (...args) => chain);

    // Make it thenable to satisfy await
    chain.then = (onFullfilled) => Promise.resolve({ data: [], error: null }).then(onFullfilled);
    chain.catch = (onRejected) => Promise.resolve({ data: [], error: null }).catch(onRejected);

    return chain;
};

export const supabase = supabaseInstance || {
    auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
        signUp: () => Promise.reject(new Error('Supabase not configured')),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        signOut: () => Promise.resolve({ error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null })
    },
    from: () => createChainProxy()
};
