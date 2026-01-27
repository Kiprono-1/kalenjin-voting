import React from 'react';
import { motion } from 'framer-motion';
import { Scale, CheckSquare, AlertCircle, Info } from 'lucide-react';
import HeroSection from '@/components/voting/HeroSection';

export default function Terms() {
    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <HeroSection
                title={<>Terms of <span className="text-red-500 whitespace-nowrap italic">Service</span></>}
                subtitle="The rules and guidelines for participating in the Kalenjin Music Festival."
            >
                <div className="px-6 py-4 rounded-2xl bg-black/60 border border-white/10 flex items-center gap-3">
                    <Scale className="w-6 h-6 text-red-500" />
                    <span className="text-white font-bold">Fair Competition Policy</span>
                </div>
            </HeroSection>

            <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-slate-100"
                >
                    <div className="prose prose-slate max-w-none">
                        <section className="mb-12">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3 mb-6">
                                <CheckSquare className="w-6 h-6 text-amber-500" />
                                Voting Eligibility
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Participation is open to everyone. However, to maintain the integrity of the awards, each user is restricted to one vote per category. Attempts to manipulate the system using multiple accounts or automated tools will result in vote disqualification.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3 mb-6">
                                <AlertCircle className="w-6 h-6 text-amber-500" />
                                Artist Participation
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Nominated artists must adhere to community standards. The foundation reserves the right to disqualify any participant who engages in fraudulent activities or brings the festival into disrepute.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3 mb-6">
                                <Info className="w-6 h-6 text-amber-500" />
                                Result Finality
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                While public voting significantly influences the outcome, the final decision is made based on a verified audit of votes and, where applicable, judge evaluations. Results announced during the official ceremony are final.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
