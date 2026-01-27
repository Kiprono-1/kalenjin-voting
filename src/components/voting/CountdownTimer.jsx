import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Lock, PlayCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CountdownTimer({
    startDate = "2026-01-23T10:00:00+03:00",
    endDate = "2026-01-24T10:00:00+03:00"
}) {
    const [phase, setPhase] = useState('BEFORE_START'); // BEFORE_START, DURING_VOTING, ENDED
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const start = new Date(startDate);
            const end = new Date(endDate);

            let targetDate;
            let currentPhase;

            if (now < start) {
                targetDate = start;
                currentPhase = 'BEFORE_START';
            } else if (now < end) {
                targetDate = end;
                currentPhase = 'DURING_VOTING';
            } else {
                targetDate = null;
                currentPhase = 'ENDED';
            }

            setPhase(currentPhase);

            if (targetDate) {
                const difference = targetDate - now;
                if (difference > 0) {
                    setTimeLeft({
                        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                        minutes: Math.floor((difference / 1000 / 60) % 60),
                        seconds: Math.floor((difference / 1000) % 60)
                    });
                } else {
                    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                }
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [startDate, endDate]);

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds }
    ];

    const getPhaseConfig = () => {
        switch (phase) {
            case 'BEFORE_START':
                return {
                    label: "Voting Starts In",
                    icon: Lock,
                    color: "bg-red-100 text-red-700",
                    gradient: "from-red-500 to-red-600",
                    subtext: `Starts: ${new Date(startDate).toLocaleString()}`
                };
            case 'DURING_VOTING':
                return {
                    label: "Voting is LIVE! Ends In",
                    icon: PlayCircle,
                    color: "bg-green-100 text-green-700",
                    gradient: "from-green-500 to-green-600",
                    subtext: `Ends: ${new Date(endDate).toLocaleString()}`
                };
            case 'ENDED':
                return {
                    label: "Voting has Ended",
                    icon: CheckCircle,
                    color: "bg-slate-100 text-slate-700",
                    gradient: "from-slate-500 to-slate-600",
                    subtext: "Thank you for participating!"
                };
            default:
                return {};
        }
    };

    const config = getPhaseConfig();

    return (
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-6">
            <div className="text-center mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3 ${config.color}`}>
                    <config.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{config.label}</span>
                </div>
                {phase !== 'ENDED' && (
                    <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{config.subtext}</span>
                    </div>
                )}
                {phase === 'ENDED' && (
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{config.subtext}</h3>
                )}
            </div>

            <div className="grid grid-cols-4 gap-3">
                {timeUnits.map(({ label, value }, index) => (
                    <motion.div
                        key={label}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                    >
                        <div className={`bg-gradient-to-br ${config.gradient} text-white rounded-xl p-4 mb-2 shadow-lg`}>
                            <span className="text-3xl font-bold block">{value.toString().padStart(2, '0')}</span>
                        </div>
                        <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">{label}</span>
                    </motion.div>
                ))}
            </div>
        </Card>
    );
}
