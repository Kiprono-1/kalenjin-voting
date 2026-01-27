import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';
import HeroSection from '@/components/voting/HeroSection';

export default function Privacy() {
    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <HeroSection
                title={<>Privacy <span className="text-amber-500 whitespace-nowrap italic">Policy</span></>}
                subtitle="How we protect your data and respect your privacy at Kalenjin Music Festival."
            >
                <div className="px-6 py-4 rounded-2xl bg-black/60 border border-white/10 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-amber-400" />
                    <span className="text-white font-bold">Secure Voting Platform</span>
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
                                <Eye className="w-6 h-6 text-red-600" />
                                Data Collection
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                We collect minimal information required to ensure fair voting: your email address, name (if provided via social login), and basic device information to prevent duplicate votes.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3 mb-6">
                                <Lock className="w-6 h-6 text-red-600" />
                                Data Usage
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Your data is strictly used for authentication and vote verification. We do not sell your personal information to third parties. We may use your email to send important updates regarding the festival results.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3 mb-6">
                                <FileText className="w-6 h-6 text-red-600" />
                                Security Measures
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                We utilize industry-standard encryption and secure database systems (Supabase) to protect your information. Access to voter data is restricted to core administrative personnel only for audit purposes.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
