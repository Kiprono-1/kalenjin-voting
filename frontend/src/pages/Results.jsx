import React, { useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import {
  Trophy, Medal, Award, Loader2, Crown, Star, Music, Users,
  TrendingUp, MapPin, Sparkles, ChevronRight, Music2, Cross, Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/voting/HeroSection';

const GROUPS = {
  GROUP1: {
    title: "Overall Categories",
    prizes: "Ksh 1M, 500K, 300K",
    icon: Trophy,
    theme: "amber",
    gradient: "from-amber-400 via-amber-300 to-amber-600",
    categories: [
      'Best Overall Artiste – Secular',
      'Best Overall Artiste – Gospel'
    ]
  },
  GROUP2: {
    title: "Major Categories",
    prizes: "Ksh 500K, 300K, 200K",
    icon: Star,
    theme: "red",
    gradient: "from-red-600 via-red-500 to-red-700",
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
    icon: Sparkles,
    theme: "orange",
    gradient: "from-orange-500 via-orange-400 to-orange-600",
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

const GENRE_STYLES = {
  Gospel: {
    icon: Cross,
    bg: "bg-cyan-50/50",
    text: "text-cyan-700",
    border: "border-cyan-100",
    accent: "from-cyan-500 to-blue-600",
    tag: "GOSPEL"
  },
  Secular: {
    icon: Music2,
    bg: "bg-rose-50/50",
    text: "text-rose-700",
    border: "border-rose-100",
    accent: "from-rose-500 to-red-600",
    tag: "SECULAR"
  }
};

const Podium = ({ topArtists }) => {
  if (!topArtists || topArtists.length < 1) return null;

  const positions = [
    { rank: 2, artist: topArtists[1], h: "h-32 md:h-48", color: "from-slate-200 to-slate-400", glow: "shadow-slate-400/20", icon: Medal },
    { rank: 1, artist: topArtists[0], h: "h-44 md:h-64", color: "from-amber-300 via-amber-400 to-amber-600", glow: "shadow-amber-500/40", icon: Trophy },
    { rank: 3, artist: topArtists[2], h: "h-24 md:h-36", color: "from-amber-600 to-amber-800", glow: "shadow-amber-700/20", icon: Award },
  ];

  return (
    <div className="flex items-end justify-center gap-2 md:gap-8 mb-24 px-4 max-w-4xl mx-auto pt-10">
      {positions.map((pos, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
          className="flex flex-col items-center flex-1 max-w-[220px]"
        >
          {pos.artist && (
            <div className="mb-6 text-center group">
              <div className="relative inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className={`absolute -inset-3 rounded-full bg-gradient-to-r ${pos.color} opacity-20 blur-lg group-hover:opacity-40 transition-opacity`}
                />
                <img
                  src={pos.artist.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop`}
                  alt={pos.artist.name}
                  className={`relative w-16 h-16 md:w-32 md:h-32 rounded-full object-cover ring-4 ${pos.rank === 1 ? 'ring-amber-400' : 'ring-white'} shadow-2xl transition-transform group-hover:scale-105`}
                />
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${pos.color} flex items-center justify-center border-4 border-white shadow-lg`}>
                  <pos.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              <p className="mt-4 font-black text-slate-900 text-[10px] md:text-sm uppercase tracking-tighter truncate w-full px-2">
                {pos.artist.name}
              </p>
              <p className={`font-black text-sm md:text-xl bg-clip-text text-transparent bg-gradient-to-r ${pos.color}`}>
                {pos.artist.voteCount.toLocaleString()} <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Votes</span>
              </p>
            </div>
          )}
          <div className={`${pos.h} w-full bg-gradient-to-br ${pos.color} rounded-t-3xl shadow-2xl ${pos.glow} relative flex items-center justify-center overflow-hidden border-t border-white/40`}>
            <div className="absolute inset-0 bg-white/20" />
            <span className="text-4xl md:text-8xl font-black text-white/30 italic relative z-10">{pos.rank}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function Results() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: artists = [], isLoading: artistsLoading } = useQuery({
    queryKey: ['artists', 'approved'],
    queryFn: () => base44.entities.Artist.list('approved'),
    staleTime: 60000,
  });

  const { data: resultsData = {}, isLoading: resultsLoading } = useQuery({
    queryKey: ['results'],
    queryFn: () => base44.entities.Vote.getStats(),
    refetchInterval: 15000, // Faster polling on Results page
    staleTime: 5000,
  });

  const isLoading = artistsLoading || resultsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-red-600" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-4 bg-red-600/10 rounded-full blur-xl"
          />
        </div>
        <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs">Syncing Rift Data...</p>
      </div>
    );
  }

  const topOverall = useMemo(() => {
    const allVotesMap = {};
    if (resultsData && typeof resultsData === 'object') {
      Object.values(resultsData).forEach(catResults => {
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
  }, [artists, resultsData]);

  const renderCategoryResults = (catName) => {
    const genre = catName.toLowerCase().includes('gospel') ? 'Gospel' : 'Secular';
    const style = GENRE_STYLES[genre];

    const catResults = (resultsData && resultsData[catName]) || [];
    const allResults = artists
      .filter(a => a && a.category === catName)
      .filter(a => !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(a => {
        const result = Array.isArray(catResults) ? catResults.find(r => r && r.artistId === a.id) : null;
        return { ...a, voteCount: result ? result.voteCount : 0 };
      })
      .sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0));

    const maxVotes = allResults[0]?.voteCount || 1;

    return (
      <motion.div
        key={catName}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 last:mb-0"
      >
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl ${style.bg} ${style.text} border ${style.border}`}>
              <style.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-800 uppercase tracking-tighter leading-none">{catName}</h4>
              <span className={`text-[9px] font-black tracking-widest ${style.text} uppercase`}>{style.tag} Division</span>
            </div>
          </div>
          <div className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
            <span className="text-[10px] font-black text-slate-400">{allResults.length} Finalists</span>
          </div>
        </div>

        {allResults.length === 0 ? (
          <div className="py-12 text-center rounded-[2rem] border-2 border-dashed border-slate-100 bg-slate-50/50">
            <Music className="w-8 h-8 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Awaiting Rift Audit</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allResults.slice(0, 5).map((artist, index) => {
              const percentage = (artist.voteCount / maxVotes) * 100;
              const isFirst = index === 0 && artist.voteCount > 0;

              return (
                <div key={artist.id} className="relative group">
                  <div className={`flex items-center justify-between p-4 bg-white rounded-2xl border ${isFirst ? 'border-amber-200 shadow-amber-100/50' : 'border-slate-100'} shadow-sm group-hover:shadow-md transition-all relative z-10`}>
                    <div className="flex items-center gap-4">
                      <div className="w-6 flex items-center justify-center">
                        {isFirst ? (
                          <Crown className="w-5 h-5 text-amber-500" />
                        ) : (
                          <span className="text-[11px] font-black text-slate-300">#{index + 1}</span>
                        )}
                      </div>
                      <div className="relative">
                        <img src={artist.image_url} alt={artist.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                        {isFirst && <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center shadow-sm">
                          <TrendingUp className="w-2.5 h-2.5 text-white" />
                        </div>}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 leading-tight uppercase tracking-tighter">{artist.name}</span>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-2.5 h-2.5 text-slate-400" />
                          <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">{artist.region}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xl font-black ${isFirst ? 'text-amber-500' : style.text} leading-none`}>{artist.voteCount.toLocaleString()}</span>
                      <span className="block text-[8px] text-slate-400 font-black uppercase tracking-widest mt-1">Votes</span>
                    </div>
                  </div>

                  {/* Progress Meter Background */}
                  <div className="absolute inset-0 z-0 bg-slate-50 rounded-2xl overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${style.accent} opacity-20`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <HeroSection
        title={
          <div className="flex flex-col">
            <span className="text-white drop-shadow-md">Rift Live</span>
            <span className="text-amber-500 drop-shadow-lg -mt-2">Leaderboard</span>
          </div>
        }
        subtitle="Tracking the cinematic rhythm of the rift. Real-time validated voting data."
      />

      {/* Sticky Search Bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="relative max-w-md mx-auto">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search artists..."
              className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-red-500 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 text-center -mt-16 bg-white rounded-[4rem] p-12 border border-slate-100 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-12">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            Top Overall Performers
          </div>
          <Podium topArtists={topOverall} />
        </div>

        <div className="space-y-40">
          {Object.entries(GROUPS).map(([key, group]) => (
            <div key={key}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 px-4">
                <div className="flex items-center gap-8">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${group.gradient} p-0.5 shadow-2xl relative group overflow-hidden`}>
                    <div className="w-full h-full bg-white rounded-[1.4rem] flex items-center justify-center">
                      <group.icon className={`w-10 h-10 bg-clip-text text-transparent bg-gradient-to-br ${group.gradient} group-hover:scale-110 transition-transform`} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-3 italic">{group.title}</h2>
                    <div className="flex items-center gap-3">
                      <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${group.gradient}`} />
                      <p className="text-slate-500 font-black text-xs uppercase tracking-widest">Prize Pool: <span className="text-slate-900">{group.prizes}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
                {group.categories.map(cat => (
                  <Card key={cat} className="border-none shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] bg-white rounded-[3.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    <div className={`h-2.5 w-full bg-gradient-to-r ${group.gradient} opacity-80`} />
                    <CardContent className="p-10 md:p-14">
                      {renderCategoryResults(cat)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 text-center">
          <Link to="/">
            <Button className="h-20 px-16 rounded-3xl bg-slate-900 hover:bg-black text-white font-black text-xl uppercase tracking-widest shadow-2xl transition-all hover:-translate-y-1 group">
              <ChevronRight className="w-6 h-6 mr-4 rotate-180 group-hover:-translate-x-2 transition-transform" />
              Orbit Home Base
            </Button>
          </Link>
          <div className="mt-12 flex flex-col items-center gap-2">
            <p className="text-slate-400 font-black uppercase tracking-[0.6em] text-[10px]">Official Certified Feed</p>
            <div className="h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                animate={{ x: [-100, 100] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="h-full w-12 bg-red-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
