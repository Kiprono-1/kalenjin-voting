import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Mic2, Users, Music, Quote, MessageCircle, Facebook, Instagram, Mail, Archive, BookOpen, Trophy, HandHelping, Globe, Sparkles } from 'lucide-react';

export default function FoundationSection() {
    return (
        <section id="foundation" className="py-32 bg-white overflow-hidden relative">
            {/* Geometric Background Flair */}
            <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[150px] -translate-x-1/2 -z-0" />
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] translate-x-1/2 -z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-orange-100/50 border border-orange-200 mb-8"
                    >
                        <Globe className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-black text-orange-600 uppercase tracking-[0.4em] pt-0.5">Global Foundation Hub</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic"
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Vision</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: "150px" }}
                        viewport={{ once: true }}
                        className="h-2 bg-gradient-to-r from-orange-600 to-red-600 mx-auto rounded-full"
                    />
                </div>

                {/* About Foundation Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 uppercase tracking-tighter leading-none italic">
                            Elevating the <br />
                            <span className="text-orange-500">Rift's Soul.</span>
                        </h3>
                        <div className="space-y-8 text-slate-600 text-xl leading-relaxed font-light">
                            <p>
                                The <strong>Kalenjin Music Foundation (KMF)</strong>, an institutional masterpiece established by <strong>Hon. Ngong Ngeno</strong>, operates as a non-profit beacon dedicated to the preservation and acceleration of Kalenjin melodic heritage.
                            </p>
                            <p className="bg-slate-50 p-8 rounded-[2.5rem] border-l-8 border-orange-500 italic">
                                Our foundation serves as the structural backbone of the festival, industrializing artist development and digitizing our cultural narratives for the global stage.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-[3.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                        <div className="aspect-square md:aspect-video rounded-[3rem] overflow-hidden shadow-3xl relative z-10 border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&h=700&fit=crop"
                                alt="KMF Vision"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-transparent" />
                            <div className="absolute bottom-10 left-10 text-white">
                                <span className="text-xs font-black uppercase tracking-[0.4em] opacity-80 mb-2 block">Heritage First</span>
                                <h4 className="text-3xl font-black uppercase italic tracking-tighter">Honoring the Ancestors</h4>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mission Section */}
                <div className="mb-40 bg-[#0a0a0b] text-white rounded-[5rem] p-12 md:p-32 border border-white/5 relative overflow-hidden shadow-3xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full -mr-64 -mt-64 blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full -ml-32 -mb-32 blur-[100px]" />

                    <div className="flex flex-col items-center gap-6 mb-24 text-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="p-1 rounded-full bg-gradient-to-tr from-red-600 to-orange-500"
                        >
                            <div className="bg-slate-900 p-6 rounded-full">
                                <Target className="w-12 h-12 text-white" />
                            </div>
                        </motion.div>
                        <h3 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic">Strategic Mission</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.5em] text-xs">A 5-Point Plan for Cultural Dominance</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { text: "Archive every rhythmic tradition from the 10 sub-tribes.", icon: <Archive className="w-6 h-6" />, color: "from-red-600 to-red-400" },
                            { text: "Construct massive-scale platforms for sonic visibility.", icon: <Mic2 className="w-6 h-6" />, color: "from-orange-600 to-orange-400" },
                            { text: "Engineer social cohesion through melodic diplomacy.", icon: <Users className="w-6 h-6" />, color: "from-amber-600 to-amber-400" },
                            { text: "Deploy mentorship capital to emerging vocal titans.", icon: <HandHelping className="w-6 h-6" />, color: "from-red-500 to-orange-500" },
                            { text: "Syncretize traditional instruments with global beats.", icon: <Music className="w-6 h-6" />, color: "from-orange-500 to-amber-500" },
                            { text: "Champion copyrights & digital royalty integrity.", icon: <Sparkles className="w-6 h-6" />, color: "from-red-600 to-amber-600" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col gap-8 p-10 bg-white/5 rounded-[3rem] items-start border border-white/10 hover:bg-white/10 transition-all duration-500 group"
                            >
                                <div className={`p-4 bg-gradient-to-br ${item.color} rounded-2xl text-white shadow-xl group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <span className="text-white font-black uppercase text-sm tracking-tight leading-relaxed opacity-80">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Programs Grid */}
                <div className="mb-40 px-4">
                    <div className="text-center mb-24">
                        <h3 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic leading-none">The Catalyst <span className="text-red-600">Programs</span></h3>
                        <div className="w-32 h-2 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { title: "Artist Dev", desc: "Hardening the skills of our future icons.", icon: <Mic2 className="w-10 h-10 text-blue-500" />, color: "blue" },
                            { title: "Preservation", desc: "Digital safekeeping of the Rift's timeline.", icon: <BookOpen className="w-10 h-10 text-green-500" />, color: "green" },
                            { title: "Festival Hub", desc: "Managing the logistics of cultural glory.", icon: <Trophy className="w-10 h-10 text-amber-500" />, color: "amber" },
                            { title: "Unity Outreach", desc: "Melodic diplomacy for community health.", icon: <Users className="w-10 h-10 text-indigo-500" />, color: "indigo" }
                        ].map((prog, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 rounded-[3.5rem] border border-slate-100 text-center shadow-[0_30px_60px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                            >
                                <div className="mb-8 p-6 bg-slate-50 rounded-3xl shadow-inner inline-block relative overflow-hidden group-hover:scale-110 transition-transform">
                                    <div className="relative z-10">{prog.icon}</div>
                                    <div className={`absolute inset-0 bg-${prog.color}-500 opacity-0 group-hover:opacity-10 transition-opacity`} />
                                </div>
                                <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">{prog.title}</h4>
                                <p className="text-slate-500 text-xs font-black leading-relaxed uppercase tracking-widest leading-loose">{prog.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Founders Vision */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-40 bg-gradient-to-br from-slate-900 to-black text-white rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden shadow-3xl border-b-8 border-orange-600"
                >
                    <div className="absolute top-0 left-0 opacity-10">
                        <Quote className="w-96 h-96 -ml-32 -mt-32" />
                    </div>
                    <motion.h4
                        whileInView={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-orange-500 font-black tracking-[0.6em] uppercase text-xs mb-16 relative z-10"
                    >
                        THE PATRON'S DIRECTIVE
                    </motion.h4>
                    <blockquote className="text-3xl md:text-6xl font-black italic leading-[1.1] mb-16 relative z-10 tracking-tighter">
                        "Music is the <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">Pulse</span> of our identity. We build this foundation to ensure that pulse vibrates eternally."
                    </blockquote>
                    <cite className="not-italic block relative z-10">
                        <div className="flex flex-col items-center">
                            <div className="h-0.5 w-24 bg-orange-600 mb-6" />
                            <span className="text-white font-black text-2xl md:text-3xl uppercase tracking-tighter italic">— Hon. Ngong Ngeno</span>
                        </div>
                    </cite>
                </motion.div>

                {/* Interaction CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-red-600 to-orange-600 rounded-[5rem] p-12 md:p-32 text-center shadow-3xl relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <h3 className="text-5xl md:text-8xl font-black text-white mb-10 relative z-10 uppercase tracking-tighter italic">Join the <span className="text-black/30">Movement</span></h3>
                    <p className="text-white text-xl md:text-2xl mb-24 max-w-3xl mx-auto font-black uppercase tracking-widest leading-relaxed relative z-10 opacity-90">
                        Secure your place in the Rift's melodic evolution.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto relative z-10">
                        {[
                            { name: 'WhatsApp', icon: <MessageCircle className="w-8 h-8" />, href: 'https://wa.me/254718663469', color: "bg-green-500" },
                            { name: 'Facebook', icon: <Facebook className="w-8 h-8" />, href: '#', color: "bg-blue-600" },
                            { name: 'Instagram', icon: <Instagram className="w-8 h-8" />, href: '#', color: "bg-pink-600" },
                            { name: 'Direct Mail', icon: <Mail className="w-8 h-8" />, href: 'mailto:hello@kalenjinmusicfestival.org', color: "bg-slate-900" },
                        ].map((link, i) => (
                            <motion.a
                                key={i}
                                href={link.href}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-white/10 rounded-[2.5rem] p-10 transition-all flex flex-col items-center gap-6 border border-white/20 hover:bg-white hover:border-white group/btn"
                            >
                                <div className={`p-4 rounded-2xl ${link.color} text-white shadow-2xl group-hover/btn:scale-110 transition-transform`}>{link.icon}</div>
                                <span className="text-white group-hover/btn:text-slate-900 font-black uppercase text-[10px] tracking-[0.3em] leading-none transition-colors">{link.name}</span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
