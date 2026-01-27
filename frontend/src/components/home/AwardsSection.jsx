import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Music, Award, ArrowRight, TrendingUp } from 'lucide-react';

const AwardGroup = ({ title, prizes, categories, icon: Icon, colorClass, bgColor, gradient }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={`rounded-[4rem] p-10 md:p-14 border ${colorClass} ${bgColor} shadow-[0_20px_50px_rgba(0,0,0,0.05)] h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 group relative overflow-hidden`}
    >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000`} />

        <div className="flex items-center gap-8 mb-12">
            <div className={`p-6 rounded-[2.5rem] bg-white shadow-2xl group-hover:rotate-12 transition-transform duration-500 border border-slate-50`}>
                <Icon className={`w-12 h-12 ${colorClass.split(' ')[0].replace('border-', 'text-')}`} />
            </div>
            <div>
                <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tighter leading-none mb-3 italic">{title}</h3>
                <div className="flex items-center gap-3">
                    <span className={`bg-gradient-to-r ${gradient} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg`}>Reward Tier</span>
                    <p className="text-red-600 font-extrabold text-xl tracking-tighter">{prizes}</p>
                </div>
            </div>
        </div>

        <ul className="grid grid-cols-1 gap-5">
            {categories.map((cat, i) => (
                <motion.li
                    key={i}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center gap-5 p-5 bg-white rounded-[2rem] border border-white hover:border-red-100 hover:bg-white transition-all shadow-sm"
                >
                    <div className={`shrink-0 w-3 h-3 rounded-full bg-gradient-to-r ${gradient} shadow-lg`} />
                    <span className="text-slate-800 font-black uppercase text-[11px] tracking-wider leading-tight">{cat}</span>
                </motion.li>
            ))}
        </ul>
    </motion.div>
);

export default function AwardsSection() {
    return (
        <section id="awards" className="py-32 bg-slate-50 overflow-hidden relative">
            {/* Visual Flair */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-red-100 blur-[120px] -z-0" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 blur-[150px] -z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-28">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-200/50 border border-slate-200 mb-8"
                    >
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-black text-slate-500 uppercase tracking-[0.5em] pt-0.5">Champions Row</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter mb-6 italic"
                    >
                        Prestige <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">Categories</span>
                    </motion.h2>
                    <p className="text-slate-400 font-black uppercase tracking-[0.6em] text-xs md:text-sm">16 Specialized Merit Groups & Reward Tiers</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Group 1 */}
                    <AwardGroup
                        title="Group 01"
                        prizes="Ksh 1M &bull; 500K &bull; 300K"
                        icon={Trophy}
                        colorClass="border-amber-100"
                        bgColor="bg-amber-50/30"
                        gradient="from-amber-400 to-amber-600"
                        categories={[
                            "Best Overall Artiste – Secular",
                            "Best Overall Artiste – Gospel"
                        ]}
                    />

                    {/* Group 2 */}
                    <AwardGroup
                        title="Group 02"
                        prizes="Ksh 500K &bull; 300K &bull; 200K"
                        icon={Star}
                        colorClass="border-red-100"
                        bgColor="bg-red-50/30"
                        gradient="from-red-600 to-red-400"
                        categories={[
                            "Best Male Secular",
                            "Best Female Secular",
                            "Best Female Gospel",
                            "Best Male Gospel"
                        ]}
                    />

                    {/* Group 3 */}
                    <AwardGroup
                        title="Group 03"
                        prizes="Ksh 300K &bull; 200K &bull; 100K"
                        icon={Music}
                        colorClass="border-orange-100"
                        bgColor="bg-orange-50/30"
                        gradient="from-orange-500 to-orange-400"
                        categories={[
                            "Upcoming Gospel (North & South)",
                            "Upcoming Secular (North & South)",
                            "Diaspora Artiste of the Year",
                            "Ceremonial Artiste of the Year"
                        ]}
                    />
                </div>

                {/* Protocol Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-28 p-1 md:p-1.5 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 rounded-[4.5rem] shadow-3xl"
                >
                    <div className="bg-white rounded-[4.4rem] p-10 md:p-20 flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        <div className="relative group">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-6 bg-gradient-to-tr from-red-500/20 via-amber-200/20 to-orange-500/20 rounded-full blur-2xl"
                            />
                            <div className="relative bg-slate-900 p-10 rounded-[3rem] shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                <Award className="w-16 h-16 text-amber-400" />
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-6 italic leading-none">The Merit Protocol</h4>
                            <p className="text-slate-500 text-xl font-light leading-relaxed italic max-w-3xl">
                                Success is calculated through a hybrid architecture: 60% weight distributed through audit-verified public votes, and 40% through a professional adjudication jury evaluating heritage, rhythm, and lyrical excellence.
                            </p>
                            <div className="mt-10 flex items-center justify-center md:justify-start gap-3">
                                <div className="h-0.5 w-12 bg-red-600" />
                                <span className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Certified KMFA Standards</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
