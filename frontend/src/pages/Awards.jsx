import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Music, Award, MapPin, Users, Sparkles } from 'lucide-react';
import HeroSection from '@/components/voting/HeroSection';

const AwardGroup = ({ group, title, prizes, categories, icon: Icon, colorClass, bgColor }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl p-6 md:p-8 border ${colorClass} ${bgColor} shadow-sm h-full`}
    >
        <div className="flex items-center gap-4 mb-6">
            <div className={`p-4 rounded-2xl bg-white shadow-sm`}>
                <Icon className={`w-8 h-8 ${colorClass.split(' ')[0].replace('border-', 'text-')}`} />
            </div>
            <div>
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{title}</h3>
                <p className="text-amber-500 font-bold text-sm">Prizes: {prizes}</p>
            </div>
        </div>

        <ul className="space-y-4">
            {categories.map((cat, i) => (
                <li key={i} className="flex items-start gap-3">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <span className="text-slate-700 font-medium leading-tight">{cat}</span>
                </li>
            ))}
        </ul>
    </motion.div>
);

export default function Awards() {
    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <HeroSection
                title={
                    <>
                        Competition <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-600">
                            Category Groups
                        </span>
                    </>
                }
                subtitle="Explore the different groups and prizes for the Annual Kalenjin Music Awards 2025."
            >
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-black/60 border border-white/10 hover:bg-black/80 transition-all">
                        <Music className="w-8 h-8 text-amber-400" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white leading-none">16</span>
                            <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Categories</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-black/60 border border-white/10 hover:bg-black/80 transition-all">
                        <Trophy className="w-8 h-8 text-red-500" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white leading-none">3</span>
                            <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Tier Groups</span>
                        </div>
                    </div>
                </div>
            </HeroSection>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Group 1 */}
                    <AwardGroup
                        title="Group 1"
                        prizes="Ksh 1M, 500K, 300K"
                        icon={Trophy}
                        colorClass="border-amber-200"
                        bgColor="bg-amber-50/30"
                        categories={[
                            "Best Overall Artiste – Secular",
                            "Best Overall Artiste – Gospel"
                        ]}
                    />

                    {/* Group 2 */}
                    <AwardGroup
                        title="Group 2"
                        prizes="Ksh 500K, 300K, 200K"
                        icon={Star}
                        colorClass="border-red-200"
                        bgColor="bg-red-50/30"
                        categories={[
                            "Best Male Secular",
                            "Best Female Secular",
                            "Best Female Gospel",
                            "Best Male Gospel"
                        ]}
                    />

                    {/* Group 3 */}
                    <AwardGroup
                        title="Group 3"
                        prizes="Ksh 300K, 200K, 100K"
                        icon={Music}
                        colorClass="border-orange-200"
                        bgColor="bg-orange-50/30"
                        categories={[
                            "Best Male Upcoming Gospel Artiste (North Rift)",
                            "Best Male Upcoming Gospel Artiste (South Rift)",
                            "Best Female Upcoming Gospel Artiste (North Rift)",
                            "Best Female Upcoming Gospel Artiste (South Rift)",
                            "Best Male Upcoming Secular Artiste (North Rift)",
                            "Best Male Upcoming Secular Artiste (South Rift)",
                            "Best Female Upcoming Secular Artiste (North Rift)",
                            "Best Female Upcoming Secular Artiste (South Rift)",
                            "Diaspora Artiste of the Year",
                            "Ceremonial Artiste of the Year"
                        ]}
                    />
                </div>

                {/* Info Footer */}
                <div className="mt-16 text-center max-w-2xl mx-auto">
                    <p className="text-slate-500 text-sm italic">
                        * Prizes are awarded to the top three winners in each group as specified above.
                        Winners are determined by a combination of public voting and judge panel assessment.
                    </p>
                </div>
            </div>
        </div>
    );
}
