import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Layout } from 'lucide-react';
import './Theme7.css';

const THEMES = [
    { key: 'Layout1', label: 'Professional' },
    { key: 'Layout6', label: 'Obsidian Codex' },
    { key: 'Layout7', label: 'Aura Glassmorphism' },
];

const NavbarTheme7 = ({ LayoutChanage, layout }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [themeOpen, setThemeOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setThemeOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            setMobileOpen(false);
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 500,
                padding: scrolled ? '12px 24px' : '24px 24px',
                transition: 'padding 0.3s ease, background 0.3s ease',
            }}
            className="flex justify-center items-center pointer-events-none"
        >
            {/* Outer Capsule Container */}
            <div
                className="w-full max-w-6xl flex items-center justify-between pointer-events-auto transition-all duration-300"
                style={{
                    background: scrolled ? 'rgba(10, 10, 22, 0.75)' : 'rgba(10, 10, 22, 0.4)',
                    backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
                    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
                    border: scrolled ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: scrolled ? '0 10px 40px rgba(0, 0, 0, 0.5)' : 'none',
                    borderRadius: '999px',
                    padding: '8px 24px',
                    height: '60px',
                }}
            >
                {/* ── Left corner: Logo "BG" ── */}
                <div 
                    onClick={() => scrollTo('aura-hero')}
                    style={{
                        fontFamily: 'var(--aura-font-display)',
                        fontSize: '26px',
                        fontWeight: '700',
                        letterSpacing: '0.12em',
                        background: 'linear-gradient(to right, #ffffff 30%, var(--aura-amber) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                >
                    BG
                </div>

                {/* ── Center: Capsule links ── */}
                <nav className="hidden md:flex items-center gap-1">
                    {[
                        { name: 'Home', id: 'aura-hero' },
                        { name: 'About', id: 'aura-about' },
                        { name: 'Projects', id: 'aura-projects' },
                        { name: 'Experience', id: 'aura-experience' },
                        { name: 'Education', id: 'aura-education' },
                        { name: 'Services', id: 'aura-services' }
                    ].map((link, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollTo(link.id)}
                            style={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '11px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '6px 12px',
                                borderRadius: '999px',
                                transition: 'color 0.3s, background 0.3s',
                            }}
                            className="hover:text-white hover:bg-white/5"
                        >
                            {link.name}
                        </button>
                    ))}
                </nav>

                {/* ── Right side: Theme switch + Hamburger Menu + Contact ── */}
                <div className="flex items-center gap-3">
                    {/* Theme selector */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setThemeOpen(!themeOpen)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '36px',
                                height: '36px',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.03)',
                                color: 'rgba(255, 255, 255, 0.8)',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                            }}
                            className="hover:bg-white/10 hover:border-white/20"
                            title="Select Theme"
                        >
                            <Layout size={14} />
                        </button>
                        
                        {themeOpen && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 12px)',
                                    right: 0,
                                    width: '200px',
                                    background: 'rgba(5, 5, 12, 0.95)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '16px',
                                    padding: '8px',
                                    boxShadow: '0 15px 50px rgba(0,0,0,0.8)',
                                    zIndex: 600,
                                }}
                            >
                                <p style={{
                                    fontSize: '9px',
                                    fontFamily: 'var(--aura-font-mono)',
                                    color: 'rgba(255, 255, 255, 0.4)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em',
                                    padding: '6px 12px 4px',
                                    margin: 0
                                }}>
                                    Themes
                                </p>
                                <div className="flex flex-col gap-1 mt-1">
                                    {THEMES.map((t) => (
                                        <button
                                            key={t.key}
                                            onClick={() => {
                                                LayoutChanage(t.key);
                                                setThemeOpen(false);
                                            }}
                                            style={{
                                                textAlign: 'left',
                                                padding: '8px 12px',
                                                fontSize: '11px',
                                                fontFamily: 'var(--aura-font-ui)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.08em',
                                                background: layout === t.key ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: layout === t.key ? '#a78bfa' : 'rgba(255, 255, 255, 0.7)',
                                                cursor: 'pointer',
                                                width: '100%',
                                                transition: 'all 0.2s',
                                            }}
                                            className="hover:bg-white/5 hover:text-white"
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contact Button */}
                    <button
                        onClick={() => scrollTo('aura-contact')}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '999px',
                            color: 'white',
                            fontSize: '11px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            padding: '8px 18px',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                        }}
                        className="hidden md:block hover:bg-white hover:text-black hover:border-white"
                    >
                        Contact
                    </button>

                    {/* Hamburger Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '36px',
                            height: '36px',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                        className="flex md:hidden"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Panel */}
            {mobileOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '80px',
                        left: '20px',
                        right: '20px',
                        background: 'rgba(5, 5, 12, 0.95)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        padding: '24px',
                        zIndex: 499,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                    }}
                    className="flex flex-col gap-4 md:hidden"
                >
                    {[
                        { name: 'Home', id: 'aura-hero' },
                        { name: 'About', id: 'aura-about' },
                        { name: 'Projects', id: 'aura-projects' },
                        { name: 'Experience', id: 'aura-experience' },
                        { name: 'Education', id: 'aura-education' },
                        { name: 'Services', id: 'aura-services' }
                    ].map((link, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollTo(link.id)}
                            style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '13px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '10px 16px',
                                textAlign: 'left',
                                width: '100%',
                            }}
                            className="hover:text-white hover:bg-white/5 rounded-lg"
                        >
                            {link.name}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollTo('aura-contact')}
                        style={{
                            background: 'linear-gradient(to right, var(--aura-purple), var(--aura-indigo))',
                            borderRadius: '999px',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            padding: '12px',
                            cursor: 'pointer',
                            border: 'none',
                            textAlign: 'center',
                            width: '100%',
                            marginTop: '8px',
                        }}
                    >
                        Contact
                    </button>
                </div>
            )}
        </header>
    );
};

export default NavbarTheme7;
