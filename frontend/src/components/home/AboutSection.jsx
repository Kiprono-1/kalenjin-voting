import React from 'react';
import { motion } from 'framer-motion';
import { Music, Heart, Quote, Calendar, MapPin, User, Trophy, Clock, CircleDot, Star, Users, ArrowRight } from 'lucide-react';

export default function AboutSection() {
    return (
        <section id="about" className="py-32 bg-white overflow-hidden relative">
            {/* Subtle background flair */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-amber-100/20 to-transparent blur-3xl -z-0" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-red-100/20 to-transparent blur-3xl -z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6"
                    >
                        Our Legacy & Identity
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic"
                    >
                        Foundation <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">History</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: "120px" }}
                        viewport={{ once: true }}
                        className="h-2 bg-gradient-to-r from-red-600 to-amber-500 mx-auto rounded-full"
                    />
                </div>

                {/* Key Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                    {[
                        { label: 'Festival Date', value: 'Dec 13, 2026', icon: <Calendar className="w-6 h-6 text-red-600" />, color: "from-red-50 to-white" },
                        { label: 'Event Venue', value: 'Eldoret Sports Club', icon: <MapPin className="w-6 h-6 text-red-600" />, color: "from-slate-50 to-white" },
                        { label: 'Lead Patron', value: 'Hon. Ngong Ngeno', icon: <User className="w-6 h-6 text-amber-600" />, color: "from-amber-50 to-white" },
                        { label: 'Annual Edition', value: '4th Edition', icon: <Trophy className="w-6 h-6 text-amber-600" />, color: "from-orange-50 to-white" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-gradient-to-br ${item.color} p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-500`}
                        >
                            <div className="mb-4 p-4 bg-white rounded-3xl shadow-md border border-slate-50">{item.icon}</div>
                            <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">{item.label}</div>
                            <div className="font-black text-slate-900 uppercase tracking-tight text-lg">{item.value}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-24">
                        {/* What is KMFA */}
                        <motion.section
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-4xl font-black text-slate-900 mb-10 flex items-center gap-4 uppercase tracking-tighter italic">
                                <div className="p-3 bg-amber-500 rounded-2xl shadow-lg shadow-amber-200">
                                    <Music className="w-8 h-8 text-white" />
                                </div>
                                What is KMFA?
                            </h3>
                            <div className="bg-gradient-to-br from-slate-50 to-white p-10 md:p-16 rounded-[4rem] border border-slate-100 leading-relaxed text-slate-600 text-xl space-y-6 shadow-2xl shadow-slate-200/50">
                                <p className="first-letter:text-6xl first-letter:font-black first-letter:text-red-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                                    The <strong>Kalenjin Music Festival & Awards (KMFA)</strong> is a prestige annual event that celebrates and promotes the melodic heart of Kalenjin culture. It serves as a transformative platform for artists to showcase their heritage through performance and ritual.
                                </p>
                                <p className="font-medium">
                                    The 2026 festival is poised to be our most ambitious yet, converging on <strong>December 13</strong> at the historic <strong>Eldoret Sports Club</strong> for a day of rhythm and recognition.
                                </p>
                            </div>
                        </motion.section>

                        {/* Legacy */}
                        <motion.section
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-4xl font-black text-slate-900 mb-10 flex items-center gap-4 uppercase tracking-tighter italic">
                                <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-200">
                                    <Heart className="w-8 h-8 text-white" />
                                </div>
                                A Legacy Architecture
                            </h3>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-xl font-light">
                                <p className="mb-8">
                                    Founded with the vision of <strong>Hon. Ngong Ngeno Ole Kisiara</strong>, the Kapkatet Kalenjin Music Festival has evolved into a societal pillar of the Rift. From the legendary overflows at Kapkatet Stadium to our new global stage, our trajectory has always been upward.
                                </p>
                                <motion.div
                                    whileInView={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="bg-gradient-to-r from-slate-900 to-slate-800 p-12 rounded-[3.5rem] my-12 relative overflow-hidden shadow-2xl"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                                    <Quote className="w-12 h-12 text-amber-500 mb-6 opacity-80" />
                                    <p className="font-extrabold text-amber-400 text-2xl md:text-3xl italic tracking-tight leading-tight mb-4 relative z-10">
                                        "With Ksh 35 million seeded back into the community, we aren't just making music—we are building an economy of talent."
                                    </p>
                                    <cite className="text-slate-400 font-black uppercase text-xs tracking-widest block relative z-10">— Hon. Ngong Ngeno, Leader & Visionary</cite>
                                </motion.div>
                                <p>
                                    Hon. Ngong's noble initiative has illuminated the path for many leaders, demonstrating the categorical imperative of empowering the common mwananchi through cultural capital.
                                </p>
                            </div>
                        </motion.section>
                    </div>

                    {/* Sidebar Column */}
                    <aside className="space-y-12">
                        {/* Timeline Widget */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-[#0a0a0b] text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                            <h4 className="font-black text-xl mb-12 flex items-center gap-3 uppercase tracking-tighter">
                                <Clock className="w-6 h-6 text-red-500" />
                                Festival Roadmap
                            </h4>
                            <div className="space-y-12 relative">
                                <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-white/10" />

                                {[
                                    { label: 'Nominations', date: 'Oct 24 - Nov 4', icon: <span className="text-xs font-black">01</span>, status: 'Completed', color: 'bg-slate-800' },
                                    { label: 'Public Voting', date: 'Nov 11 - Dec 11', icon: <CircleDot className="w-5 h-5 animate-pulse" />, status: 'Live Now', active: true, color: 'bg-red-600 shadow-red-500/50 shadow-xl' },
                                    { label: 'Grand Finale', date: 'Dec 13, 2026', icon: <Trophy className="w-5 h-5" />, status: 'Coming Soon', color: 'bg-amber-500 shadow-amber-500/20 shadow-xl' },
                                ].map((step, i) => (
                                    <div key={i} className="relative flex gap-8 items-start">
                                        <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center shrink-0 z-10 border-4 border-[#0a0a0b] ${step.color} transition-all duration-500 group-hover:scale-110`}>
                                            {step.icon}
                                        </div>
                                        <div>
                                            <div className="font-black text-white text-base uppercase tracking-tight mb-1">{step.label}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{step.date}</div>
                                            {step.active && (
                                                <motion.div
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="mt-2 text-[10px] font-black text-white bg-red-600 px-3 py-1 rounded-full inline-block uppercase tracking-widest border border-red-500/50"
                                                >
                                                    Audit Active
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* What to Expect */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group border-b-8 border-red-900"
                        >
                            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                            <h4 className="font-black text-2xl mb-10 flex items-center gap-3 uppercase tracking-tighter italic">
                                <Star className="w-8 h-8 text-amber-200 drop-shadow-lg" />
                                The Vibe
                            </h4>
                            <ul className="space-y-8">
                                {[
                                    { text: "Main Stage Performances", icon: <Music className="w-5 h-5" /> },
                                    { text: "Cultural Dialogue", icon: <Users className="w-5 h-5" /> },
                                    { text: "State Recognition", icon: <Trophy className="w-5 h-5" /> },
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-5 items-center group/item">
                                        <div className="bg-white/20 p-3 rounded-2xl group-hover/item:bg-white group-hover/item:text-red-600 transition-colors duration-300">
                                            {item.icon}
                                        </div>
                                        <span className="text-sm font-black uppercase tracking-widest opacity-90">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
