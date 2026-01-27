import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    HandHelping,
    Music,
    Users,
    Globe,
    Mic2,
    Calendar,
    Mail,
    Facebook,
    Instagram,
    MessageCircle,
    Quote,
    Target,
    BookOpen,
    Archive
} from 'lucide-react';
import HeroSection from '@/components/voting/HeroSection';

export default function Foundation() {
    return (
        <div className="min-h-full bg-slate-50">
            <HeroSection
                title={
                    <>
                        Our <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                            Vision & Mission
                        </span>
                    </>
                }
                subtitle="Kalenjin Music Foundation - Preserving Culture, Empowering Artists, and Building a Musical Legacy."
            >
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
                        <Heart className="w-8 h-8 text-red-400" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white leading-none">Global</span>
                            <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Impact</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
                        <Users className="w-8 h-8 text-amber-400" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white leading-none">Empowering</span>
                            <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Artists</span>
                        </div>
                    </div>
                </div>
            </HeroSection>

            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* About Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">About Kalenjin Music Foundation</h2>
                        <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                            <p>
                                The <strong>Kalenjin Music Foundation (KMF)</strong> was established by <strong>Hon. Ngong Ngeno</strong> with a vision to preserve, promote, and elevate the rich musical heritage of the Kalenjin community.
                            </p>
                            <p>
                                Our foundation serves as the backbone of the Kalenjin Music Festival & Awards, working tirelessly to discover, nurture, and support emerging artists while celebrating established talents across all Kalenjin sub-tribes.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop"
                                alt="KMF Vision"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Mission Section */}
                <div className="mb-24 bg-white rounded-[3rem] p-12 md:p-16 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-10 justify-center">
                        <Target className="w-8 h-8 text-red-600" />
                        <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { text: "Preserve and document Kalenjin musical traditions for future generations", icon: <Archive className="w-5 h-5" /> },
                            { text: "Provide platforms for artists to showcase their talents", icon: <Mic2 className="w-5 h-5" /> },
                            { text: "Foster unity among all Kalenjin sub-tribes through music", icon: <Users className="w-5 h-5" /> },
                            { text: "Support artists with training, mentorship, and resources", icon: <HandHelping className="w-5 h-5" /> },
                            { text: "Bridge traditional and contemporary Kalenjin music", icon: <Music className="w-5 h-5" /> }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 items-start">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-red-600">
                                    {item.icon}
                                </div>
                                <span className="text-slate-700 font-medium leading-relaxed">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Founder's Vision */}
                <div className="mb-24 relative px-6 md:px-0">
                    <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 opacity-10">
                            <Quote className="w-64 h-64 -ml-16 -mt-16" />
                        </div>
                        <h2 className="text-2xl font-bold text-amber-400 mb-8 uppercase tracking-widest">Founder's Vision</h2>
                        <blockquote className="text-xl md:text-3xl font-light italic leading-relaxed mb-8 relative z-10">
                            "Music is the soul of our community. Through the Kalenjin Music Foundation, we aim to create a lasting legacy that celebrates our heritage while propelling our artists to national and international recognition."
                        </blockquote>
                        <cite className="not-italic block">
                            <span className="text-white font-bold text-lg">— Hon. Ngong Ngeno</span>
                        </cite>
                    </div>
                </div>

                {/* Programs Section */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Programs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Artist Development Program",
                                desc: "Mentorship, training, and resources for emerging Kalenjin artists to develop their craft and reach their full potential.",
                                icon: <Mic2 className="w-8 h-8 text-blue-500" />
                            },
                            {
                                title: "Cultural Preservation Initiative",
                                desc: "Documenting and archiving traditional Kalenjin music, ensuring our heritage is preserved for future generations.",
                                icon: <BookOpen className="w-8 h-8 text-green-500" />
                            },
                            {
                                title: "Annual Music Festival & Awards",
                                desc: "The flagship event celebrating excellence in Kalenjin music across secular and gospel genres.",
                                icon: <Trophy className="w-8 h-8 text-amber-500" />
                            },
                            {
                                title: "Community Outreach",
                                desc: "Bringing music education and opportunities to Kalenjin communities across all sub-tribes.",
                                icon: <Users className="w-8 h-8 text-indigo-500" />
                            }
                        ].map((program, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                                <div className="mb-6 p-4 bg-slate-50 rounded-2xl group-hover:bg-slate-100 transition-colors inline-block text-slate-900">
                                    {program.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{program.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{program.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-br from-red-600 to-orange-500 rounded-[3rem] p-12 md:p-20 text-center">
                    <h2 className="text-4xl font-extrabold text-white mb-6">Connect With Us</h2>
                    <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto font-light">
                        Follow our journey and stay updated on our upcoming initiatives.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <a href="https://wa.me/254718663469" className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-6 transition-all flex flex-col items-center gap-3">
                            <MessageCircle className="w-6 h-6 text-white" />
                            <span className="text-white font-medium">WhatsApp</span>
                        </a>
                        <a href="#" className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-6 transition-all flex flex-col items-center gap-3">
                            <Facebook className="w-6 h-6 text-white" />
                            <span className="text-white font-medium">Facebook</span>
                        </a>
                        <a href="#" className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-6 transition-all flex flex-col items-center gap-3">
                            <Instagram className="w-6 h-6 text-white" />
                            <span className="text-white font-medium">Instagram</span>
                        </a>
                        <a href="mailto:hello@kalenjinmusicfestival.org" className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-6 transition-all flex flex-col items-center gap-3">
                            <Mail className="w-6 h-6 text-white" />
                            <span className="text-white font-medium whitespace-nowrap text-xs">Email Us</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}

function Trophy({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
    )
}
