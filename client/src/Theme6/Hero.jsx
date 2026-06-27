import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './Theme6.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Gold cursor trail ─────────────────────────────────── */
const CursorTrail = () => {
    const dotRef  = useRef(null);
    const ringRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const ring = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let active = true;
        let rafId;

        const move = (e) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                gsap.to(dotRef.current, {
                    x: e.clientX, y: e.clientY,
                    duration: 0.12, ease: 'power2.out',
                });
            }
        };

        const raf = () => {
            if (!active) return;
            ring.current.x += (pos.current.x - ring.current.x) * 0.12;
            ring.current.y += (pos.current.y - ring.current.y) * 0.12;
            if (ringRef.current) {
                gsap.set(ringRef.current, { x: ring.current.x, y: ring.current.y });
            }
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);
        window.addEventListener('mousemove', move);

        const links = document.querySelectorAll('a, button');
        const grow = () => {
            if (ringRef.current && dotRef.current) {
                gsap.to(ringRef.current, { width: 56, height: 56, opacity: 0.3, duration: 0.25 });
                gsap.to(dotRef.current, { opacity: 0, duration: 0.2 });
            }
        };
        const shrink = () => {
            if (ringRef.current && dotRef.current) {
                gsap.to(ringRef.current, { width: 32, height: 32, opacity: 0.6, duration: 0.25 });
                gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
            }
        };
        links.forEach(l => { l.addEventListener('mouseenter', grow); l.addEventListener('mouseleave', shrink); });

        return () => {
            active = false;
            window.removeEventListener('mousemove', move);
            cancelAnimationFrame(rafId);
            links.forEach(l => {
                l.removeEventListener('mouseenter', grow);
                l.removeEventListener('mouseleave', shrink);
            });
        };
    }, []);

    return (
        <>
            <div ref={dotRef}  className="ob-cursor" style={{ position: 'fixed', top: 0, left: 0 }} />
            <div ref={ringRef} className="ob-cursor-ring" style={{ position: 'fixed', top: 0, left: 0 }} />
        </>
    );
};

