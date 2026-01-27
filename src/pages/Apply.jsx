import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { applicationSchema } from '@/lib/schemas';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from 'sonner';
import { Music4, Star, MapPin, User, Upload, CheckCircle2, Loader2 } from 'lucide-react';
import HeroSection from '@/components/voting/HeroSection';

const regions = [
    "Bomet", "Kericho", "Nandi", "Uasin Gishu", "Elgeyo Marakwet", "Trans Nzoia", "Baringo", "Nakuru", "Laikipia", "Narok", "Diaspora"
];

export default function Apply() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        real_name: '',
        song_title: '',
        category: '',
        region: '',
        image_url: '',
        gender: '',
        email: '',
        phone: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        base44.entities.Category.list()
            .then(data => setCategories(data.map(c => c.name)))
            .catch(err => console.error("Failed to fetch categories", err));
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB restriction
                toast.error('Image size must be less than 2MB');
                e.target.value = ''; // Reset input
                setSelectedFile(null);
                setPreviewUrl(null);
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Zod Validation
        const validation = applicationSchema.safeParse(formData);
        if (!validation.success) {
            // Show the first error message
            toast.error(validation.error.errors[0].message);
            return;
        }


        if (!selectedFile) {
            toast.error('Please upload a profile image');
            return;
        }

        setLoading(true);
        try {
            // 1. Upload Image First
            toast.loading('Uploading image...', { id: 'upload' });
            const publicUrl = await base44.entities.Storage.uploadArtistImage(selectedFile);
            toast.success('Image uploaded!', { id: 'upload' });

            // 2. Create Artist with the new URL
            await base44.entities.Artist.create({
                ...formData,
                image_url: publicUrl
            });

            setSubmitted(true);
            toast.success('Application submitted successfully!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to submit application: ' + (err.message || 'Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-full bg-slate-50 flex items-center justify-center py-20 px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Application Received!</h2>
                    <p className="text-slate-500 leading-relaxed">
                        Thank you for applying for the Annual Kalenjin Music Awards 2025. Our review panel will evaluate your submission.
                    </p>
                    <Button
                        variant="outline"
                        className="w-full py-6 rounded-2xl font-bold"
                        onClick={() => setSubmitted(false)}
                    >
                        Submit Another Application
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <HeroSection
                title={
                    <>
                        Artist <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                            Competition Entry
                        </span>
                    </>
                }
                subtitle="Apply now to be part of the most prestigious Kalenjin music competition."
            >
                <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                    <Star className="w-8 h-8 text-amber-400" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white leading-none">Registration</span>
                        <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Open Now</span>
                    </div>
                </div>
            </HeroSection>

            <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-10 md:-mt-20 relative z-20">
                <Card className="border-0 shadow-2xl rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white/80 backdrop-blur-xl">
                    <CardHeader className="p-6 md:p-10 pb-2 bg-gradient-to-br from-slate-50 to-white">
                        <CardTitle className="text-2xl md:text-3xl font-black text-slate-900">Competition Application</CardTitle>
                        <CardDescription className="text-base md:text-lg">Please fill out all the details correctly to ensure your nomination is valid.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 md:p-10 pt-6">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-slate-700 font-bold ml-1">Stage Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your artist name"
                                        className="h-14 rounded-2xl border-slate-200 focus:ring-red-500"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="real_name" className="text-slate-700 font-bold ml-1">Full Legal Name *</Label>
                                    <Input
                                        id="real_name"
                                        placeholder="Enter your real name"
                                        className="h-14 rounded-2xl border-slate-200"
                                        value={formData.real_name}
                                        onChange={(e) => setFormData({ ...formData, real_name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="email" className="text-slate-700 font-bold ml-1">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="h-14 rounded-2xl border-slate-200"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="phone" className="text-slate-700 font-bold ml-1">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        placeholder="+254..."
                                        className="h-14 rounded-2xl border-slate-200"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="category" className="text-slate-700 font-bold ml-1">Competition Category *</Label>
                                    <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                                        <SelectTrigger className="h-14 rounded-2xl border-slate-200">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="region" className="text-slate-700 font-bold ml-1">Region/Location *</Label>
                                    <Select value={formData.region} onValueChange={(v) => setFormData({ ...formData, region: v })}>
                                        <SelectTrigger className="h-14 rounded-2xl border-slate-200">
                                            <SelectValue placeholder="Select your region" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {regions.map(r => (
                                                <SelectItem key={r} value={r}>{r}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="song_title" className="text-slate-700 font-bold ml-1">Main Song Title *</Label>
                                    <Input
                                        id="song_title"
                                        placeholder="Enter song for nomination"
                                        className="h-14 rounded-2xl border-slate-200"
                                        value={formData.song_title}
                                        onChange={(e) => setFormData({ ...formData, song_title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="gender" className="text-slate-700 font-bold ml-1">Gender *</Label>
                                    <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                                        <SelectTrigger className="h-14 rounded-2xl border-slate-200">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-slate-700 font-bold ml-1">Profile Image *</Label>
                                <div className="flex flex-col items-center gap-6 p-8 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 hover:bg-slate-50 transition-all group">
                                    {previewUrl ? (
                                        <div className="relative">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-40 h-40 rounded-3xl object-cover shadow-lg ring-4 ring-white"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedFile(null);
                                                    setPreviewUrl(null);
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors"
                                            >
                                                <Upload className="w-4 h-4 rotate-180" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-4 text-slate-400 py-4">
                                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Upload className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-slate-600">Choose a photo</p>
                                                <p className="text-xs uppercase tracking-widest font-black mt-1">JPG, PNG up to 2MB</p>
                                            </div>
                                        </div>
                                    )}
                                    <Input
                                        id="artist_image"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        required={!previewUrl}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-xl font-bold border-slate-200"
                                        onClick={() => document.getElementById('artist_image').click()}
                                    >
                                        Select Image File
                                    </Button>
                                </div>
                            </div>



                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-16 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-xl shadow-lg shadow-red-200 transition-all active:scale-95"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : <Upload className="w-6 h-6 mr-2" />}
                                SUBMIT NOMINATION
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
