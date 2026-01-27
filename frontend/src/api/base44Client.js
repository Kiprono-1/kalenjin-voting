import { supabase } from './supabaseClient';

export const base44 = {
    auth: {
        login: async (email, password) => {
            if (!password) {
                // Trigger OTP (Magic Link)
                const { error } = await supabase.auth.signInWithOtp({
                    email,
                    options: {
                        emailRedirectTo: window.location.origin,
                    }
                });
                if (error) throw error;
                return { otpSent: true };
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;

            return data.user;
        },
        loginWithGoogle: async () => {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin,
                }
            });
            if (error) throw error;
            return data;
        },
        verifyOtp: async (email, token, type = 'magiclink') => {
            const { data, error } = await supabase.auth.verifyOtp({
                email,
                token,
                type // 'magiclink' for login OTP, 'recovery' for password reset OTP
            });
            if (error) throw error;
            return data.user;
        },
        register: async ({ email, password, name, phone }) => {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        phone: phone
                    }
                }
            });
            if (error) throw error;
            return data;
        },
        logout: async () => {
            await supabase.auth.signOut();
            localStorage.removeItem('user_session');
            window.location.href = '/login';
        },
        me: async () => {
            try {
                const { data: { user }, error: authError } = await supabase.auth.getUser();

                if (authError || !user) {
                    throw new Error('Not authenticated');
                }

                // 2. Fetch profile
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileError || !profile) {
                    throw new Error('USER_NOT_REGISTERED');
                }

                return {
                    ...user,
                    role: profile?.role || 'voter',
                    name: profile?.name || user.email.split('@')[0]
                };
            } catch (err) {
                console.error('Auth Error:', err.message);
                throw err;
            }
        },
        forceLogout: async () => {
            localStorage.clear();
            await supabase.auth.signOut();
            window.location.href = '/login';
        },
        updatePassword: async (newPassword) => {
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword
            });
            if (error) throw error;
            return data;
        },
        resetPassword: async (email) => {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/login?type=recovery`,
            });
            if (error) throw error;
            return { otpSent: true, ...data };
        },
        listUsers: async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        },
        redirectToLogin: () => {
            window.location.href = '/login';
        }
    },
    entities: {
        Artist: {
            list: async (status = null) => {
                // Fetch artists with their category names joined
                let query = supabase
                    .from('artists')
                    .select('*, categories(name)');

                if (status) {
                    query = query.eq('status', status);
                }

                const { data, error } = await query.order('name');

                if (error) throw error;

                // Map to match frontend expectations (flatten category name)
                return data.map(artist => ({
                    ...artist,
                    category: artist.categories?.name || artist.category_id,
                    image_url: artist.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop`
                }));
            },
            create: async (artistData) => {
                // We need to resolve category name to ID if the frontend sends name
                let categoryId = artistData.category_id;

                if (!categoryId && artistData.category) {
                    const { data: cat } = await supabase
                        .from('categories')
                        .select('id')
                        .eq('name', artistData.category)
                        .single();
                    if (cat) categoryId = cat.id;
                }

                const { data, error } = await supabase
                    .from('artists')
                    .insert([{
                        name: artistData.name,
                        real_name: artistData.real_name,
                        gender: artistData.gender,
                        song_title: artistData.song_title,
                        region: artistData.region,
                        image_url: artistData.image_url,
                        category_id: categoryId,
                        status: 'pending'
                    }])
                    .select()
                    .single();

                if (error) throw error;
                return data;
            },
            update: async (id, artistData) => {
                // Sanitize: Remove joined data and non-updatable fields 
                // that would cause "column not found" errors in Supabase
                const {
                    categories,
                    category,
                    id: _id,
                    created_at,
                    ...updatableData
                } = artistData;

                const { data, error } = await supabase
                    .from('artists')
                    .update(updatableData)
                    .eq('id', id)
                    .select()
                    .single();

                if (error) throw error;
                return data;
            },
            delete: async (id) => {
                const { error } = await supabase
                    .from('artists')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                return { success: true };
            },
            updateStatus: async (id, status) => {
                const { data, error } = await supabase
                    .from('artists')
                    .update({ status })
                    .eq('id', id)
                    .select();

                if (error) {
                    console.error(`Error updating artist status to ${status}:`, error);
                    throw error;
                }

                if (!data || data.length === 0) {
                    throw new Error(`Permission Denied or Artist Not Found: Could not update status for ID ${id}. This usually means RLS is blocking the update.`);
                }

                return data[0];
            }
        },
        Vote: {
            getStats: async () => {
                try {
                    // Optimized: Try calling RPC first (Scaling for 100k+ users)
                    const { data: rpcData, error: rpcError } = await supabase.rpc('get_vote_stats');

                    if (!rpcError && rpcData) return rpcData;

                    // Fallback to client-side aggregation if RPC is missing
                    const { data: votes, error } = await supabase
                        .from('votes')
                        .select('artist_id, category_id, categories(name)');

                    if (error) throw error;
                    if (!votes || !Array.isArray(votes)) return {};

                    return votes.reduce((acc, vote) => {
                        const category = vote.categories?.name || 'Uncategorized';
                        if (!Object.prototype.hasOwnProperty.call(acc, category)) {
                            acc[category] = [];
                        }
                        if (!Array.isArray(acc[category])) return acc;

                        let artistEntry = acc[category].find(a => a && a.artistId === vote.artist_id);
                        if (!artistEntry) {
                            artistEntry = { artistId: vote.artist_id, voteCount: 0 };
                            acc[category].push(artistEntry);
                        }
                        artistEntry.voteCount++;
                        return acc;
                    }, {});
                } catch (error) {
                    console.error("Failed to fetch vote stats:", error);
                    return {};
                }
            },
            getMyVotes: async () => {
                try {
                    const { data: { user } } = await supabase.auth.getUser();
                    if (!user) return [];

                    const { data, error } = await supabase
                        .from('votes')
                        .select('artist_id, category_id, categories(name)')
                        .eq('user_id', user.id);

                    if (error) throw error;

                    return data.map(v => ({
                        artist_id: v.artist_id,
                        category_id: v.categories?.name || v.category_id
                    }));
                } catch (error) {
                    console.error("Failed to fetch  votes:", error);
                    return [];
                }
            },
            create: async (voteData) => {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) throw new Error('Authentication required');

                // If frontend sends category name, we need to find the UUID
                let categoryId = voteData.category_id;
                if (!categoryId && voteData.category) {
                    const { data: cat } = await supabase
                        .from('categories')
                        .select('id')
                        .eq('name', voteData.category)
                        .single();
                    if (cat) categoryId = cat.id;
                }

                const { data, error } = await supabase
                    .from('votes')
                    .insert([{
                        user_id: user.id,
                        artist_id: voteData.artist_id,
                        category_id: categoryId
                    }])
                    .select()
                    .single();

                if (error) throw error;
                return data;
            },
            list: async () => {
                const { data, error } = await supabase
                    .from('votes')
                    .select('*, categories(name), artists(name), profiles:user_id(email, name)')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                return data.map(v => ({
                    ...v,
                    category_name: v.categories?.name,
                    artist_name: v.artists?.name,
                    user_email: v.profiles?.email,
                    user_name: v.profiles?.name
                }));
            },
            deleteAll: async () => {
                const { error } = await supabase
                    .from('votes')
                    .delete()
                    .neq('id', 0); // Hack to delete all rows since we need a where clause

                if (error) throw error;
                return true;
            }
        },
        Category: {
            list: async () => {
                const { data, error } = await supabase
                    .from('categories')
                    .select('*')
                    .order('name');
                if (error) throw error;
                return data;
            }
        },
        Storage: {
            uploadArtistImage: async (file) => {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { data, error } = await supabase.storage
                    .from('artist-images')
                    .upload(filePath, file);

                if (error) throw error;

                // Get public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('artist-images')
                    .getPublicUrl(filePath);

                return publicUrl;
            }
        },
        Settings: {
            get: async (key) => {
                const { data, error } = await supabase
                    .from('settings')
                    .select('value')
                    .eq('key', key)
                    .maybeSingle();

                if (error) throw error;
                return data?.value;
            },
            set: async (key, value) => {
                const { data, error } = await supabase
                    .from('settings')
                    .upsert({ key, value })
                    .select()
                    .single();

                if (error) throw error;
                return data;
            }
        }
    }
};
