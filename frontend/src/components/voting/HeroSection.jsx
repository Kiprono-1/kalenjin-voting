import React from 'react';
import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';

export default function HeroSection({ title, subtitle, children, backgroundImage }) {
    const defaultBg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv49ACLGJCpzQz9Ymws5mPoulJS0NGYvRRqA&s";

    return (
        <section className="relative py-20 md:py-32 flex items-center justify-start overflow-hidden bg-slate-950 min-h-[500px]">
            {/* Background Image with optimized overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                    style={{
                        backgroundImage: `url(${backgroundImage || defaultBg})`,
                    }}
                />
                {/* Reference-accurate overlay: darker at the bottom and left */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full text-left">
                <div className="max-w-4xl">
                    {/* Reference Badge: Red with Music Icon */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600 text-white text-[10px] font-black uppercase tracking-wider mb-8 shadow-lg"
                    >
                        <Music2 className="w-3 h-3 fill-white" />
                        ANNUAL AWARDS 2025
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-[1.1] mb-6"
                    >
                        {title}
                    </motion.h1>

                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-sm md:text-base text-slate-300 font-medium mb-10 max-w-2xl leading-relaxed"
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="flex flex-wrap justify-start gap-4"
                    >
                        {children}
                    </motion.div>
                </div>
            </div>

            {/* Bottom transition line to white content */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-20" />
        </section>
    );
}
