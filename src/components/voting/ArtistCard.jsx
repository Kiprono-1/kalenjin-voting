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
            <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={artist.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop`}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{artist.name}</h3>
                        {artist.region && (
                            <div className="flex items-center gap-1 text-white/80 text-sm">
                                <MapPin className="w-3 h-3" />
                                <span>{artist.region}</span>
                            </div>
                        )}
                    </div>
                    <Badge
                        className="absolute top-4 right-4 bg-amber-500/90 hover:bg-amber-500 text-white border-0"
                    >
                        {categoryLabels[artist.category] || artist.category}
                    </Badge>
                </div>

                <CardContent className="p-5">
                    {artist.song_title && (
                        <div className="flex items-center gap-2 mb-3 text-slate-600">
                            <Music2 className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-medium">"{artist.song_title}"</span>
                        </div>
                    )}

                    {artist.bio && (
                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{artist.bio}</p>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-500">
                            <span className="font-bold text-amber-600 text-lg">{voteCount}</span> votes
                        </div>

                        {isVotingLive && (
                            <Button
                                onClick={() => onVote(artist)}
                                disabled={hasVoted || isLoading}
                                className={`
                transition-all duration-300
                ${hasVoted
                                        ? 'bg-emerald-500 hover:bg-emerald-500 cursor-default'
                                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                                    }
              `}
                            >
                                <Vote className="w-4 h-4 mr-2" />
                                {hasVoted ? 'Voted' : 'Vote'}
                            </Button>
                        )}

                        {!isVotingLive && (
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full">
                                Voting Offline
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
