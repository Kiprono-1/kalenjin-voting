// Vote persistence utilities using localStorage
const VOTE_CACHE_KEY = 'kmf_voted_artists';

export const voteCache = {
    // Get all cached votes
    getVotes: () => {
        try {
            const cached = localStorage.getItem(VOTE_CACHE_KEY);
            return cached ? JSON.parse(cached) : [];
        } catch {
            return [];
        }
    },

    // Add a vote to cache
    addVote: (artistId, category) => {
        const votes = voteCache.getVotes();
        const newVote = {
            artist_id: artistId,
            category_id: category,
            timestamp: Date.now()
        };

        // Prevent duplicates
        if (!votes.some(v => v.artist_id === artistId)) {
            votes.push(newVote);
            localStorage.setItem(VOTE_CACHE_KEY, JSON.stringify(votes));
        }
    },

    // Check if user has voted for an artist
    hasVoted: (artistId) => {
        const votes = voteCache.getVotes();
        return votes.some(v => v.artist_id === artistId);
    },

    // Check if user has voted in a category
    hasVotedInCategory: (category) => {
        const votes = voteCache.getVotes();
        return votes.some(v => v.category_id === category);
    },

    // Clear all cached votes (useful for logout)
    clear: () => {
        localStorage.removeItem(VOTE_CACHE_KEY);
    },

    // Sync with server data
    sync: (serverVotes) => {
        // Merge server votes with local cache, server takes precedence
        localStorage.setItem(VOTE_CACHE_KEY, JSON.stringify(serverVotes));
    }
};
