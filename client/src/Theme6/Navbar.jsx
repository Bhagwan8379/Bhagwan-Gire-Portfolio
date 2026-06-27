import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import Resume from '../assets/Bhagwan_Gire-Resume.pdf';
import './Theme6.css';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    { label: 'Home', id: 'ob-home' },
    { label: 'About', id: 'ob-about' },
    { label: 'Projects', id: 'ob-projects' },
    { label: 'Contact', id: 'ob-contact' },
];

const LAYOUTS = [
    { key: 'Layout1', label: 'Professional' },
    { key: 'Layout6', label: 'Obsidian Codex ✦' },
    { key: 'Layout7', label: 'Aura Glassmorphism' },
];

const NavbarTheme6 = ({ LayoutChanage, layout }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [themeOpen, setThemeOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('ob-home');

    const navRef = useRef(null);
    const logoRef = useRef(null);
    const linksRef = useRef([]);
    const prevScrollY = useRef(0);

    /* ── Entrance animation ── */
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.2 });
        tl.fromTo(navRef.current,
            { yPercent: -100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out' }
        );
        tl.fromTo(logoRef.current,
            { opacity: 0, x: -16 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
            '-=0.4'
        );
        tl.fromTo(linksRef.current.filter(Boolean),
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, stagger: 0.07, duration: 0.4, ease: 'power2.out' },
            '-=0.3'
        );
    }, []);

    /* ── Smart scroll hide / show ── */
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const delta = y - prevScrollY.current;
            if (y < 60) {
                gsap.to(navRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
            } else if (delta > 5 && !mobileOpen) {
                gsap.to(navRef.current, { y: '-120%', duration: 0.4, ease: 'power3.in' });
            } else if (delta < -5) {
                gsap.to(navRef.current, { y: 0, duration: 0.35, ease: 'power2.out' });
            }
            prevScrollY.current = y;

            /* Active section detection */
            NAV_LINKS.forEach(({ id }) => {
                const el = document.getElementById(id);
                if (!el) return;
                const { top, bottom } = el.getBoundingClientRect();
                if (top <= 100 && bottom >= 100) setActiveLink(id);
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [mobileOpen]);

    /* ── Magnetic logo ── */
    useEffect(() => {
        const el = logoRef.current;
        if (!el) return;
        const move = (e) => {
            const r = el.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
            const dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
            gsap.to(el, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' });
        };
        const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', leave);
        return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
    }, []);

    /* ── Close dropdown on outside click ── */
    useEffect(() => {
        if (!themeOpen) return;
        const close = (e) => {
            if (!e.target.closest('#ob-theme-drop')) setThemeOpen(false);
        };
        setTimeout(() => document.addEventListener('mousedown', close), 0);
        return () => document.removeEventListener('mousedown', close);
    }, [themeOpen]);

    /* ── Body scroll lock when mobile open ── */
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            setMobileOpen(false);
            setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), mobileOpen ? 350 : 0);
        }
    };

    return (
        <>
            {/* ════ NAVBAR BAR ════ */}
            <nav
                ref={navRef}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0,
                    zIndex: 500,
                    fontFamily: 'var(--ob-font-ui)',
                    willChange: 'transform',
                }}
            >
                {/* Gold scroll progress bar */}
                <div className="ob-progress-bar" id="ob-progress" />

                {/* Frosted background */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'linear-gradient(180deg, rgba(9,9,9,0.97) 0%, rgba(9,9,9,0.82) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(201,168,76,0.14)',
                }} />

                {/* Inner row */}
                <div style={{
                    position: 'relative',
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '0 clamp(20px, 4vw, 48px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '68px',
                }}>
                    {/* ── LEFT: Logo ── */}
                    <div
                        ref={logoRef}
                        onClick={() => scrollTo('ob-home')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            cursor: 'pointer', userSelect: 'none', flexShrink: 0,
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M8 0L15 8L8 16L1 8Z" fill="var(--ob-gold)" opacity="0.9" />
                            <path d="M8 3L13 8L8 13L3 8Z" fill="#090909" />
                        </svg>
                        <span style={{
                            fontFamily: 'var(--ob-font-display)',
                            fontSize: '17px',
                            fontWeight: 300,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--ob-text)',
                            whiteSpace: 'nowrap',
                        }}>
                            Bhagwan<span style={{ color: 'var(--ob-gold)', marginLeft: '3px' }}>·</span>Gire
                        </span>
                    </div>

                    {/* ── CENTER: Nav links (desktop only) ── */}
                    <div style={{
                        display: 'none',
                        alignItems: 'center',
                        gap: '4px',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }} className="nav-desktop-links">
                        {NAV_LINKS.map(({ label, id }, i) => (
                            <button
                                key={id}
                                ref={el => linksRef.current[i] = el}
                                onClick={() => scrollTo(id)}
                                style={{
                                    position: 'relative',
                                    padding: '6px 14px',
                                    fontFamily: 'var(--ob-font-ui)',
                                    fontSize: '11px',
                                    fontWeight: 400,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    color: activeLink === id ? 'var(--ob-gold)' : 'var(--ob-text-muted)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'color 0.3s',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {label}
                                {/* Active underline dot */}
                                <span style={{
                                    position: 'absolute',
                                    bottom: '2px',
                                    left: '50%',
                                    transform: `translateX(-50%) scaleX(${activeLink === id ? 1 : 0})`,
                                    transformOrigin: 'center',
                                    width: '16px',
                                    height: '1px',
                                    background: 'var(--ob-gold)',
                                    display: 'block',
                                    transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
                                }} />
                            </button>
                        ))}
                    </div>

                    {/* ── RIGHT: Actions (desktop) ── */}
                    <div style={{
                        display: 'none',
                        alignItems: 'center',
                        gap: '12px',
                        flexShrink: 0,
                    }} className="nav-desktop-actions">
                        {/* Resume */}
                        <a
                            href={Resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '7px 18px',
                                fontFamily: 'var(--ob-font-mono)',
                                fontSize: '10px',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: 'var(--ob-gold)',
                                border: '1px solid rgba(201,168,76,0.3)',
                                borderRadius: '999px',
                                textDecoration: 'none',
                                transition: 'background 0.3s, border-color 0.3s',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
                                e.currentTarget.style.borderColor = 'var(--ob-gold)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                            }}
                        >
                            Resume
                            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                        </a>

                        {/* Theme Switcher */}
                        <div id="ob-theme-drop" style={{ position: 'relative' }}>
                            <button
                                onClick={() => setThemeOpen(v => !v)}
                                title="Switch Theme"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    padding: '7px 12px',
                                    fontFamily: 'var(--ob-font-mono)',
                                    fontSize: '10px',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    color: themeOpen ? 'var(--ob-gold)' : 'var(--ob-text-muted)',
                                    background: themeOpen ? 'rgba(201,168,76,0.08)' : 'transparent',
                                    border: '1px solid',
                                    borderColor: themeOpen ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.06)',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s',
                                    whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={e => {
                                    if (!themeOpen) e.currentTarget.style.color = 'var(--ob-text)';
                                }}
                                onMouseLeave={e => {
                                    if (!themeOpen) e.currentTarget.style.color = 'var(--ob-text-muted)';
                                }}
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                                    <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                                </svg>
                                Theme
                            </button>

                            {/* Dropdown */}
                            {themeOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 8px)',
                                    right: 0,
                                    minWidth: '190px',
                                    background: 'rgba(14,14,20,0.97)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(201,168,76,0.18)',
                                    borderRadius: '10px',
                                    padding: '6px',
                                    zIndex: 600,
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                                }}>
                                    <p style={{
                                        fontFamily: 'var(--ob-font-mono)',
                                        fontSize: '8px',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: 'var(--ob-text-dim)',
                                        padding: '6px 10px 4px',
                                    }}>
                                        Select Theme
                                    </p>
                                    {LAYOUTS.map(({ key, label }) => (
                                        <button
                                            key={key}
                                            onClick={() => { LayoutChanage(key); setThemeOpen(false); }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                width: '100%',
                                                padding: '8px 10px',
                                                fontFamily: 'var(--ob-font-mono)',
                                                fontSize: '10px',
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                color: layout === key ? 'var(--ob-gold)' : 'var(--ob-text-muted)',
                                                background: layout === key ? 'rgba(201,168,76,0.08)' : 'transparent',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                transition: 'background 0.2s, color 0.2s',
                                            }}
                                            onMouseEnter={e => {
                                                if (layout !== key) {
                                                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                                    e.currentTarget.style.color = 'var(--ob-text)';
                                                }
                                            }}
                                            onMouseLeave={e => {
                                                if (layout !== key) {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = 'var(--ob-text-muted)';
                                                }
                                            }}
                                        >
                                            {/* Active indicator dot */}
                                            <span style={{
                                                width: '4px', height: '4px',
                                                borderRadius: '50%',
                                                background: layout === key ? 'var(--ob-gold)' : 'transparent',
                                                border: `1px solid ${layout === key ? 'var(--ob-gold)' : 'var(--ob-text-dim)'}`,
                                                flexShrink: 0,
                                                transition: 'all 0.2s',
                                            }} />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Mobile: Hamburger only ── */}
                    <button
                        onClick={() => setMobileOpen(v => !v)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px', height: '40px',
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: 'var(--ob-text)',
                            flexShrink: 0,
                            transition: 'border-color 0.3s',
                        }}
                        aria-label="Menu"
                        className="nav-hamburger"
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {/* Responsive style injected */}
                <style>{`
                    @media (min-width: 768px) {
                        .nav-desktop-links   { display: flex !important; }
                        .nav-desktop-actions { display: flex !important; }
                        .nav-hamburger       { display: none !important; }
                    }
                `}</style>
            </nav>

            {/* ════ MOBILE FULL-SCREEN OVERLAY ════ */}
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 490,
                background: 'rgba(9,9,9,0.98)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
                overflowY: 'auto',
                padding: '80px 32px 40px',
            }}>
                {/* Nav links */}
                <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
                    {NAV_LINKS.map(({ label, id }) => (
                        <button
                            key={id}
                            onClick={() => scrollTo(id)}
                            style={{
                                fontFamily: 'var(--ob-font-display)',
                                fontSize: 'clamp(36px, 8vw, 52px)',
                                fontWeight: 300,
                                letterSpacing: '0.04em',
                                color: activeLink === id ? 'var(--ob-gold)' : 'rgba(242,242,248,0.7)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '8px 0',
                                transition: 'color 0.3s',
                                lineHeight: 1.1,
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </nav>

                {/* Divider */}
                <div style={{
                    width: '40px', height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--ob-gold), transparent)',
                    marginBottom: '32px',
                }} />

                {/* Resume button */}
                <a
                    href={Resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 32px',
                        fontFamily: 'var(--ob-font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#090909',
                        background: 'var(--ob-gold)',
                        borderRadius: '999px',
                        textDecoration: 'none',
                        marginBottom: '32px',
                    }}
                >
                    Download Resume
                </a>

                {/* Theme switcher */}
                <div style={{ textAlign: 'center' }}>
                    <p style={{
                        fontFamily: 'var(--ob-font-mono)',
                        fontSize: '9px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--ob-text-dim)',
                        marginBottom: '12px',
                    }}>
                        Switch Theme
                    </p>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '8px',
                        maxWidth: '320px',
                    }}>
                        {LAYOUTS.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => { LayoutChanage(key); setMobileOpen(false); }}
                                style={{
                                    padding: '6px 14px',
                                    fontFamily: 'var(--ob-font-mono)',
                                    fontSize: '9px',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: layout === key ? '#090909' : 'var(--ob-text-muted)',
                                    background: layout === key ? 'var(--ob-gold)' : 'transparent',
                                    border: `1px solid ${layout === key ? 'var(--ob-gold)' : 'rgba(255,255,255,0.1)'}`,
                                    borderRadius: '999px',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s',
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarTheme6;
