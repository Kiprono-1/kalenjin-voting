import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, MapPin, Music2 } from 'lucide-react';
import { motion } from 'framer-motion';

const categoryLabels = {
    'Best Overall Artiste – Secular': "Secular Legend",
    'Best Overall Artiste – Gospel': "Gospel Legend",
    'Best Male Secular': "Male Secular",
    'Best Female Secular': "Female Secular",
    'Best Female Gospel': "Female Gospel",
    'Best Male Gospel': "Male Gospel",
    'Best Male Upcoming Gospel Artiste (North Rift)': "Upc Gospel (NR)",
    'Best Male Upcoming Gospel Artiste (South Rift)': "Upc Gospel (SR)",
    'Best Female Upcoming Gospel Artiste (North Rift)': "Upc Gospel (NR)",
    'Best Female Upcoming Gospel Artiste (South Rift)': "Upc Gospel (SR)",
    'Best Male Upcoming Secular Artiste (North Rift)': "Upc Secular (NR)",
    'Best Male Upcoming Secular Artiste (South Rift)': "Upc Secular (SR)",
    'Best Female Upcoming Secular Artiste (North Rift)': "Upc Secular (NR)",
    'Best Female Upcoming Secular Artiste (South Rift)': "Upc Secular (SR)",
    'Diaspora Artiste of the Year': "Diaspora",
    'Ceremonial Artiste of the Year': "Ceremonial"
};

export default function ArtistCard({ artist, onVote, hasVoted, voteCount, isLoading, isVotingLive }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                        src={artist.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop`}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-bold mb-0.5">{artist.name}</h3>
                        {artist.region && (
                            <div className="flex items-center gap-1 text-white/80 text-xs font-medium uppercase tracking-wider">
                                <MapPin className="w-3 h-3" />
                                <span>{artist.region}</span>
                            </div>
                        )}
                    </div>
                </div>

                <CardContent className="p-5">
                    <Badge className="mb-3 bg-slate-900 text-white border-0 text-[10px] font-bold uppercase tracking-widest px-2.5">
                        {categoryLabels[artist.category] || artist.category}
                    </Badge>

                    {artist.song_title && (
                        <div className="flex items-center gap-2 mb-4 text-slate-600">
                            <Music2 className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-semibold truncate italic">"{artist.song_title}"</span>
                        </div>
                    )}

                    <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                            <span className="text-lg text-slate-900 block font-black leading-none">{voteCount.toLocaleString()}</span>
                            votes
                        </div>

                        {isVotingLive && (
                            <Button
                                onClick={() => onVote(artist)}
                                disabled={hasVoted || isLoading}
                                className={`
                                    transition-all duration-300 font-bold px-6 rounded-xl
                                    ${hasVoted
                                        ? 'bg-emerald-500 hover:bg-emerald-500 cursor-default shadow-emerald-100 shadow-lg text-white'
                                        : 'bg-red-600 hover:bg-red-700 text-white shadow-red-100 shadow-lg'
                                    }
                                `}
                            >
                                <Vote className="w-4 h-4 mr-2" />
                                {hasVoted ? 'Voted' : 'Vote'}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
