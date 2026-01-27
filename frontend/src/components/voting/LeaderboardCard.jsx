import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const rankIcons = {
    0: { icon: Trophy, color: 'text-amber-500' },
    1: { icon: Medal, color: 'text-slate-400' },
    2: { icon: Award, color: 'text-amber-700' },
};

export default function LeaderboardCard({ artists, results, title = "Top Nominees" }) {
    const sortedArtists = useMemo(() => {
        const getVoteCount = (artistId) => {
            if (!results || typeof results !== 'object') return 0;
            for (const cat in results) {
                if (Object.prototype.hasOwnProperty.call(results, cat)) {
                    const catList = results[cat];
                    if (Array.isArray(catList)) {
                        const found = catList.find(a => a && a.artistId === artistId);
                        if (found) return found.voteCount || 0;
                    }
                }
            }
            return 0;
        };

        return [...artists]
            .map(artist => ({ ...artist, voteCount: getVoteCount(artist.id) }))
            .sort((a, b) => b.voteCount - a.voteCount)
            .slice(0, 5);
    }, [artists, results]);

    return (
        <Card className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 bg-slate-50 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-tight">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
                {sortedArtists.map((artist, index) => {
                    const RankIcon = rankIcons[index]?.icon || null;
                    const rankColor = rankIcons[index]?.color || 'text-slate-400';

                    return (
                        <motion.div
                            key={artist.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group"
                        >
                            <div className="w-8 h-8 flex items-center justify-center shrink-0">
                                {RankIcon ? (
                                    <RankIcon className={`w-5 h-5 ${rankColor}`} />
                                ) : (
                                    <span className="text-xs font-bold text-slate-300 group-hover:text-slate-400 transition-colors">#{index + 1}</span>
                                )}
                            </div>

                            <img
                                src={artist.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop`}
                                alt={artist.name}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                            />

                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-slate-800 truncate text-sm leading-tight">{artist.name}</p>
                                <p className="text-[10px] text-slate-400 truncate uppercase tracking-widest font-semibold mt-0.5">{artist.song_title || 'Featured track'}</p>
                            </div>

                            <div className="text-right">
                                <span className="font-black text-red-600 block text-sm leading-none">{artist.voteCount.toLocaleString()}</span>
                                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">votes</span>
                            </div>
                        </motion.div>
                    );
                })}

                {sortedArtists.length === 0 && (
                    <div className="text-center py-6 text-slate-300 font-bold uppercase tracking-widest text-[10px]">
                        No activity yet
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
