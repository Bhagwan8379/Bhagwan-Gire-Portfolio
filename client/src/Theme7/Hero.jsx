import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Theme7.css';

const HERO_SLIDES = [
    { line1: 'CREATIVE', line2: 'DEVELOPER' },
    { line1: 'FULL STACK', line2: 'ENGINEER' },
    { line1: 'UI / UX', line2: 'DESIGNER' },
    { line1: 'MOBILE APP', line2: 'DEVELOPER' }
];

const HeroTheme7 = ({ isDark }) => {
    const [scrollY, setScrollY] = useState(0);
    const [activeDot, setActiveDot] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveDot((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToAbout = () => {
        const el = document.getElementById('aura-about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="aura-hero"
            className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden theme-aura select-none"
            style={{ background: 'var(--aura-bg)' }}
        >
            {/* ── PARALLAX TOPOGRAPHIC WAVE LAYERS ── */}
            {/* Layer 1 (Back, slower scroll, dimmer glow) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-10%',
                    width: '120%',
                    height: '80%',
                    transform: `translateY(${scrollY * 0.15}px)`,
                    pointerEvents: 'none',
                    zIndex: 2,
                    opacity: 0.8,
                }}
            >
                <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    <path
                        d="M0,250 C360,320 720,180 1080,240 C1260,270 1380,380 1440,420 L1440,600 L0,600 Z"
                        fill="#050512"
                        filter="drop-shadow(0px -8px 25px rgba(245, 158, 11, 0.08))"
                    />
                </svg>
            </div>

            {/* Layer 2 (Middle) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-15%',
                    left: '-5%',
                    width: '110%',
                    height: '70%',
                    transform: `translateY(${scrollY * 0.25}px)`,
                    pointerEvents: 'none',
                    zIndex: 3,
                    opacity: 0.9,
                }}
            >
                <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    <path
                        d="M0,320 C300,260 600,380 900,310 C1140,254 1320,380 1440,450 L1440,600 L0,600 Z"
                        fill="#03030b"
                        filter="drop-shadow(0px -10px 30px rgba(245, 158, 11, 0.12))"
                    />
                </svg>
            </div>

            {/* Layer 3 (Front, faster scroll, brightest glow) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '0%',
                    width: '100%',
                    height: '60%',
                    transform: `translateY(${scrollY * 0.4}px)`,
                    pointerEvents: 'none',
                    zIndex: 4,
                }}
            >
                <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    <path
                        d="M0,380 C400,480 800,280 1200,380 C1320,410 1400,480 1440,520 L1440,600 L0,600 Z"
                        fill="#010105"
                        filter="drop-shadow(0px -12px 35px rgba(245, 158, 11, 0.18))"
                    />
                </svg>
            </div>


            {/* ── FLOATING 3D GLASS CUBE ── */}
            <div
                className="absolute animate-float-2 pointer-events-none"
                style={{
                    top: '25%',
                    right: '18%',
                    zIndex: 5,
                    perspective: '1000px',
                }}
            >
                {/* 3D Rotating Cube Container */}
                <div
                    className="animate-cube-3d"
                    style={{
                        width: '80px',
                        height: '80px',
                        transformStyle: 'preserve-3d',
                        position: 'relative',
                    }}
                >
                    {/* Face Styles */}
                    {[
                        { transform: 'rotateY(0deg) translateZ(40px)' },
                        { transform: 'rotateY(180deg) translateZ(40px)' },
                        { transform: 'rotateY(90deg) translateZ(40px)' },
                        { transform: 'rotateY(-90deg) translateZ(40px)' },
                        { transform: 'rotateX(90deg) translateZ(40px)' },
                        { transform: 'rotateX(-90deg) translateZ(40px)' },
                    ].map((face, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                boxShadow: 'inset 0 0 10px rgba(255,255,255,0.05)',
                                ...face,
                            }}
                        />
                    ))}
                </div>
            </div>


            {/* ── FLOATING 3D GLOSSY SPHERES ── */}
            {/* Sphere 1 (Left Top) */}
            <div
                className="absolute animate-float-1"
                style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    top: '18%',
                    left: '12%',
                    zIndex: 1,
                    background: 'radial-gradient(circle at 35% 35%, #2a2a35 0%, #080814 60%, #000000 100%)',
                    boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.9), 10px 10px 25px rgba(0,0,0,0.6)',
                }}
            />

            {/* Sphere 2 (Right Center) */}
            <div
                className="absolute animate-float-3"
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    top: '55%',
                    right: '10%',
                    zIndex: 5,
                    background: 'radial-gradient(circle at 35% 35%, #22222d 0%, #05050f 65%, #000000 100%)',
                    boxShadow: 'inset -6px -6px 15px rgba(0,0,0,0.9), 8px 8px 20px rgba(0,0,0,0.5)',
                }}
            />

            {/* Sphere 3 (Left Bottom) */}
            <div
                className="absolute animate-float-2"
                style={{
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    bottom: '15%',
                    left: '15%',
                    zIndex: 5,
                    background: 'radial-gradient(circle at 35% 35%, #30303e 0%, #0a0a18 60%, #000000 100%)',
                    boxShadow: 'inset -10px -10px 25px rgba(0,0,0,0.9), 12px 12px 30px rgba(0,0,0,0.6)',
                }}
            />

            {/* Sphere 4 (Center Top Back) */}
            <div
                className="absolute animate-float-1"
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    top: '12%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    background: 'radial-gradient(circle at 35% 35%, #1c1c24 0%, #04040a 70%, #000000 100%)',
                    boxShadow: 'inset -4px -4px 10px rgba(0,0,0,0.9), 5px 5px 15px rgba(0,0,0,0.4)',
                }}
            />


            {/* ── CENTER HERO TEXTS ── */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeDot}
                        className="flex flex-col items-center justify-center"
                    >
                        {/* Title Line 1 */}
                        <div style={{ overflow: 'hidden' }} className="mb-2">
                            <motion.h1
                                initial={{ y: '110%', opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: '-110%', opacity: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="aura-title-serif uppercase text-[clamp(48px,11vw,140px)] leading-[0.9] tracking-[0.03em]"
                                style={{
                                    background: 'linear-gradient(to bottom, #ffffff 40%, #888888 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {HERO_SLIDES[activeDot].line1}
                            </motion.h1>
                        </div>

                        {/* Title Line 2 */}
                        <div style={{ overflow: 'hidden' }} className="mb-8">
                            <motion.h1
                                initial={{ y: '110%', opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: '-110%', opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                className="aura-title-serif uppercase text-[clamp(48px,11vw,140px)] leading-[0.9] tracking-[0.03em]"
                                style={{
                                    background: 'linear-gradient(to bottom, #ffffff 40%, #888888 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {HERO_SLIDES[activeDot].line2}
                            </motion.h1>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Glassmorphism Button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    onClick={scrollToAbout}
                    className="shimmer-trigger relative px-8 py-3.5 rounded-full border border-white/10 hover:border-white/20 text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        color: 'white',
                        cursor: 'pointer',
                        overflow: 'hidden',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Shimmer Sweep Overlay */}
                    <span 
                        className="shimmer-bar absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                        style={{
                            transform: 'translateX(-150%) skewX(-25deg)',
                            transition: 'none'
                        }}
                    />
                    Find out more
                </motion.button>
            </div>


            {/* ── LEFT ROTATED VERTICAL TEXT ── */}
            <div
                className="absolute left-6 bottom-[12%] hidden lg:block aura-text-mono text-[9px] uppercase tracking-[0.3em] opacity-40 text-white"
                style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                }}
            >
                Discover — Scroll Down
            </div>


            {/* ── BOTTOM DOTS (Carousel Indicator) ── */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {[0, 1, 2, 3].map((dot) => (
                    <button
                        key={dot}
                        onClick={() => setActiveDot(dot)}
                        style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: dot === activeDot ? 'var(--aura-amber)' : 'rgba(255, 255, 255, 0.2)',
                            boxShadow: dot === activeDot ? '0 0 8px var(--aura-amber)' : 'none',
                            transition: 'all 0.3s ease',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroTheme7;
