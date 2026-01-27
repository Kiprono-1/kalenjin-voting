import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Star, Sparkles, Heart, Users, Music, Award } from 'lucide-react';

const categories = [
    { id: 'all', label: 'All', icon: Star },
    // Group 1
    { id: 'Best Overall Artiste – Secular', label: 'Overall Secular', icon: Trophy },
    { id: 'Best Overall Artiste – Gospel', label: 'Overall Gospel', icon: Trophy },
    // Group 2
    { id: 'Best Male Secular', label: 'Male Secular', icon: Star },
    { id: 'Best Female Secular', label: 'Female Secular', icon: Star },
    { id: 'Best Female Gospel', label: 'Female Gospel', icon: Star },
    { id: 'Best Male Gospel', label: 'Male Gospel', icon: Star },
    // Group 3
    { id: 'Best Male Upcoming Gospel Artiste (North Rift)', label: 'M-Upc Gospel (N)', icon: Music },
    { id: 'Best Male Upcoming Gospel Artiste (South Rift)', label: 'M-Upc Gospel (S)', icon: Music },
    { id: 'Best Female Upcoming Gospel Artiste (North Rift)', label: 'F-Upc Gospel (N)', icon: Music },
    { id: 'Best Female Upcoming Gospel Artiste (South Rift)', label: 'F-Upc Gospel (S)', icon: Music },
    { id: 'Best Male Upcoming Secular Artiste (North Rift)', label: 'M-Upc Secular (N)', icon: Music },
    { id: 'Best Male Upcoming Secular Artiste (South Rift)', label: 'M-Upc Secular (S)', icon: Music },
    { id: 'Best Female Upcoming Secular Artiste (North Rift)', label: 'F-Upc Secular (N)', icon: Music },
    { id: 'Best Female Upcoming Secular Artiste (South Rift)', label: 'F-Upc Secular (S)', icon: Music },
    { id: 'Diaspora Artiste of the Year', label: 'Diaspora', icon: Users },
    { id: 'Ceremonial Artiste of the Year', label: 'Ceremonial', icon: Award },
];

export default function CategoryTabs({ activeCategory, onCategoryChange }) {
    return (
        <div className="w-full overflow-x-auto pb-2">
            <Tabs value={activeCategory} onValueChange={onCategoryChange}>
                <TabsList className="bg-slate-100 p-1.5 h-auto flex-nowrap justify-start overflow-x-auto no-scrollbar rounded-xl">
                    {categories.map(({ id, label, icon: Icon }) => (
                        <TabsTrigger
                            key={id}
                            value={id}
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white px-4 py-2 rounded-lg transition-all"
                        >
                            <Icon className="w-4 h-4 mr-2 shrink-0" />
                            <span className="whitespace-nowrap">{label}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
}
