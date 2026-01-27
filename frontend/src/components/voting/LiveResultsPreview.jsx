import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function LiveResultsPreview({ artists, results }) {
    // Flatten results into a single array of { artistId, voteCount }
    const artistVoteCounts = [];
    if (results) {
        Object.values(results).forEach(categoryList => {
            categoryList.forEach(item => {
                artistVoteCounts.push(item);
            });
        });
    }

    const topArtists = [...artists]
        .map(artist => {
            // Find vote count from flattened results or direct map
            const found = artistVoteCounts.find(r => r.artistId === artist.id);
            return { ...artist, voteCount: found ? found.voteCount : 0 };
        })
        .sort((a, b) => b.voteCount - a.voteCount)
        .slice(0, 3);

    return (
        <Card className="bg-white border border-slate-100 shadow-xl">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Live Results</h3>
                            <p className="text-xs text-slate-500 font-normal">Real-time voting updates</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-red-600">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-xs font-medium">LIVE</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                    {topArtists.map((artist, index) => (
                        <motion.div
                            key={artist.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3"
                        >
                            <div className="flex-shrink-0">
                                {index === 0 ? (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                        <Trophy className="w-4 h-4 text-white" />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                        <span className="text-sm font-bold text-slate-600">#{index + 1}</span>
                                    </div>
                                )}
                            </div>

                            <img
                                src={artist.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop`}
                                alt={artist.name}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow"
                            />

                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-slate-800 truncate">{artist.name}</p>
                                <p className="text-xs text-slate-500 truncate">{artist.song_title}</p>
                            </div>

                            <div className="text-right">
                                <span className="font-bold text-red-600 text-lg">{artist.voteCount}</span>
                                <span className="text-xs text-slate-400 block">votes</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <Link to={createPageUrl('Results')}>
                    <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                        View Full Results
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
