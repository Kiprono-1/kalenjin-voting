import React from 'react';
import { motion } from 'framer-motion';
import { Music, Heart, Star, Users, Calendar, MapPin, User, Trophy, Quote, Clock, CircleDot } from 'lucide-react';
import HeroSection from '@/components/voting/HeroSection';

export default function About() {
    return (
        <div className="min-h-full bg-slate-50">
            <HeroSection
                title={
                    <>
                        About <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                            Music Foundation
                        </span>
                    </>
                }
                subtitle="Celebrating the rich musical heritage of the Kalenjin people through recognition and empowerment."
            >
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
                        <Trophy className="w-8 h-8 text-amber-400" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white leading-none">4th</span>
                            <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Edition</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
                        <Calendar className="w-8 h-8 text-red-500" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white leading-none">Dec 13</span>
                            <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Event Date</span>
                        </div>
                    </div>
                </div>
            </HeroSection>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-6 py-12">

                {/* Key Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {[
                        { label: 'Date', value: 'Dec 13, 2026', icon: <Calendar className="w-5 h-5 text-red-500" /> },
                        { label: 'Venue', value: 'Eldoret Sports Club', icon: <MapPin className="w-5 h-5 text-red-500" /> },
                        { label: 'Sponsor', value: 'Hon. Ngong Ngeno', icon: <User className="w-5 h-5 text-red-500" /> },
                        { label: 'Edition', value: '4th Annual', icon: <Trophy className="w-5 h-5 text-red-500" /> },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                            <div className="mb-2 p-2 bg-red-50 rounded-full">{item.icon}</div>
                            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{item.label}</div>
                            <div className="font-semibold text-slate-900">{item.value}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* What is KMFA */}
                        <section>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                <Music className="w-8 h-8 text-amber-500" />
                                What is KMFA?
                            </h2>
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    The <strong>Kalenjin Music Festival & Awards (KMFA)</strong> is an annual event that celebrates and promotes Kalenjin music and culture. It serves as a platform for artists to showcase their talent through performances and to be recognized in various award categories.
                                </p>
                                <p className="text-slate-600 leading-relaxed text-lg mt-4">
                                    The 2026 festival will take place on <strong>December 13</strong> at the <strong>Eldoret Sports Club</strong> in Eldoret and will include performances and an awards ceremony.
                                </p>
                            </div>
                        </section>

                        {/* Legacy */}
                        <section>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                <Heart className="w-8 h-8 text-red-600" />
                                A Legacy in the Making
                            </h2>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                                <p className="mb-4">
                                    The Kapkatet Kalenjin Music Festival, sponsored by <strong>Hon. Ngong Ngeno Ole Kisiara</strong>, stands as one of the most successful and impactful events ever to take place in Kalenjin land. The Kapkatet Stadium was filled to capacity, as the community gathered to witness their favorite artists being recognized and rewarded.
                                </p>
                                <p className="mb-4">
                                    Hon. Ngong's noble initiative has illuminated the path for many leaders, demonstrating the importance of empowering, motivating, and encouraging the common mwananchi (citizen).
                                </p>
                                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
                                    <p className="font-medium text-amber-900 italic">
                                        "With Ksh 35 million now circulating within Kalenjin land, this achievement marks a significant milestone for the community."
                                    </p>
                                </div>
                                <p>
                                    Congratulations to Hon. Ngong for this visionary thought—your leadership is rare, compassionate, and deeply attuned to the needs of ordinary citizens.
                                </p>
                            </div>
                        </section>

                        {/* Message from Hon. Ngong */}
                        <section>
                            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 opacity-10">
                                    <Quote className="w-64 h-64 -mr-16 -mt-16" />
                                </div>
                                <h2 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3 relative z-10">
                                    Message from Hon. Ngong
                                </h2>
                                <div className="space-y-4 relative z-10 text-slate-200 leading-relaxed italic">
                                    <p>"The 4th edition of the Kalenjin Music Festival & Awards is finally here and the countdown has officially begun; time to celebrate every member of our vibrant creative industry."</p>
                                    <p>"Nominations will officially open this Friday, 24th October 2026 and run until 4th November 2025. This is your chance to support our artists who continue to shape and inspire our culture."</p>
                                    <p className="text-white font-semibold">"Tukutane 13th December 2026 pale Eldoret Sports Club! Utakosaje?"</p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">

                        {/* Timeline Widget */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-red-500" />
                                How It Works
                            </h3>
                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <span className="text-xs font-bold text-slate-500">1</span>
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-900 text-sm">Nominations</div>
                                        </div>
                                        <div className="text-xs text-slate-500">24 Oct - 4 Nov 2026</div>
                                    </div>
                                </div>
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-red-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <CircleDot className="w-4 h-4 text-red-600 animate-pulse" />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-red-100 bg-red-50/50 shadow-sm">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-red-700 text-sm">Public Voting</div>
                                        </div>
                                        <div className="text-xs text-red-600 font-medium">11 Nov - 11 Dec 2026</div>
                                    </div>
                                </div>
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <Trophy className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-900 text-sm">Awards Ceremony</div>
                                        </div>
                                        <div className="text-xs text-slate-500">13 Dec 2026</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What to Expect */}
                        <div className="bg-gradient-to-br from-red-600 to-amber-600 text-white p-6 rounded-2xl shadow-lg">
                            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                <Star className="w-5 h-5 text-amber-200" />
                                What to Expect
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <div className="bg-white/20 p-1.5 rounded-full h-fit mt-0.5">
                                        <Music className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-sm text-white/90 leading-tight">
                                        <strong>Musical Performances</strong> from established stars and upcoming talent.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="bg-white/20 p-1.5 rounded-full h-fit mt-0.5">
                                        <Users className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-sm text-white/90 leading-tight">
                                        <strong>Community Gathering</strong> to celebrate shared identity.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="bg-white/20 p-1.5 rounded-full h-fit mt-0.5">
                                        <Trophy className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-sm text-white/90 leading-tight">
                                        <strong>Opportunity</strong> for artists to gain exposure.
                                    </span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
