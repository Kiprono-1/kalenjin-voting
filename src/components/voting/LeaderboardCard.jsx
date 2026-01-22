import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const rankIcons = {
    0: { icon: Trophy, color: 'text-amber-500' },
    1: { icon: Medal, color: 'text-slate-400' },
    2: { icon: Award, color: 'text-amber-700' },
};

export default function LeaderboardCard({ artists, results, title = "Top Artists" }) {
    const getVoteCount = (artistId) => {
        // Flatten results to find artist
        // faster than double loop every time: build a map once? 
        // For card simplicity, we just iterate.
        if (!results) return 0;
        for (const cat in results) {
            const found = results[cat].find(a => a.artistId === artistId);
            if (found) return found.voteCount;
        }
        return 0;
    };

    const sortedArtists = [...artists]
        .map(artist => ({ ...artist, voteCount: getVoteCount(artist.id) }))
        .sort((a, b) => b.voteCount - a.voteCount)
        .slice(0, 5);

    return (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {sortedArtists.map((artist, index) => {
                    const RankIcon = rankIcons[index]?.icon || null;
                    const rankColor = rankIcons[index]?.color || 'text-slate-400';

                    return (
                        <motion.div
                            key={artist.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors"
                        >
                            <div className="w-8 h-8 flex items-center justify-center">
                                {RankIcon ? (
                                    <RankIcon className={`w-5 h-5 ${rankColor}`} />
                                ) : (
                                    <span className="text-sm font-bold text-slate-400">#{index + 1}</span>
                                )}
                            </div>

                            <img
                                src={artist.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop`}
                                alt={artist.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-800 truncate">{artist.name}</p>
                                <p className="text-xs text-slate-500 truncate">{artist.song_title}</p>
                            </div>

                            <div className="text-right">
                                <span className="font-bold text-amber-600">{artist.voteCount}</span>
                                <span className="text-xs text-slate-400 ml-1">votes</span>
                            </div>
                        </motion.div>
                    );
                })}

                {sortedArtists.length === 0 && (
                    <p className="text-center text-slate-400 py-4">No artists yet</p>
                )}
            </CardContent>
        </Card>
    );
}
