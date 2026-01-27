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
    Mail,
    ShieldCheck,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Phone,
    Search
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
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        base44.auth.me().then(setCurrentUser).catch(() => setCurrentUser(null));
    }, []);

    const navItems = [
        { name: 'Home', label: 'HOME', path: 'Home' },
        { name: 'About', label: 'ABOUT KMF', path: 'About' },
        { name: 'Awards', label: 'AWARDS', path: 'Awards' },
        { name: 'Foundation', label: 'FOUNDATION', path: 'Foundation' },
        { name: 'Apply', label: 'APPLY NOW', path: 'Apply' },
    ];

    const adminItems = [
        { name: 'Admin', label: 'ADMIN', path: 'Admin' },
    ];

    const handleLogout = async () => {
        await base44.auth.logout();
        setCurrentUser(null);
        window.location.reload();
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // Update URL with search param
        const url = new URL(window.location);
        if (query) {
            url.searchParams.set('search', query);
        } else {
            url.searchParams.delete('search');
        }
        window.history.replaceState({}, '', url);
        // Trigger a custom event for Home.jsx to listen to
        window.dispatchEvent(new CustomEvent('searchUpdate', { detail: query }));
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navigation (Fixed/Sticky at top) */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link to={createPageUrl('Home')} className="flex items-center gap-2">
                            <div className="flex flex-col">
                                <span className="text-lg md:text-xl font-black leading-none hidden sm:block">
                                    <span className="text-amber-500 uppercase">Kalenjin</span>
                                </span>
                                <span className="text-sm md:text-lg font-black text-red-600 leading-none hidden sm:block uppercase -mt-0.5">Music Festival</span>
                            </div>

                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {/* Search Bar - Desktop */}
                            <div className="relative mr-4">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="w-4 h-4 text-slate-400" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search nominees..."
                                    className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-red-500 w-56"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>

                            {navItems.filter(item => item.name !== 'Apply' || currentUser).map(({ name, label, path }) => (
                                <Link key={name} to={createPageUrl(path)}>
                                    <Button
                                        variant="ghost"
                                        className={`px-4 py-2 font-black text-[13px] tracking-widest transition-all duration-300 ${(currentPageName === path || (currentPageName === 'Home' && path === 'Home'))
                                            ? 'text-red-600 bg-red-50/80 rounded-md'
                                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
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
                                        className={`px-4 py-2 font-black text-[13px] tracking-widest transition-all duration-300 ${currentPageName === path
                                            ? 'text-red-600 bg-red-50/80 rounded-md'
                                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
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
                                    className="bg-amber-500 hover:bg-amber-600 text-white font-black text-[12px] tracking-widest px-6 rounded-md hidden md:flex"
                                    size="sm"
                                >
                                    CONTACT US
                                </Button>
                            </Link>

                            <Link to={createPageUrl('Results')} className="hidden sm:block">
                                <Button
                                    className="bg-red-600 hover:bg-red-700 text-white font-black text-[12px] tracking-widest px-6 rounded-md shadow-lg shadow-red-200"
                                    size="sm"
                                >
                                    <BarChart3 className="w-3.5 h-3.5 mr-2" />
                                    LIVE RESULTS
                                </Button>
                            </Link>

                            {currentUser ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-slate-100 rounded-full">
                                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-black text-xs shadow-sm">
                                                {currentUser.name ? currentUser.name[0].toUpperCase() : <User className="w-4 h-4" />}
                                            </div>
                                            <span className="hidden sm:inline text-slate-600 text-[11px] font-bold max-w-[120px] truncate">
                                                {currentUser.name || currentUser.email.split('@')[0]}
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <div className="px-2 py-1.5 text-xs text-slate-500 font-medium border-b mb-1">
                                            {currentUser.email}
                                        </div>
                                        {currentUser?.role === 'admin' && (
                                            <Link to={createPageUrl('Admin')}>
                                                <DropdownMenuItem className="cursor-pointer font-bold text-amber-600 focus:text-amber-700 focus:bg-amber-50">
                                                    <ShieldCheck className="w-4 h-4 mr-2" />
                                                    Admin Dashboard
                                                </DropdownMenuItem>
                                            </Link>
                                        )}
                                        <Link to={createPageUrl('Contact')}>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Mail className="w-4 h-4 mr-2" />
                                                Contact Us
                                            </DropdownMenuItem>
                                        </Link>
                                        <div className="h-px bg-slate-100 my-1" />
                                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer font-bold focus:text-red-700 focus:bg-red-50">
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

                    {/* Mobile Search Bar - Always visible on mobile */}
                    <div className="lg:hidden pb-3 -mt-1">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="w-4 h-4 text-slate-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search nominees..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-red-500"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden py-4 border-t border-slate-100 bg-white absolute top-24 left-0 right-0 shadow-lg px-4 z-50 animate-in slide-in-from-top-2">
                            <div className="flex flex-col gap-2">
                                {navItems.filter(item => item.name !== 'Apply' || currentUser).map(({ name, label, path }) => (
                                    path.startsWith('/#') ? (
                                        <a key={name} href={path} onClick={() => setMobileMenuOpen(false)}>
                                            <Button
                                                variant="ghost"
                                                className={`w-full justify-start text-slate-700 hover:text-red-600 active:bg-slate-50 ${currentPageName === name ? 'text-red-600 bg-red-50' : ''
                                                    }`}
                                            >
                                                {label}
                                            </Button>
                                        </a>
                                    ) : (
                                        <Link key={name} to={createPageUrl(path)} onClick={() => setMobileMenuOpen(false)}>
                                            <Button
                                                variant="ghost"
                                                className={`w-full justify-start text-slate-700 hover:text-red-600 active:bg-slate-50 ${currentPageName === path ? 'text-red-600 bg-red-50' : ''
                                                    }`}
                                            >
                                                {label}
                                            </Button>
                                        </Link>
                                    )
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
                                    <Button variant="outline" className="w-full mt-4 border-slate-200">
                                        Contact Support
                                    </Button>
                                </Link>

                                {currentUser && (
                                    <Button
                                        onClick={handleLogout}
                                        variant="ghost"
                                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mt-2 font-bold"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        SIGN OUT
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content (Scrollable) */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50/50 scroll-smooth">
                {children}

                {/* Footer (Inside scroll area) */}
                {/* Enhanced Footer */}
                <footer className="bg-slate-900 text-slate-300 py-12 md:py-16 mt-auto border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                            {/* Column 1: Brand */}
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-900/20">
                                        <Music4 className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-white leading-none tracking-tight">Kalenjin</span>
                                        <span className="text-sm font-bold text-red-500 leading-none tracking-tight">Music Festival</span>
                                    </div>
                                </div>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    Celebrating the rich musical heritage and artistic excellence of the Kalenjin community. Rooted in tradition, rising in rhythm.
                                </p>
                            </div>

                            {/* Column 2: Quick Links */}
                            <div className="flex flex-col gap-6">
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h3>
                                <ul className="flex flex-col gap-4">
                                    {[
                                        { label: 'Home', path: 'Home' },
                                        { label: 'Live Results', path: 'Results' },
                                        { label: 'About KMF', path: 'About' },
                                        { label: 'Awards', path: 'Awards' },
                                        { label: 'Foundation', path: 'Foundation' },
                                        { label: 'Apply Now', path: 'Apply' },
                                    ].filter(link => link.path !== 'Apply' || currentUser).map((link) => (
                                        <li key={link.path}>
                                            <Link
                                                to={createPageUrl(link.path)}
                                                className="text-sm hover:text-amber-500 transition-colors flex items-center gap-2 group"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-500 transition-colors" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Column 3: Contact */}
                            <div className="flex flex-col gap-6">
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Contact Us</h3>
                                <ul className="flex flex-col gap-4">
                                    <li className="flex items-start gap-3 text-sm">
                                        <div className="w-5 h-5 rounded-full border border-amber-500/30 flex items-center justify-center shrink-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                        </div>
                                        <span>Rupa's Mall, Eldoret, Kenya</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm">
                                        <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                                        <a href="mailto:support@kalenjinmusicfestival.com" className="hover:text-white transition-colors cursor-pointer">support@kalenjinmusicfestival.com</a>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm">
                                        <div className="w-5 h-5 rounded-full border border-amber-500/30 flex items-center justify-center shrink-0">
                                            <Phone className="w-3 h-3 text-amber-500" />
                                        </div>
                                        <a href="tel:0757915440" className="hover:text-white transition-colors cursor-pointer">0757915440</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 4: Newsletter/Social */}
                            <div className="flex flex-col gap-6">
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Stay Connected</h3>
                                <p className="text-xs text-slate-500">
                                    Join our community to get the latest updates on voting and events.
                                </p>
                                <div className="flex items-center gap-4">
                                    {[
                                        { icon: Facebook, label: 'Facebook', href: '#' },
                                        { icon: Twitter, label: 'Twitter', href: '#' },
                                        { icon: Instagram, label: 'Instagram', href: '#' },
                                        { icon: Youtube, label: 'Youtube', href: '#' }
                                    ].map(({ icon: Icon, label, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-amber-500 group"
                                            aria-label={label}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-px bg-slate-800/50 mt-12 mb-8" />

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                            <p>© {new Date().getFullYear()} Kalenjin Music Festival. All rights reserved.</p>
                            <div className="flex items-center gap-6">
                                <Link to={createPageUrl('Privacy')} className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
                                <Link to={createPageUrl('Terms')} className="hover:text-amber-500 transition-colors">Terms of Service</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
