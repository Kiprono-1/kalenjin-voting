import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, Sparkles, MapPin, TrendingUp, ArrowRight, Star, Music, Users } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

function trophyIcon(props) { return <Trophy {...props} /> }
function starIcon(props) { return <Star {...props} /> }
function musicIcon(props) { return <Music {...props} /> }

const GROUPS = {
    GROUP1: {
        title: "Overall Categories",
        prizes: "Ksh 1M, 500K, 300K",
        icon: trophyIcon,
        theme: "amber",
        gradient: "from-amber-400 via-amber-200 to-amber-500",
        bgGradient: "from-amber-500/10 to-transparent",
        categories: [
            'Best Overall Artiste – Secular',
            'Best Overall Artiste – Gospel'
        ]
    },
    GROUP2: {
        title: "Major Categories",
        prizes: "Ksh 500K, 300K, 200K",
        icon: starIcon,
        theme: "red",
        gradient: "from-red-600 via-red-400 to-red-600",
        bgGradient: "from-red-600/10 to-transparent",
        categories: [
            'Best Male Secular',
            'Best Female Secular',
            'Best Female Gospel',
            'Best Male Gospel'
        ]
    },
    GROUP3: {
        title: "Upcoming & Special",
        prizes: "Ksh 300K, 200K, 100K",
        icon: musicIcon,
        theme: "orange",
        gradient: "from-orange-500 via-orange-300 to-orange-600",
        bgGradient: "from-orange-500/10 to-transparent",
        categories: [
            'Best Male Upcoming Gospel Artiste (North Rift)',
            'Best Male Upcoming Gospel Artiste (South Rift)',
            'Best Female Upcoming Gospel Artiste (North Rift)',
            'Best Female Upcoming Gospel Artiste (South Rift)',
            'Best Male Upcoming Secular Artiste (North Rift)',
            'Best Male Upcoming Secular Artiste (South Rift)',
            'Best Female Upcoming Secular Artiste (North Rift)',
            'Best Female Upcoming Secular Artiste (South Rift)',
            'Diaspora Artiste of the Year',
            'Ceremonial Artiste of the Year'
        ]
    }
};

