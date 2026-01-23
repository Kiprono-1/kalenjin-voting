import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import {
    Music4,
    Home,
    BarChart3,
    LogIn,
    LogOut,
    Menu,
    X,
    User,
    Mail
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        base44.auth.me().then(setCurrentUser).catch(() => setCurrentUser(null));
    }, []);

    const navItems = [
        { name: 'Home', label: 'HOME', path: 'Home' },
        { name: 'About', label: 'ABOUT KMF', path: 'About' },
        { name: 'Awards', label: 'AWARDS', path: 'Awards' },
        { name: 'Foundation', label: 'FOUNDATION', path: 'Foundation' },
        { name: 'Apply', label: 'APPLY NOW', path: 'Apply' },
        { name: 'Results', label: 'LIVE RESULTS', path: 'Results' },
    ];

    const adminItems = [
        { name: 'Admin', label: 'ADMIN', path: 'Admin' },
    ];

    const handleLogout = async () => {
        await base44.auth.logout();
        setCurrentUser(null);
        window.location.reload();
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Navigation (Fixed at top) */}
            <nav className="flex-none z-50 bg-white shadow-sm border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link to={createPageUrl('Home')} className="flex items-center gap-2">
                            <img src="/logo.png" alt="Kalenjin Music Festival" className="h-12 w-auto md:h-16 object-contain" />
                            <div className="flex flex-col">
                                <span className="text-lg md:text-xl font-bold leading-none hidden sm:block">
                                    <span className="text-amber-500">Kalenjin</span>
                                </span>
                                <span className="text-sm md:text-lg font-bold text-red-600 leading-none hidden sm:block">Music Festival</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map(({ name, label, path }) => (
                                <Link key={name} to={createPageUrl(path)}>
                                    <Button
                                        variant="ghost"
                                        className={`text-slate-700 hover:text-red-600 font-medium text-sm ${currentPageName === path ? 'text-red-600 bg-red-50' : ''
                                            }`}
                                    >
                                        {label}
                                    </Button>
                                </Link>
                            ))}
                            {currentUser?.role === 'admin' && adminItems.map(({ name, label, path }) => (
                                <Link key={name} to={createPageUrl(path)}>
                                    <Button
                                        variant="ghost"
                                        className={`text-slate-700 hover:text-red-600 font-medium text-sm ${currentPageName === path ? 'text-red-600 bg-red-50' : ''
                                            }`}
                                    >
                                        {label}
                                    </Button>
                                </Link>
                            ))}
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <Link to={createPageUrl('Contact')}>
                                <Button
                                    className="bg-amber-500 hover:bg-amber-600 text-white font-medium hidden md:flex"
                                    size="sm"
                                >
                                    CONTACT US
                                </Button>
                            </Link>

                            {currentUser ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-slate-100 rounded-full">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm">
                                                {currentUser.name ? currentUser.name[0].toUpperCase() : <User className="w-4 h-4" />}
                                            </div>
                                            <span className="hidden sm:inline text-slate-700 text-sm font-medium trunc max-w-[100px] truncate">
                                                {currentUser.name || currentUser.email.split('@')[0]}
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <div className="px-2 py-1.5 text-xs text-slate-500 font-medium border-b mb-1">
                                            {currentUser.email}
                                        </div>
                                        <Link to={createPageUrl('Contact')}>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Mail className="w-4 h-4 mr-2" />
                                                Contact Us
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button
                                    onClick={() => base44.auth.redirectToLogin()}
                                    variant="outline"
                                    className="border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
                                    size="sm"
                                >
                                    <LogIn className="w-4 h-4 mr-2" />
                                    LOGIN
                                </Button>
                            )}

                            {/* Mobile menu button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden ml-1"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden py-4 border-t border-slate-100 bg-white absolute top-16 left-0 right-0 shadow-lg px-4 z-50 animate-in slide-in-from-top-2">
                            <div className="flex flex-col gap-2">
                                {navItems.map(({ name, label, path }) => (
                                    <Link key={name} to={createPageUrl(path)} onClick={() => setMobileMenuOpen(false)}>
                                        <Button
                                            variant="ghost"
                                            className={`w-full justify-start text-slate-700 hover:text-red-600 active:bg-slate-50 ${currentPageName === path ? 'text-red-600 bg-red-50' : ''
                                                }`}
                                        >
                                            {label}
                                        </Button>
                                    </Link>
                                ))}
                                {currentUser?.role === 'admin' && adminItems.map(({ name, label, path }) => (
                                    <Link key={name} to={createPageUrl(path)} onClick={() => setMobileMenuOpen(false)}>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-amber-600 bg-amber-50 hover:bg-amber-100 font-medium"
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            {label}
                                        </Button>
                                    </Link>
                                ))}
                                <Link to={createPageUrl('Contact')} onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full bg-slate-900 text-white mt-4">
                                        Contact Support
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content (Scrollable) */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50/50 scroll-smooth">
                {children}

                {/* Footer (Inside scroll area) */}
                <footer className="bg-slate-900 text-white py-12 mt-auto border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center">
                                <Music4 className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-lg leading-none">Kalenjin Music Festival</div>
                                <div className="text-slate-400 text-xs">Celebrating Culture</div>
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm max-w-md mb-8 leading-relaxed">
                            "Rooted in Tradition, Rising in Rhythm." <br />
                            Join us in honoring the best musical talents across the region.
                        </p>

                        <div className="w-full h-px bg-slate-800 max-w-xs mb-8" />

                        <p className="text-slate-600 text-xs">
                            © {new Date().getFullYear()} Kalenjin Music Festival. All rights reserved.
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
