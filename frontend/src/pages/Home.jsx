import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Users, Award, TrendingUp } from 'lucide-react';
import { voteCache } from '@/lib/voteCache';

import HeroSection from '@/components/voting/HeroSection';
import CategoryTabs from '@/components/voting/CategoryTabs';
import ArtistCard from '@/components/voting/ArtistCard';
import LeaderboardCard from '@/components/voting/LeaderboardCard';
import CountdownTimer from '@/components/voting/CountdownTimer';
import LiveResultsPreview from '@/components/voting/LiveResultsPreview';
import UserNotRegisteredError from '@/components/voting/UserNotRegisteredError';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentUser, setCurrentUser] = useState(null);
  const [isUnregistered, setIsUnregistered] = useState(false);
  const [isVotingLive, setIsVotingLive] = useState(false);
  const [searchQuery, setSearchQuery] = useState(new URLSearchParams(window.location.search).get('search') || '');
  const queryClient = useQueryClient();

  const { data: votingConfig } = useQuery({
    queryKey: ['settings', 'voting_config'],
    queryFn: () => base44.entities.Settings.get('voting_config'),
  });

  const START_DATE = votingConfig?.startDate || "2026-01-23T08:00:00+03:00";
  const END_DATE = votingConfig?.endDate || "2026-02-15T23:59:59+03:00";

  useEffect(() => {
    base44.auth.me()
      .then(setCurrentUser)
      .catch((err) => {
        if (err.message === 'USER_NOT_REGISTERED') {
          setIsUnregistered(true);
        } else {
          setCurrentUser(null);
        }
      });

    const checkVotingStatus = () => {
      const now = new Date().getTime();
      const start = new Date(START_DATE).getTime();
      const end = new Date(END_DATE).getTime();
      setIsVotingLive(now >= start && now < end);
    };

    checkVotingStatus();
    const interval = setInterval(checkVotingStatus, 1000);

    const handleSearchUpdate = (e) => {
      setSearchQuery(e.detail);
    };

    window.addEventListener('searchUpdate', handleSearchUpdate);

    // Initial scroll to hash if exists
    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('searchUpdate', handleSearchUpdate);
    };
  }, [START_DATE, END_DATE]);

  const { data: artists = [], isLoading: artistsLoading } = useQuery({
    queryKey: ['artists', 'approved'],
    queryFn: () => base44.entities.Artist.list('approved'),
    staleTime: 60000,
  });

  // Fetch aggregated results for leaderboard and counts
  const { data: results = {}, isLoading: resultsLoading } = useQuery({
    queryKey: ['results'],
    queryFn: () => base44.entities.Vote.getStats(),
    refetchInterval: 30000, // Poll results every 30 seconds
    staleTime: 10000,
  });

  // Fetch current user's votes
  const { data: myVotes = [], isLoading: myVotesLoading } = useQuery({
    queryKey: ['myVotes', currentUser?.email],
    queryFn: async () => {
      if (!currentUser) return [];
      const serverVotes = await base44.entities.Vote.getMyVotes();
      // Sync server votes with local cache
      voteCache.sync(serverVotes);
      return serverVotes;
    },
    enabled: !!currentUser,
  });

  const voteMutation = useMutation({
    mutationFn: (voteData) => base44.entities.Vote.create(voteData),
    onMutate: async (voteData) => {
      // Optimistic update: Add to cache immediately
      voteCache.addVote(voteData.artist_id, voteData.category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['results'] });
      queryClient.invalidateQueries({ queryKey: ['myVotes'] });
      toast.success('Vote cast successfully!');
    },
    onError: (err, voteData) => {
      // Rollback: This would require more complex cache management
      toast.error(err.message || 'Failed to cast vote. Please try again.');
    },
  });

  const handleVote = async (artist) => {
    if (!currentUser) {
      base44.auth.redirectToLogin();
      return;
    }

    // Check if user already voted in this category
    // Base44 artists have 'category' field, myVotes returns {artist_id, category_id}
    const hasVotedInCat = myVotes.some(v => v.category_id === artist.category);

    if (hasVotedInCat) {
      toast.error('You have already voted in this category!');
      return;
    }

    voteMutation.mutate({
      artist_id: artist.id,
      category: artist.category
    });
  };

  const hasVotedForArtist = (artistId) => {
    if (!currentUser) return false;
    // Check cache first for instant feedback
    if (voteCache.hasVoted(artistId)) return true;
    // Fallback to server data
    return myVotes.some(v => v.artist_id === artistId);
  };

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

  const totalVotesCast = Object.values(results || {})
    .flat()
    .reduce((acc, curr) => acc + (curr?.voteCount || 0), 0);
  const isLoading = artistsLoading || resultsLoading || myVotesLoading;

  const CATEGORY_CONFIG = {
    'Best Overall Artiste – Secular': { icon: Award, color: 'text-amber-500' },
    'Best Overall Artiste – Gospel': { icon: Award, color: 'text-amber-500' },
    'Best Male Secular': { icon: Users, color: 'text-red-500' },
    'Best Female Secular': { icon: Users, color: 'text-red-500' },
    'Best Female Gospel': { icon: Users, color: 'text-red-500' },
    'Best Male Gospel': { icon: Users, color: 'text-red-500' },
    'Best Male Upcoming Gospel Artiste (North Rift)': { icon: Loader2, color: 'text-orange-500' },
    'Best Male Upcoming Gospel Artiste (South Rift)': { icon: Loader2, color: 'text-orange-500' },
    'Best Female Upcoming Gospel Artiste (North Rift)': { icon: Loader2, color: 'text-orange-500' },
    'Best Female Upcoming Gospel Artiste (South Rift)': { icon: Loader2, color: 'text-orange-500' },
    'Best Male Upcoming Secular Artiste (North Rift)': { icon: Loader2, color: 'text-orange-500' },
    'Best Male Upcoming Secular Artiste (South Rift)': { icon: Loader2, color: 'text-orange-500' },
    'Best Female Upcoming Secular Artiste (North Rift)': { icon: Loader2, color: 'text-orange-500' },
    'Best Female Upcoming Secular Artiste (South Rift)': { icon: Loader2, color: 'text-orange-500' },
    'Diaspora Artiste of the Year': { icon: Users, color: 'text-blue-500' },
    'Ceremonial Artiste of the Year': { icon: Award, color: 'text-purple-500' }
  };

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (artist.real_name && artist.real_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    artist.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoriesToRender = activeCategory === 'all'
    ? Object.keys(CATEGORY_CONFIG)
    : [activeCategory];

  if (isUnregistered) {
    return <UserNotRegisteredError />;
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-full">
      {/* Hero Section with Background */}
      <HeroSection
        title={
          <div className="flex flex-col">
            <span className="text-white drop-shadow-md">Celebrate the</span>
            <span className="text-amber-500 drop-shadow-lg -mt-2">Rhythm of Kalenjin</span>
          </div>
        }
        subtitle="Your voice matters. Vote for the artists who define our culture."
      >
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-black/80 border border-white/10 hover:bg-black transition-all min-w-[170px]">
            <div className="p-2 bg-amber-500/10 rounded-xl">
              <Users className="w-8 h-8 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white leading-none">{artists.length}</span>
              <span className="text-[10px] text-slate-300 uppercase tracking-[0.2em] font-black mt-1">Artists</span>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-black/80 border border-white/10 hover:bg-black transition-all min-w-[170px]">
            <div className="p-2 bg-red-600/10 rounded-xl">
              <Award className="w-8 h-8 text-red-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white leading-none">{totalVotesCast.toLocaleString()}</span>
              <span className="text-[10px] text-slate-300 uppercase tracking-[0.2em] font-black mt-1">Votes Cast</span>
            </div>
          </div>
        </div>
      </HeroSection>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Countdown and Live Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <CountdownTimer
            startDate={START_DATE}
            endDate={END_DATE}
          />
          <LiveResultsPreview artists={artists} results={results} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Cast Your Vote</h2>
                <Link to={createPageUrl('Results')}>
                  <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50 font-bold rounded-full px-4 border-2">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    LIVE STATS
                  </Button>
                </Link>
              </div>
              <CategoryTabs
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
              </div>
            ) : (
              <div className="space-y-16">
                {categoriesToRender.map((catName) => {
                  const catArtists = filteredArtists.filter(a => a.category === catName);
                  if (catArtists.length === 0) return null;

                  const Config = CATEGORY_CONFIG[catName] || { icon: Award, color: 'text-slate-400' };

                  return (
                    <div key={catName} className="relative">
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`p-3 rounded-2xl bg-white shadow-sm border border-slate-100 ${Config.color}`}>
                          <Config.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">{catName}</h3>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{catArtists.length} Nominees</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {catArtists.map((artist) => (
                          <ArtistCard
                            key={artist.id}
                            artist={artist}
                            onVote={handleVote}
                            hasVoted={hasVotedForArtist(artist.id)}
                            voteCount={getVoteCount(artist.id)}
                            isLoading={voteMutation.isPending}
                            isVotingLive={isVotingLive}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Catch-all for other categories if in 'all' view */}
                {activeCategory === 'all' && filteredArtists.some(a => !Object.keys(CATEGORY_CONFIG).includes(a.category)) && (
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-400">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">Other Participants</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Nominees in other groups</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredArtists.filter(a => !Object.keys(CATEGORY_CONFIG).includes(a.category)).map((artist) => (
                        <ArtistCard
                          key={artist.id}
                          artist={artist}
                          onVote={handleVote}
                          hasVoted={hasVotedForArtist(artist.id)}
                          voteCount={getVoteCount(artist.id)}
                          isLoading={voteMutation.isPending}
                          isVotingLive={isVotingLive}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {artists.length === 0 && (
                  <div className="text-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-slate-100">
                    <p className="text-slate-400 text-xl font-medium">Coming Soon: Nominees are currently being finalized.</p>
                  </div>
                )}

                {activeCategory !== 'all' && artists.filter(a => a.category === activeCategory).length === 0 && artists.length > 0 && (
                  <div className="text-center py-16 bg-white/50 rounded-[3rem] border border-dashed border-slate-200">
                    <p className="text-slate-400 text-lg font-medium">No artists currently listed in this specific category.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <LeaderboardCard
                artists={filteredArtists}
                results={results}
                title="Overall Top Rated"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
