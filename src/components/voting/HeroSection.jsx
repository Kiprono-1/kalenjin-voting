import React from 'react';
import { motion } from 'framer-motion';
import { Music4, Award, Users, Calendar } from 'lucide-react';

export default function HeroSection({
    title = "Celebrate the Rhythm of Kalenjin",
    subtitle = "Your voice matters. Vote for the artists who define our culture.",
    backgroundImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv49ACLGJCpzQz9Ymws5mPoulJS0NGYvRRqA&s",
    children
}) {
    return (
        <div className="relative w-full h-[400px] md:h-[500px] bg-slate-900 overflow-hidden mb-8">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start pt-8 md:pt-16">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    {/* Badge - Optional or Dynamic could be added here, keeping fixed for now or remove if needed globally */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md border border-red-500/50 flex items-center gap-2">
                            <Music4 className="w-3 h-3 text-white" />
                            <span className="text-xs font-bold text-white tracking-wider uppercase">Annual Awards 2025</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        {title}
                    </h1>

                    <p className="text-slate-200 text-lg md:text-xl font-light max-w-xl mb-10 leading-relaxed drop-shadow-md">
                        {subtitle}
                    </p>

                    {children}
                </motion.div>
            </div>
        </div>
    );
}
