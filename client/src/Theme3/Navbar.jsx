import React, { useState } from 'react';
import { Terminal, Code, Cpu, Layout, User } from 'lucide-react';

const Navbar = ({ isDark, setIsDark, LayoutChanage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    const navItems = [
        { id: 'home', label: '~/home', icon: Terminal },
        { id: 'about', label: '~/about', icon: User },
        { id: 'projects', label: '~/projects', icon: Code },
        { id: 'contact', label: '~/contact', icon: Cpu },
    ];

    return (
        <nav className="fixed w-full z-50 bg-black border-b border-green-500/30 font-mono text-green-500 shadow-[0_0_10px_rgba(0,255,0,0.1)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0 flex items-center space-x-2 animate-pulse">
                        <span className="text-xl font-bold tracking-tighter">&lt;BHAGWAN_GIRE /&gt;</span>
                        <span className="w-3 h-6 bg-green-500 animate-pulse ml-1"></span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="group flex items-center space-x-2 text-sm uppercase tracking-wider hover:text-green-300 transition-all duration-300 hover:shadow-[0_0_5px_rgba(0,255,0,0.5)]"
                            >
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{'>'}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}

                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="p-1 hover:text-green-300 hover:bg-green-900/30 rounded transition-colors"
                                title="Switch Theme"
                            >
                                <Layout size={18} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-black border border-green-500 shadow-[0_0_15px_rgba(0,255,0,0.2)] z-50">
                                    <div className="bg-green-900/20 px-3 py-1 text-[10px] text-green-600 border-b border-green-900 font-bold tracking-widest">
                                        SELECT_INTERFACE_MODE
                                    </div>
                                    <button
                                        onClick={() => { LayoutChanage("Layout1"); setIsDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-3 text-sm text-green-400 hover:bg-green-900/30 hover:text-green-300 border-b border-green-900/50 flex items-center group/item"
                                    >
                                        <span className="w-2 h-2 mr-2 bg-transparent border border-green-500 group-hover/item:bg-green-500 rounded-full transition-colors"></span>
                                        Theme 2 (Gradient)
                                    </button>
                                    <button
                                        onClick={() => { LayoutChanage("Layout2"); setIsDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-3 text-sm text-green-400 hover:bg-green-900/30 hover:text-green-300 border-b border-green-900/50 flex items-center group/item"
                                    >
                                        <span className="w-2 h-2 mr-2 bg-transparent border border-green-500 group-hover/item:bg-green-500 rounded-full transition-colors"></span>

                                        Theme 1 (Standard)
                                    </button>
                                    <button
                                        onClick={() => { LayoutChanage("Layout3"); setIsDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-3 text-sm text-green-400 hover:bg-green-900/30 hover:text-green-300 flex items-center group/item bg-green-900/10"
                                    >
                                        <span className="w-2 h-2 mr-2 bg-green-500 border border-green-500 rounded-full animate-pulse transition-colors"></span>
                                        Theme 3 (Hacker)
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-green-900/50">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="w-full text-left bg-black hover:bg-green-900/20 text-green-400 hover:text-green-300 block px-3 py-2 text-base font-medium border-l-2 border-transparent hover:border-green-500 transition-all"
                            >
                                {item.label}
                            </button>
                        ))}

                        <div className="mt-4 border-t border-green-900 pt-2">
                            <div className="px-3 text-xs text-green-700 font-bold mb-2">INTERFACE_SELECTION</div>
                            <button
                                onClick={() => LayoutChanage("Layout1")}
                                className="w-full text-left bg-black hover:bg-green-900/20 text-green-500 block px-3 py-2 text-sm border-l border-green-900/30 hover:border-green-500"
                            >
                                {'>'} EXECUTE_THEME_1 (STD)
                            </button>
                            <button
                                onClick={() => LayoutChanage("Layout2")}
                                className="w-full text-left bg-black hover:bg-green-900/20 text-green-500 block px-3 py-2 text-sm border-l border-green-900/30 hover:border-green-500"
                            >
                                {'>'} EXECUTE_THEME_2 (GRAD)
                            </button>
                            <button
                                onClick={() => LayoutChanage("Layout3")}
                                className="w-full text-left bg-black hover:bg-green-900/20 text-green-500 block px-3 py-2 text-sm border-l border-green-500 bg-green-900/10"
                            >
                                {'>'} RELOAD_THEME_3 (HACKER)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
