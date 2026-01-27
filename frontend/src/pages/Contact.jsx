import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    MessageSquare,
    Phone,
    MapPin,
    Send,
    Clock,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import HeroSection from '@/components/voting/HeroSection';

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Proactively saving to a new 'contacts' table in Supabase
            // This assumes the table exists (I will provide the SQL in the next step)
            const { error } = await base44.supabase
                .from('contacts')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject,
                        message: formData.message
                    }
                ]);

            if (error) throw error;

            toast.success('Message sent! We will get back to you soon.');
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Contact Error:', error);
            toast.error('Failed to send message. Please try again or use direct email.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6 text-red-500" />,
            title: "Email Support",
            details: "info@kalenjinmusic.com",
            subDetails: "Online Support 24/7",
            bg: "bg-red-50"
        },
        {
            icon: <Phone className="w-6 h-6 text-amber-500" />,
            title: "Call Us",
            details: "+254 700 000 000",
            subDetails: "Mon-Fri, 8am-5pm",
            bg: "bg-amber-50"
        },
        {
            icon: <MapPin className="w-6 h-6 text-red-600" />,
            title: "Main Office",
            details: "Eldoret, Kenya",
            subDetails: "Kapkatet Plaza, 4th Floor",
            bg: "bg-red-50"
        }
    ];

    return (
        <div className="min-h-full bg-slate-50">
            <HeroSection
                title={
                    <>
                        Get in <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                            Touch With Us
                        </span>
                    </>
                }
                subtitle="Have questions about the awards or foundation? Our team is here to help you."
            />

            <div className="max-w-7xl mx-auto px-6 py-12 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        {contactInfo.map((info, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden group">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className={`p-3 rounded-2xl ${info.bg} group-hover:scale-110 transition-transform`}>
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">{info.title}</h3>
                                            <p className="text-slate-700 font-medium">{info.details}</p>
                                            <p className="text-xs text-slate-500 mt-1">{info.subDetails}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}

                        {/* Event Hours */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl"
                        >
                            <div className="absolute top-0 right-0 opacity-10">
                                <Clock className="w-32 h-32 -mr-8 -mt-8" />
                            </div>
                            <h4 className="text-amber-400 font-bold mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Support Hours
                            </h4>
                            <div className="space-y-3 relative z-10">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Monday - Friday</span>
                                    <span>8:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Saturday</span>
                                    <span>9:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Sunday</span>
                                    <span className="text-red-400 font-medium">Closed</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
                                <CardContent className="p-8 md:p-12">
                                    {submitted ? (
                                        <div className="text-center py-12 space-y-6">
                                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-500 mb-4">
                                                <CheckCircle2 className="w-10 h-10" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-slate-900">Message Received!</h2>
                                            <p className="text-slate-600 max-w-md mx-auto">
                                                Thank you for reaching out. A member of the Kalenjin Music Foundation team will review your message and respond within 24-48 hours.
                                            </p>
                                            <Button
                                                onClick={() => setSubmitted(false)}
                                                className="bg-slate-900 hover:bg-slate-800 text-white px-8"
                                            >
                                                Send Another Message
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mb-10">
                                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Send us a message</h2>
                                                <p className="text-slate-500">Fields marked with * are required to help us serve you better.</p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700 ml-1">Full Name *</label>
                                                        <Input
                                                            name="name"
                                                            placeholder="John Doe"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            required
                                                            className="bg-slate-50 border-none h-12 rounded-xl focus-visible:ring-amber-500 transition-all font-medium"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address *</label>
                                                        <Input
                                                            name="email"
                                                            type="email"
                                                            placeholder="john@example.com"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                            className="bg-slate-50 border-none h-12 rounded-xl focus-visible:ring-amber-500 transition-all font-medium"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700 ml-1">Subject *</label>
                                                    <Input
                                                        name="subject"
                                                        placeholder="How can we help?"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-slate-50 border-none h-12 rounded-xl focus-visible:ring-amber-500 transition-all font-medium"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700 ml-1">Message *</label>
                                                    <Textarea
                                                        name="message"
                                                        placeholder="Write your message here..."
                                                        rows={6}
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-slate-50 border-none rounded-2xl focus-visible:ring-amber-500 transition-all font-medium resize-none text-base"
                                                    />
                                                </div>

                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full h-14 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group"
                                                >
                                                    {isSubmitting ? (
                                                        <Loader2 className="w-6 h-6 animate-spin" />
                                                    ) : (
                                                        <>
                                                            SEND MESSAGE
                                                            <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        </>
                                                    )}
                                                </Button>
                                            </form>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Live Map or Direct links Section */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="bg-white rounded-[2rem] p-1 shadow-sm border border-slate-100 overflow-hidden h-[400px] relative">
                    <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center text-slate-400 font-medium">
                        {/* Interactive map placeholder */}
                        Interactive Map of Eldoret Region Coming Soon
                    </div>
                    {/* Embedding an actual iframe map for that premium feel */}
                    <iframe
                        title="location"
                        className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15953.284381862143!2d35.2694184!3d0.5142774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178101ae020084f9%3A0x633d76e3305a396e!2sEldoret!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
