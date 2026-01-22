import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Award, Loader2, Crown, Music4, Star, Music, Users, ArrowRight, TrendingUp, Sparkles, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/voting/HeroSection';

const GROUPS = {
  GROUP1: {
    title: "Overall Categories",
    prizes: "Ksh 1M, 500K, 300K",
    icon: trophyIcon,
    theme: "amber",
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

function trophyIcon(props) { return <Trophy {...props} /> }
function starIcon(props) { return <Star {...props} /> }
function musicIcon(props) { return <Music {...props} /> }

const Podium = ({ topArtists }) => {
  if (!topArtists || topArtists.length < 1) return null;

  const positions = [
    { rank: 2, artist: topArtists[1], h: "h-32", color: "bg-slate-300", icon: Medal },
    { rank: 1, artist: topArtists[0], h: "h-48", color: "bg-amber-400", icon: Trophy },
    { rank: 3, artist: topArtists[2], h: "h-24", color: "bg-amber-700", icon: Award },
  ];

  return (
    <div className="flex items-end justify-center gap-1 md:gap-8 mb-20 px-2 md:px-4">
      {positions.map((pos, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2, duration: 0.8 }}
          className="flex flex-col items-center flex-1 max-w-[200px]"
        >
          {pos.artist && (
            <div className="mb-4 text-center">
              <div className="relative">
                <img
                  src={pos.artist.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop`}
                  alt={pos.artist.name}
                  className={`w-16 h-16 md:w-24 md:h-24 rounded-full object-cover ring-4 ${pos.rank === 1 ? 'ring-amber-400 scale-110 shadow-2xl shadow-amber-400/20' : 'ring-white shadow-lg'}`}
                />
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full ${pos.color} flex items-center justify-center border-2 border-white shadow-sm`}>
                  <pos.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="mt-4 font-black text-slate-900 truncate w-full px-2 text-sm md:text-base leading-tight">
                {pos.artist.name}
              </p>
              <p className="text-red-600 font-black text-xs md:text-sm">
                {pos.artist.voteCount} <span className="text-[10px] font-bold text-slate-400 uppercase">votes</span>
              </p>
            </div>
          )}
          <div className={`${pos.h} w-full ${pos.color} rounded-t-2xl shadow-inner relative flex items-center justify-center overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <span className="text-4xl md:text-6xl font-black text-white/30 relative z-10">{pos.rank}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function Results() {
  const { data: artists = [], isLoading: artistsLoading, isError: artistsError, error: artistsQueryError } = useQuery({
    queryKey: ['artists', 'approved'],
    queryFn: () => base44.entities.Artist.list('approved'),
  });

  const { data: resultsData = {}, isLoading: resultsLoading, isError: resultsError, error: resultsQueryError } = useQuery({
    queryKey: ['results'],
    queryFn: () => base44.entities.Vote.getStats(),
  });

  const isLoading = artistsLoading || resultsLoading;
  const hasError = artistsError || resultsError;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
        <p className="text-slate-400 font-medium animate-pulse">Syncing Leaderboard Feed...</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <TrendingUp className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Connection Issue</h2>
        <p className="text-slate-500 mb-8 max-w-sm">We're having trouble reaching the live results feed. Please check your connection and try again.</p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-slate-900 text-white px-8 py-6 rounded-2xl font-bold"
        >
          Try Again
        </Button>
        <div className="mt-8 p-4 bg-slate-100 rounded-lg text-[10px] font-mono text-slate-400 max-w-lg overflow-auto">
          {artistsQueryError?.message || resultsQueryError?.message || 'Unknown data synchronization error'}
        </div>
      </div>
    );
  }

  // Calculate Overall Top Artists for Podium
  const allVotesMap = {};
  Object.values(resultsData).forEach(catResults => {
    catResults.forEach(r => {
      allVotesMap[r.artistId] = (allVotesMap[r.artistId] || 0) + r.voteCount;
    });
  });

  const topOverall = Object.entries(allVotesMap)
    .map(([id, count]) => {
      const artist = artists.find(a => a.id === id);
      return { ...artist, voteCount: count };
    })
    .sort((a, b) => b.voteCount - a.voteCount)
    .slice(0, 3);

  const renderCategoryResults = (catName) => {
    const catResults = resultsData[catName] || [];
    const enrichedResults = catResults.map(r => {
      const artist = artists.find(a => a.id === r.artistId);
      return artist ? { ...r, ...artist } : { ...r, name: 'Unknown Artist' };
    }).sort((a, b) => b.voteCount - a.voteCount);

    const zeroVoteArtists = artists
      .filter(a => a.category === catName && !catResults.some(r => r.artistId === a.id))
      .map(a => ({ artistId: a.id, voteCount: 0, ...a }));

    const allResults = [...enrichedResults, ...zeroVoteArtists];

    return (
      <div key={catName} className="mb-10 last:mb-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-red-600 rounded-full" />
            <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight leading-none pt-1">
              {catName}
            </h4>
          </div>
          <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            {allResults.length} Nominees
          </span>
        </div>

        {allResults.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] text-center bg-slate-50/50">
            <p className="text-sm text-slate-400 font-medium">No candidates yet in this category</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allResults.slice(0, 5).map((artist, index) => {
              const maxVotes = allResults[0]?.voteCount || 1;
              const percentage = maxVotes > 0 ? (artist.voteCount / maxVotes) * 100 : 0;
              const isFirst = index === 0 && artist.voteCount > 0;

              return (
                <motion.div
                  key={artist.id || index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="flex items-center gap-4 relative z-10 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                      {isFirst ? (
                        <div className="relative">
                          <Crown className="w-8 h-8 text-amber-400 fill-amber-50" />
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-amber-700 pt-1">1</span>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                          <span className="text-xs font-black text-slate-400">#{index + 1}</span>
                        </div>
                      )}
                    </div>

                    <div className="relative shrink-0">
                      <img
                        src={artist.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop`}
                        alt={artist.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-sm"
                      />
                      {isFirst && (
                        <div className="absolute -top-1 -right-1">
                          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-800 truncate text-base mb-0.5 uppercase tracking-tighter">{artist.name}</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-red-500" />
                        <p className="text-[11px] text-slate-500 truncate font-bold uppercase tracking-wide">{artist.region || 'Great Rift'} &bull; {artist.song_title || 'Featured Artist'}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-black text-red-600 leading-none">{artist.voteCount || 0}</span>
                      </div>
                      <span className="text-[9px] text-slate-400 block uppercase font-black tracking-widest mt-1">Total Votes</span>
                    </div>
                  </div>

                  {/* Visual progress meter */}
                  <div className="absolute bottom-0 left-[68px] right-20 h-1 bg-slate-50 rounded-full overflow-hidden z-20">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${isFirst ? 'bg-amber-400' : 'bg-red-500'}`}
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
  const uncategorizedResults = Object.keys(resultsData).filter(cat => !allDefinedCategories.includes(cat));

  // Calculate Total Votes from Results
  const totalVotesCast = Object.values(resultsData).flat().reduce((acc, curr) => acc + (curr.voteCount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <HeroSection
        title={
          <>
            Real-time <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Leaderboard Feed
            </span>
          </>
        }
        subtitle="Tracking the rhythm of the rift. Live voting data across all 16 competition groups."
        backgroundImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv49ACLGJCpzQz9Ymws5mPoulJS0NGYvRRqA&s"
      >
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
            <Users className="w-8 h-8 text-amber-400" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white leading-none">{artists.length}</span>
              <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Artists</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
            <Award className="w-8 h-8 text-red-500" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white leading-none">{totalVotesCast.toLocaleString()}</span>
              <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Votes Cast</span>
            </div>
          </div>
        </div>
      </HeroSection>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20">

        {/* Hall of Fame / Podium Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-lg">
              Overall Leaders
            </h2>
            <p className="text-white/60 font-bold uppercase tracking-widest text-sm">Cross-Category Top Voted</p>
          </div>
          <Podium topArtists={topOverall} />
        </div>

        <div className="space-y-24">
          {Object.entries(GROUPS).map(([key, group]) => (
            <div key={key}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="flex items-center gap-6">
                  <div className={`w-20 h-20 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center border-4 border-slate-50 relative overflow-hidden group`}>
                    <div className={`absolute inset-0 bg-${group.theme}-500 opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <group.icon className={`w-10 h-10 text-slate-900 group-hover:scale-110 transition-transform`} />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-tight">{group.title}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest leading-none">Prizes</span>
                      <p className="text-red-600 font-black text-lg tracking-tight pt-1">{group.prizes}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {group.categories.map(cat => (
                  <Card key={cat} className="border-0 shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white/70 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/50">
                    <CardContent className="p-6 md:p-10">
                      {renderCategoryResults(cat)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {uncategorizedResults.length > 0 && (
            <div className="mt-20 pt-20 border-t border-slate-200">
              <div className="flex items-center gap-4 mb-12 opacity-40 grayscale">
                <div className="p-5 rounded-3xl bg-white shadow-xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-slate-900" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none">Archived Data</h2>
                  <p className="text-slate-400 text-[10px] tracking-[0.2em] uppercase font-black mt-1">Legacy Category Records</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 opacity-60">
                {uncategorizedResults.map(cat => (
                  <Card key={cat} className="border-0 shadow-md bg-white/50 backdrop-blur-sm rounded-[3rem] overflow-hidden grayscale">
                    <CardContent className="p-10">
                      {renderCategoryResults(cat)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Improved Action Call */}
        <div className="mt-32 text-center pb-20">
          <div className="inline-block p-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 rounded-[3rem] shadow-2xl">
            <Link to="/">
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-16 py-10 rounded-[2.8rem] font-black text-2xl shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-4">
                Cast Your Vote
                <ArrowRight className="w-8 h-8" />
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">Help your artist reach the podium</p>
        </div>
      </div>
    </div>
  );
}
