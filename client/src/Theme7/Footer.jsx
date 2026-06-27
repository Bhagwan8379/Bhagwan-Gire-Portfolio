import React from 'react';
import { ArrowUp, Star } from 'lucide-react';
import './Theme7.css';

const FooterTheme7 = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer 
            style={{ 
                background: 'var(--aura-bg-navy)',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '40px 24px',
            }}
            className="relative theme-aura select-none"
        >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Copyright info */}
                <div className="text-white/40 text-xs font-light">
                    © 2026 Bhagwan Babasaheb Gire. All rights reserved.
                </div>

                {/* Social links */}
                <div className="flex gap-6 text-xs uppercase tracking-wider text-white/50">
                    <a href="https://github.com/Bhagwan8379" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                    <a href="https://www.linkedin.com/in/bhagwan-gire" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="mailto:bhagwangire05@gmail.com" className="hover:text-white transition-colors">Email</a>
                </div>
            </div>

            {/* ── GLOBAL ANIMATED FLOATING STAR (✦) ── */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '96px',
                    right: '24px',
                    zIndex: 400,
                    pointerEvents: 'none',
                }}
                className="animate-star-rotate drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"
            >
                {/* 4-pointed SVG Star */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" fill="white" />
                </svg>
            </div>

            {/* ── GLOBAL FIXED "+" BUTTON ── */}
            <button
                onClick={scrollToTop}
                style={{
                    position: 'fixed',
                    bottom: '32px',
                    right: '24px',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'rgba(10, 10, 22, 0.6)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 401,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    transition: 'all 0.3s ease',
                }}
                className="hover:bg-white hover:text-black hover:border-white hover:scale-105"
                title="Scroll to Top"
            >
                <span className="text-lg font-semibold">+</span>
            </button>
        </footer>
    );
};

export default FooterTheme7;