const Podium = ({ topArtists }) => {
    if (!topArtists || topArtists.length < 1) return null;

    const positions = [
        { rank: 2, artist: topArtists[1], h: "h-32", color: "from-slate-300 to-slate-400", glow: "shadow-slate-500/20", icon: Medal },
        { rank: 1, artist: topArtists[0], h: "h-48", color: "from-amber-400 via-amber-300 to-amber-500", glow: "shadow-amber-500/40", icon: Trophy },
        { rank: 3, artist: topArtists[2], h: "h-24", color: "from-amber-700 to-amber-900", glow: "shadow-amber-900/20", icon: Award },
    ];

    return (
        <div className="flex items-end justify-center gap-1 md:gap-8 mb-24 px-2 md:px-4">
            {positions.map((pos, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
                    className="flex flex-col items-center flex-1 max-w-[200px]"
                >
                    {pos.artist && (
                        <div className="mb-6 text-center group">
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className={`absolute -inset-2 rounded-full bg-gradient-to-r ${pos.color} opacity-30 blur-md group-hover:opacity-60 transition-opacity`}
                                />
                                <img
                                    src={pos.artist.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop`}
                                    alt={pos.artist.name}
                                    className={`relative w-16 h-16 md:w-28 md:h-28 rounded-full object-cover ring-4 ${pos.rank === 1 ? 'ring-amber-400' : 'ring-white'} shadow-2xl transition-transform group-hover:scale-110`}
                                />
                                <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br ${pos.color} flex items-center justify-center border-4 border-slate-900 shadow-lg`}>
                                    <pos.icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <p className="mt-6 font-black text-white truncate w-full px-2 text-sm md:text-lg uppercase tracking-tight">
                                {pos.artist.name}
                            </p>
                            <p className={`font-black text-xl bg-clip-text text-transparent bg-gradient-to-r ${pos.color}`}>
                                {pos.artist.voteCount?.toLocaleString() || 0} <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Votes</span>
                            </p>
                        </div>
                    )}
                    <div className={`${pos.h} w-full bg-gradient-to-b ${pos.color} rounded-t-[2.5rem] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.5)] ${pos.glow} relative flex items-center justify-center overflow-hidden border-t border-white/20 shadow-2xl`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]" />
                        <span className="text-5xl md:text-8xl font-black text-black/20 italic relative z-10">{pos.rank}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default function ResultsSection({ artists, results }) {
    const topOverall = useMemo(() => {
        const allVotesMap = {};
        if (results && typeof results === 'object') {
            Object.values(results).forEach(catResults => {
                if (Array.isArray(catResults)) {
                    catResults.forEach(r => {
                        if (r && r.artistId) {
                            allVotesMap[r.artistId] = (allVotesMap[r.artistId] || 0) + (r.voteCount || 0);
                        }
                    });
                }
            });
        }

        return Object.entries(allVotesMap)
            .map(([id, count]) => {
                const artist = artists.find(a => a && a.id === id);
                return artist ? { ...artist, voteCount: count } : null;
            })
            .filter(a => a !== null)
            .sort((a, b) => b.voteCount - a.voteCount)
            .slice(0, 3);
    }, [artists, results]);

    const renderCategoryResults = (catName, themeGradient) => {
        const catResults = (results && results[catName]) || [];
        const enrichedResults = Array.isArray(catResults)
            ? catResults.map(r => {
                const artist = artists.find(a => a && a.id === r.artistId);
                return artist ? { ...r, ...artist } : { ...r, name: 'Unknown Artist' };
            }).sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
            : [];

        const zeroVoteArtists = artists
            .filter(a => a.category === catName && !catResults.some(r => r.artistId === a.id))
            .map(a => ({ artistId: a.id, voteCount: 0, ...a }));

        const allResults = [...enrichedResults, ...zeroVoteArtists];

        return (
            <div key={catName} className="mb-12 last:mb-0">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`w-2.5 h-10 bg-gradient-to-b ${themeGradient} rounded-full shadow-lg shadow-red-500/20`} />
                        <h4 className="text-xl font-black text-white uppercase tracking-tighter leading-none pt-1">
                            {catName}
                        </h4>
                    </div>
                    <div className="bg-white/20 px-4 py-1.5 rounded-full border border-white/10">
                        <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">
                            {allResults.length} Finalists
                        </span>
                    </div>
                </div>

                {allResults.length === 0 ? (
                    <div className="p-10 border-2 border-dashed border-white/10 rounded-[3rem] text-center bg-white/5">
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Awaiting Initial Votes</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {allResults.slice(0, 5).map((artist, index) => {
                            const maxVotes = allResults[0]?.voteCount || 1;
                            const percentage = maxVotes > 0 ? (artist.voteCount / maxVotes) * 100 : 0;
                            const isFirst = index === 0 && artist.voteCount > 0;

                            return (
                                <motion.div
                                    key={artist.id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="group relative"
                                >
                                    <div className="flex items-center gap-5 relative z-10 p-5 bg-white shadow-2xl rounded-3xl border border-slate-100 hover:scale-[1.02] transition-transform">
                                        <div className="w-12 h-12 flex items-center justify-center shrink-0">
                                            {isFirst ? (
                                                <div className="relative">
                                                    <Crown className="w-10 h-10 text-amber-500 fill-amber-100" />
                                                    <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-amber-800 pt-1">1</span>
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                                                    <span className="text-sm font-black text-slate-400">#{index + 1}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative shrink-0">
                                            <img
                                                src={artist.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop`}
                                                alt={artist.name}
                                                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white shadow-lg shadow-black/10"
                                            />
                                            {isFirst && (
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="absolute -top-2 -right-2"
                                                >
                                                    <Sparkles className="w-5 h-5 text-amber-500 drop-shadow-lg" />
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-slate-900 truncate text-lg mb-1 uppercase tracking-tighter leading-none">{artist.name}</p>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-3.5 h-3.5 text-red-600" />
                                                <p className="text-[11px] text-slate-500 truncate font-black uppercase tracking-widest">{artist.region || 'Great Rift'} &bull; {artist.song_title || 'Top Track'}</p>
                                            </div>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <div className="flex items-end gap-1">
                                                <span className={`text-3xl font-black leading-none ${isFirst ? 'text-amber-500' : 'text-red-600'}`}>{artist.voteCount?.toLocaleString() || 0}</span>
                                            </div>
                                            <span className="text-[10px] text-slate-400 block uppercase font-black tracking-widest mt-1">Votes</span>
                                        </div>
                                    </div>

                                    {/* Visual progress meter */}
                                    <div className="absolute bottom-0 left-[84px] right-24 h-1.5 bg-slate-100 rounded-full overflow-hidden z-20 mx-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${percentage}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className={`h-full bg-gradient-to-r ${themeGradient}`}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    const allDefinedCategories = Object.values(GROUPS).flatMap(g => g.categories);
    const uncategorizedResults = Object.keys(results || {}).filter(cat => !allDefinedCategories.includes(cat));

    return (
        <section id="results" className="py-32 bg-[#0a0a0b] overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] translate-y-1/2" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-600/10 border border-red-500/20 mb-8"
                    >
                        <TrendingUp className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-black text-red-500 uppercase tracking-[0.3em]">Live Feed Active</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 italic"
                    >
                        Rift <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-500 to-red-600">Leaderboard</span>
                    </motion.h2>
                    <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-sm md:text-base">Real-time voting data broadcast</p>
                </div>

                <Podium topArtists={topOverall} />

                <div className="space-y-32 mt-32">
                    {Object.entries(GROUPS).map(([key, group]) => (
                        <div key={key}>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 px-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-10"
                                >
                                    <div className={`w-28 h-28 rounded-[3rem] bg-gradient-to-br ${group.gradient} p-0.5 shadow-2xl relative overflow-hidden group`}>
                                        <div className="w-full h-full bg-slate-900 rounded-[2.9rem] flex items-center justify-center">
                                            <group.icon className={`w-14 h-14 text-white group-hover:scale-110 transition-transform duration-500`} />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">{group.title}</h2>
                                        <div className="flex items-center gap-4">
                                            <div className="h-0.5 flex-1 bg-gradient-to-r from-red-600 to-transparent min-w-[100px]" />
                                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600 font-black text-2xl md:text-3xl tracking-tight leading-none pt-1">Prize Pool: {group.prizes}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {group.categories.map(cat => (
                                    <motion.div
                                        key={cat}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Card className="border-0 bg-[#121214] rounded-[3.5rem] overflow-hidden border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                                            <div className={`h-2 w-full bg-gradient-to-r ${group.gradient}`} />
                                            <CardContent className="p-10">
                                                {renderCategoryResults(cat, group.gradient)}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {uncategorizedResults.length > 0 && (
                        <div className="mt-32 pt-32 border-t border-white/5">
                            <div className="flex items-center gap-6 mb-16 opacity-30 justify-center">
                                <div className="p-8 rounded-[2.5rem] bg-white/5 flex items-center justify-center">
                                    <TrendingUp className="w-12 h-12 text-white" />
                                </div>
                                <div className="text-center md:text-left">
                                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Archived Records</h2>
                                    <p className="text-slate-500 text-xs tracking-[0.5em] uppercase font-black mt-3">Legacy Node Identification</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 opacity-50">
                                {uncategorizedResults.map(cat => (
                                    <Card key={cat} className="border-0 bg-white/10 rounded-[3rem] overflow-hidden border border-white/5">
                                        <CardContent className="p-12">
                                            {renderCategoryResults(cat, "from-slate-400 to-slate-600")}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-40 text-center pb-32">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link to={createPageUrl('Results')}>
                            <Button className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-800 text-white px-20 py-12 rounded-[2.5rem] font-black uppercase text-3xl transition-all shadow-3xl shadow-red-900/40 border-b-8 border-red-900 group">
                                <span className="mr-6">Audit Full Feed</span>
                                <ArrowRight className="w-10 h-10 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                    <p className="mt-12 text-slate-600 font-black uppercase tracking-[0.6em] text-xs">Official Certified Voting Records</p>
                </div>
            </div>
        </section>
    );
}