/* ─── Particle Constellation Canvas ────────────────────── */
const ParticleCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W = canvas.width  = window.innerWidth;
        let H = canvas.height = window.innerHeight;
        let animId;

        const resize = () => {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);

        /* Particles */
        const count = Math.min(80, Math.floor(W * H / 18000));
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            r: Math.random() * 1.2 + 0.3,
            a: Math.random() * 0.6 + 0.2,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201,168,76,${p.a})`;
                ctx.fill();
            });
            /* Connections */
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(201,168,76,${0.12 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute', inset: 0,
                pointerEvents: 'none', opacity: 0.5,
            }}
        />
    );
};

/* ─── Orbit Ring ────────────────────────────────────────── */
const OrbitRing = ({ size, speed, style }) => (
    <div
        className="ob-orbit"
        style={{
            width: size, height: size,
            animationDuration: `${speed}s`,
            ...style,
        }}
    />
);

/* ─── Hero ──────────────────────────────────────────────── */
const HeroTheme6 = () => {
    const sectionRef   = useRef(null);
    const headlineRef  = useRef(null);
    const subRef       = useRef(null);
    const ctaRef       = useRef(null);
    const metaRef      = useRef(null);
    const imageWrapRef = useRef(null);
    const scrollCueRef = useRef(null);
    const scrollProg   = useRef(null);

    /* ── Scroll progress bar ── */
    useEffect(() => {
        const bar = document.getElementById('ob-progress');
        if (!bar) return;
        const update = () => {
            const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            gsap.set(bar, { scaleX: pct });
        };
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);

    /* ── Entrance animations ── */
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.6 });

        /* Headline: kinetic character drop */
        if (headlineRef.current) {
            const split = new SplitType(headlineRef.current, { types: 'chars, words' });
            /* Wrap each char for overflow hidden clipping */
            split.chars.forEach(ch => {
                const wrap = document.createElement('span');
                wrap.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;';
                ch.parentNode.insertBefore(wrap, ch);
                wrap.appendChild(ch);
            });

            tl.fromTo(split.chars,
                { yPercent: 110, rotateX: -45, opacity: 0 },
                {
                    yPercent: 0, rotateX: 0, opacity: 1,
                    stagger: 0.03,
                    duration: 0.9,
                    ease: 'expo.out',
                },
                0
            );
        }

        /* Sub-label */
        if (subRef.current) {
            tl.fromTo(subRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
                0.5
            );
        }

        /* Image iris wipe */
        if (imageWrapRef.current) {
            tl.fromTo(imageWrapRef.current,
                { clipPath: 'circle(0% at 50% 50%)', opacity: 0.6 },
                { clipPath: 'circle(50% at 50% 50%)', opacity: 1, duration: 1.2, ease: 'power3.inOut' },
                0.4
            );
        }

        /* Meta row */
        if (metaRef.current) {
            tl.fromTo(metaRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                0.9
            );
        }

        /* CTA */
        if (ctaRef.current) {
            tl.fromTo(ctaRef.current.children,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out' },
                1.0
            );
        }

        /* Scroll cue */
        if (scrollCueRef.current) {
            tl.fromTo(scrollCueRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 },
                1.4
            );
            gsap.to(scrollCueRef.current, {
                y: 10, repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut',
            });
        }
    }, []);

    /* ── Parallax on scroll ── */
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        /* Hero content fades & scales out */
        gsap.to(headlineRef.current, {
            yPercent: -25, opacity: 0,
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.2,
            },
        });
    }, []);

    const scrollDown = () => {
        const el = document.getElementById('ob-about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const openLink = (url) => window.open(url, '_blank', 'noopener,noreferrer');

    return (
        <section
            id="ob-home"
            ref={sectionRef}
            className="ob-section ob-noise"
            style={{
                minHeight: '100vh',
                background: 'var(--ob-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '72px',
            }}
        >
            <CursorTrail />

            {/* Particle background */}
            <ParticleCanvas />

            {/* Orbit rings */}
            <OrbitRing size="600px" speed={50} style={{ top: '-20%', right: '-15%', opacity: 0.12 }} />
            <OrbitRing size="400px" speed={35} style={{ top: '-10%', right: '-5%', opacity: 0.08, animationDirection: 'reverse', borderColor: 'rgba(201,168,76,0.3)' }} />
            <OrbitRing size="800px" speed={70} style={{ bottom: '-30%', left: '-20%', opacity: 0.06 }} />

            {/* Radial gold glow */}
            <div style={{
                position: 'absolute', top: '30%', left: '60%',
                width: 600, height: 600,
                background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
            }} />

            {/* Main content */}
            <div
                className="ob-container"
                style={{
                    position: 'relative', zIndex: 2,
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '80px',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '1280px',
                    padding: '0 60px',
                }}
            >
                {/* Left: Text */}
                <div>
                    {/* Label */}
                    <div ref={metaRef} className="flex items-center gap-3 mb-6">
                        <span className="ob-label">Full-Stack Developer</span>
                        <span style={{ color: 'var(--ob-text-dim)', fontSize: '10px' }}>·</span>
                        <span className="ob-label" style={{ color: 'var(--ob-text-muted)', fontFamily: 'var(--ob-font-mono)' }}>Bhagwan Gire</span>
                    </div>

                    {/* Headline */}
                    <div
                        ref={headlineRef}
                        style={{
                            fontFamily: 'var(--ob-font-display)',
                            fontWeight: 300,
                            fontSize: 'clamp(54px, 8vw, 112px)',
                            lineHeight: 0.92,
                            letterSpacing: '-0.02em',
                            color: 'var(--ob-text)',
                            marginBottom: '32px',
                        }}
                    >
                        Full<span style={{ color: 'var(--ob-gold)', fontStyle: 'italic' }}>·</span>Stack<br/>
                        <span style={{ color: 'var(--ob-gold)', fontStyle: 'italic' }}>Developer</span>
                    </div>

                    {/* Sub */}
                    <p
                        ref={subRef}
                        style={{
                            fontFamily: 'var(--ob-font-ui)',
                            fontWeight: 300,
                            fontSize: 'clamp(14px, 1.5vw, 17px)',
                            color: 'var(--ob-text-muted)',
                            maxWidth: '460px',
                            lineHeight: 1.75,
                            marginBottom: '48px',
                        }}
                    >
                        Building immersive, high-performance web & mobile experiences.
                        React · Node.js · MongoDB · React Native.
                    </p>

                    {/* CTAs */}
                    <div ref={ctaRef} className="flex items-center gap-4 flex-wrap">
                        <button
                            className="ob-btn-magnetic"
                            onClick={() => { const el = document.getElementById('ob-projects'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                        >
                            <span>View Work</span>
                        </button>
                        <button
                            className="ob-btn-outline"
                            onClick={() => openLink('https://github.com/Bhagwan8379')}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            GitHub
                        </button>
                        <button
                            className="ob-btn-outline"
                            onClick={() => openLink('https://www.linkedin.com/in/bhagwan-gire-84013a293/')}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                        </button>
                    </div>
                </div>

                {/* Right: Profile */}
                <div
                    className="hidden lg:flex flex-col items-center gap-6"
                    style={{ minWidth: '260px' }}
                >
                    {/* Iris image */}
                    <div
                        ref={imageWrapRef}
                        style={{
                            width: '240px', height: '240px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            clipPath: 'circle(0% at 50% 50%)',
                            border: '2px solid var(--ob-border)',
                            position: 'relative',
                            boxShadow: '0 0 60px rgba(201,168,76,0.15)',
                        }}
                    >
                        <img
                            src="https://res.cloudinary.com/dmolheokh/image/upload/v1744097393/Bhagwan_au3zhm.jpg"
                            alt="Bhagwan Gire"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {/* Gold overlay ring inside */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            borderRadius: '50%',
                            border: '1px solid rgba(201,168,76,0.3)',
                            pointerEvents: 'none',
                        }} />
                    </div>

                    {/* Info card */}
                    <div className="ob-glass" style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <p className="ob-label" style={{ fontSize: '9px', marginBottom: '4px' }}>Location</p>
                        <p style={{ fontFamily: 'var(--ob-font-ui)', fontSize: '13px', color: 'var(--ob-text)', fontWeight: 400 }}>
                            Aurangabad, MH 🇮🇳
                        </p>
                        <div className="ob-divider" style={{ margin: '10px 0' }} />
                        <p className="ob-label" style={{ fontSize: '9px', marginBottom: '4px' }}>Experience</p>
                        <p style={{ fontFamily: 'var(--ob-font-ui)', fontSize: '13px', color: 'var(--ob-text)', fontWeight: 400 }}>
                            6-Month Internship ✦ Matic UI
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll cue */}
            <button
                ref={scrollCueRef}
                onClick={scrollDown}
                style={{
                    position: 'absolute', bottom: '36px', left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    zIndex: 3,
                }}
            >
                <span className="ob-label" style={{ fontSize: '9px' }}>Scroll</span>
                <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
                    <rect x="1" y="1" width="18" height="28" rx="9" stroke="rgba(201,168,76,0.4)" strokeWidth="1.2"/>
                    <circle cx="10" cy="9" r="3" fill="var(--ob-gold)" opacity="0.8">
                        <animate attributeName="cy" values="9;18;9" dur="1.8s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.8;0;0.8" dur="1.8s" repeatCount="indefinite"/>
                    </circle>
                </svg>
            </button>

            {/* Decorative horizontal line */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
            }} />
        </section>
    );
};

export default HeroTheme6;
