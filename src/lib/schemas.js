import { z } from 'zod';

export const artistBaseSchema = z.object({
    name: z.string().min(2, "Stage name must be at least 1 character").max(50, "Stage name must be less than 50 characters"),
    real_name: z.string().max(50, "Real name must be less than 50 characters").optional().or(z.literal('')),
    song_title: z.string().max(100, "Song title must be less than 100 characters").optional().or(z.literal('')),
    bio: z.string().max(500, "Bio must be less than 500 characters").optional().or(z.literal('')),
    category: z.string().min(1, "Please select a category"),
    region: z.string().optional().or(z.literal('')),
    gender: z.enum(["Male", "Female"], { required_error: "Please select a gender" }),
    image_url: z.string().optional(),
});

export const applicationSchema = artistBaseSchema.extend({
    real_name: z.string().min(2, "Real name is required"),
    song_title: z.string().min(2, "Song title is required"),
    bio: z.string().min(10, "Bio should be at least 10 characters"),
    region: z.string().min(1, "Region is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^(\+254|0)[17]\d{8}$/, "Invalid Phone Number. Use format 07... or +2547..."),
});
