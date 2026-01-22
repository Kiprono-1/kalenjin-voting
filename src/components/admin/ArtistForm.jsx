import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { artistBaseSchema } from '@/lib/schemas';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Upload, Loader2 } from 'lucide-react';

export default function ArtistForm({ artist, categories = [], onSave, onCancel, isLoading }) {
    const [formData, setFormData] = useState(artist || {
        name: '',
        real_name: '',
        song_title: '',
        bio: '',
        category: categories[0]?.value || '',
        region: '',
        image_url: '',
        gender: 'Male'
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(artist?.image_url || null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB restriction
                toast.error('Image size must be less than 2MB');
                e.target.value = ''; // Reset input
                setSelectedFile(null);
                setPreviewUrl(artist?.image_url || null);
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Zod Validation
        const validation = artistBaseSchema.safeParse(formData);
        if (!validation.success) {
            toast.error(validation.error.errors[0].message);
            return;
        }


        let finalImageUrl = formData.image_url;

        if (selectedFile) {
            setIsUploading(true);
            const uploadToastId = toast.loading('Uploading artist image...');
            try {
                finalImageUrl = await base44.entities.Storage.uploadArtistImage(selectedFile);
                toast.success('Image uploaded successfully', { id: uploadToastId });
            } catch (err) {
                toast.error('Failed to upload image: ' + err.message, { id: uploadToastId });
                setIsUploading(false);
                return;
            }
        }

        onSave({ ...formData, image_url: finalImageUrl });
        setIsUploading(false);
    };

    return (
        <Card className="border-2">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{artist ? 'Edit Artist' : 'Add New Artist'}</span>
                    <Button variant="ghost" size="icon" onClick={onCancel}>
                        <X className="w-4 h-4" />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Stage Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="real_name">Real Name</Label>
                            <Input
                                id="real_name"
                                value={formData.real_name}
                                onChange={(e) => setFormData({ ...formData, real_name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="song_title">Song Title</Label>
                            <Input
                                id="song_title"
                                value={formData.song_title}
                                onChange={(e) => setFormData({ ...formData, song_title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="region">Region/County</Label>
                            <Input
                                id="region"
                                value={formData.region}
                                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender *</Label>
                            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                                <SelectTrigger>
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
                        <Label className="text-slate-700 font-bold">Profile Image</Label>
                        <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all group">
                            {previewUrl ? (
                                <div className="relative">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-32 h-32 rounded-2xl object-cover shadow-md ring-4 ring-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setPreviewUrl(artist?.image_url || null);
                                            if (!artist?.image_url) {
                                                setFormData({ ...formData, image_url: '' });
                                            }
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-slate-400 py-2">
                                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <Upload className="w-6 h-6 text-slate-300" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-slate-600">Click below to upload</p>
                                    </div>
                                </div>
                            )}
                            <input
                                id="admin_artist_image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="rounded-lg font-medium border-slate-200"
                                    onClick={() => document.getElementById('admin_artist_image').click()}
                                >
                                    {previewUrl ? 'Change Image' : 'Select Image'}
                                </Button>
                                {formData.image_url && !selectedFile && (
                                    <Input
                                        value={formData.image_url}
                                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                        placeholder="Or enter URL directly"
                                        className="h-9 text-xs"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading || isUploading} className="bg-red-600 hover:bg-red-700 min-w-[120px]">
                            {isUploading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : null}
                            {artist ? 'Update' : 'Create'} Artist
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
