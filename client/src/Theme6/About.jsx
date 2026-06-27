import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useGetAllEducationQuery } from '../redux/api/educationApi';
import { toast } from 'sonner';
import './Theme6.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Skill Arc ─────────────────────────────────────────── */
const SkillArc = ({ label, pct, delay }) => {
    const circleRef = useRef(null);
    const textRef   = useRef(null);
    const R = 52;
    const circ = 2 * Math.PI * R;

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: circleRef.current,
                start: 'top 85%',
                once: true,
            },
        });
        tl.fromTo(circleRef.current,
            { strokeDashoffset: circ },
            {
                strokeDashoffset: circ - (circ * pct / 100),
                duration: 1.6,
                ease: 'power3.out',
                delay,
            }
        );
        tl.fromTo(textRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
            '-=1.2'
        );
    }, []);

    return (
        <div className="flex flex-col items-center gap-3">
            <div style={{ position: 'relative', width: 120, height: 120 }}>
                <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4"/>
                    <circle
                        ref={circleRef}
                        cx="60" cy="60" r={R}
                        fill="none"
                        stroke="var(--ob-gold)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        strokeDashoffset={circ}
                    />
                </svg>
                <div
                    ref={textRef}
                    style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        opacity: 0,
                    }}
                >
                    <span style={{ fontFamily: 'var(--ob-font-display)', fontSize: '22px', color: 'var(--ob-text)', fontWeight: 400 }}>
                        {pct}
                    </span>
                    <span style={{ fontFamily: 'var(--ob-font-mono)', fontSize: '9px', color: 'var(--ob-gold)', letterSpacing: '0.1em' }}>%</span>
                </div>
            </div>
            <span style={{ fontFamily: 'var(--ob-font-ui)', fontSize: '12px', color: 'var(--ob-text-muted)', letterSpacing: '0.05em', textAlign: 'center', maxWidth: '90px' }}>
                {label}
            </span>
        </div>
    );
};

const SKILLS = [
    { label: 'React & RN',    pct: 92 },
    { label: 'Node / Express',pct: 88 },
    { label: 'MongoDB',       pct: 85 },
    { label: 'UI/UX Motion',  pct: 82 },
    { label: 'REST APIs',     pct: 90 },
    { label: 'PostgreSQL',    pct: 72 },
];

/* ── About Component ─────────────────────────────────── */
const AboutTheme6 = () => {
    const { data: educations, isError } = useGetAllEducationQuery();

    const sectionRef = useRef(null);
    const wrapRef    = useRef(null);
    const panelsRef  = useRef(null);

    const titleRef   = useRef(null);
    const bioRefs    = useRef([]);
    const eduRefs    = useRef([]);
    const skillsRef  = useRef(null);
    const lineRef    = useRef(null);

    useEffect(() => {
        if (isError) toast.error('Could not load education data.');
    }, [isError]);

    /* ── Horizontal scroll pin (desktop) ── */
    useLayoutEffect(() => {
        if (!sectionRef.current || !panelsRef.current) return;

        const isDesktop = window.innerWidth >= 1024;
        if (!isDesktop) return;

        const panels = panelsRef.current.querySelectorAll('.ob-h-panel');
        const totalScroll = (panels.length - 1) * window.innerWidth;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${totalScroll}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        /* Grow gold vertical line proportionally */
                        if (lineRef.current) {
                            gsap.set(lineRef.current, { scaleY: self.progress });
                        }
                    },
                },
            });

            tl.to(panelsRef.current, {
                x: `-${totalScroll}px`,
                ease: 'none',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    /* ── Panel content reveal animations ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Section title */
            if (titleRef.current) {
                const split = new SplitType(titleRef.current, { types: 'lines' });
                gsap.fromTo(split.lines,
                    { yPercent: 100, opacity: 0 },
                    {
                        yPercent: 0, opacity: 1,
                        stagger: 0.08, duration: 0.8, ease: 'expo.out',
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: 'top 85%',
                            once: true,
                        },
                    }
                );
            }

            /* Bio paragraphs */
            bioRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(el,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1, x: 0,
                        duration: 0.8,
                        delay: i * 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 88%',
                            once: true,
                        },
                    }
                );
            });

            /* Education items */
            eduRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(el,
                    { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
                    {
                        opacity: 1, y: 0,
                        clipPath: 'inset(0 0 0% 0)',
                        duration: 0.9,
                        delay: i * 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 88%',
                            once: true,
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [educations]);

    return (
        <section
            id="ob-about"
            ref={sectionRef}
            className="ob-section"
            style={{
                minHeight: '100vh',
                background: 'var(--ob-bg)',
                overflow: 'hidden',
            }}
        >
            {/* Gold vertical accent line */}
            <div
                ref={lineRef}
                style={{
                    position: 'absolute',
                    left: '60px',
                    top: 0,
                    width: '1px',
                    height: '100%',
                    background: 'linear-gradient(180deg, transparent, var(--ob-gold), transparent)',
                    opacity: 0.3,
                    transformOrigin: 'top',
                    scaleY: 0,
                    zIndex: 1,
                }}
            />

            {/* Horizontal panels container */}
            <div
                ref={wrapRef}
                style={{ overflow: 'hidden', height: '100vh', display: 'flex', alignItems: 'center' }}
            >
                <div
                    ref={panelsRef}
                    className="ob-h-panels"
                    style={{ height: '100vh' }}
                >
                    {/* ── Panel 1: Bio ── */}
                    <div className="ob-h-panel" style={{ flexDirection: 'column', justifyContent: 'center', padding: '80px 10vw 80px 14vw' }}>
                        <div className="max-w-[600px]">
                            <p className="ob-label mb-6">About Me</p>
                            <h2
                                ref={titleRef}
                                style={{
                                    fontFamily: 'var(--ob-font-display)',
                                    fontSize: 'clamp(36px, 4vw, 56px)',
                                    fontWeight: 300,
                                    lineHeight: 1.05,
                                    color: 'var(--ob-text)',
                                    marginBottom: '40px',
                                    overflow: 'hidden',
                                }}
                            >
                                Crafting digital experiences with precision & passion.
                            </h2>
                            {[
                                `Hi, I'm Bhagwan Babasaheb Gire from Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. I completed my Bachelor's in Computer Science from Dr. Babasaheb Ambedkar Marathwada University.`,
                                `I'm a Full Stack Developer with skills in HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, and tools like Git and GitHub. I also use Bootstrap, Tailwind CSS, React Native, Expo, and React Native Paper for web and mobile app development.`,
                                `I completed a 6-month internship at Matic UI as a Full Stack Developer, where I worked on real-world projects and improved my coding and teamwork skills. In my free time, I enjoy reading books, traveling, photography, and learning about new technologies.`,
                            ].map((text, i) => (
                                <p
                                    key={i}
                                    ref={el => bioRefs.current[i] = el}
                                    className="ob-body"
                                    style={{ fontSize: '15px', marginBottom: '16px' }}
                                >
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* ── Panel 2: Education ── */}
                    <div className="ob-h-panel" style={{ flexDirection: 'column', justifyContent: 'center', padding: '80px 10vw' }}>
                        <div className="w-full max-w-[700px]">
                            <p className="ob-label mb-6">Education Timeline</p>
                            <h2
                                style={{
                                    fontFamily: 'var(--ob-font-display)',
                                    fontSize: 'clamp(30px, 3vw, 48px)',
                                    fontWeight: 300,
                                    color: 'var(--ob-text)',
                                    marginBottom: '48px',
                                }}
                            >
                                Academic Journey
                            </h2>

                            <div style={{ position: 'relative' }}>
                                {/* Vertical timeline bar */}
                                <div style={{
                                    position: 'absolute', left: 0, top: 0, bottom: 0,
                                    width: '1px',
                                    background: 'linear-gradient(180deg, var(--ob-gold), transparent)',
                                    opacity: 0.4,
                                }} />

                                <div style={{ paddingLeft: '36px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                    {educations && educations.map((edu, idx) => (
                                        <div
                                            key={idx}
                                            ref={el => eduRefs.current[idx] = el}
                                            style={{ position: 'relative' }}
                                        >
                                            {/* Timeline dot */}
                                            <div style={{
                                                position: 'absolute',
                                                left: '-42px',
                                                top: '6px',
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                background: 'var(--ob-gold)',
                                                boxShadow: '0 0 12px var(--ob-gold-dim)',
                                            }} />
                                            <span
                                                style={{
                                                    fontFamily: 'var(--ob-font-mono)',
                                                    fontSize: '10px',
                                                    letterSpacing: '0.15em',
                                                    color: 'var(--ob-gold)',
                                                    display: 'block',
                                                    marginBottom: '6px',
                                                }}
                                            >
                                                {edu.year}
                                            </span>
                                            <h4
                                                style={{
                                                    fontFamily: 'var(--ob-font-display)',
                                                    fontSize: '22px',
                                                    fontWeight: 400,
                                                    color: 'var(--ob-text)',
                                                    marginBottom: '4px',
                                                }}
                                            >
                                                {edu.degree}
                                            </h4>
                                            <p style={{ fontFamily: 'var(--ob-font-ui)', fontSize: '13px', color: 'var(--ob-text-muted)', fontWeight: 300 }}>
                                                {edu.stream && <span>{edu.stream} · </span>}
                                                {edu.institute}
                                            </p>
                                        </div>
                                    ))}

                                    {(!educations || educations.length === 0) && (
                                        <p className="ob-body">No education records found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Panel 3: Skills ── */}
                    <div className="ob-h-panel" style={{ flexDirection: 'column', justifyContent: 'center', padding: '80px 10vw' }}>
                        <div>
                            <p className="ob-label mb-6">Expertise</p>
                            <h2
                                style={{
                                    fontFamily: 'var(--ob-font-display)',
                                    fontSize: 'clamp(30px, 3vw, 48px)',
                                    fontWeight: 300,
                                    color: 'var(--ob-text)',
                                    marginBottom: '56px',
                                }}
                            >
                                Technical Proficiency
                            </h2>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '40px',
                            }}>
                                {SKILLS.map(({ label, pct }, i) => (
                                    <SkillArc key={label} label={label} pct={pct} delay={i * 0.1} />
                                ))}
                            </div>

                            {/* Additional tags */}
                            <div style={{ marginTop: '48px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {['Vercel', 'Render', 'Git', 'GitHub', 'Expo', 'Socket.io', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'GSAP'].map(tag => (
                                    <span key={tag} className="ob-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile fallback: vertical layout */}
            <style>{`
                @media (max-width: 1023px) {
                    #ob-about .ob-h-panels {
                        flex-direction: column !important;
                        height: auto !important;
                    }
                    #ob-about .ob-h-panel {
                        min-width: 100vw !important;
                        height: auto !important;
                        min-height: 80vh !important;
                        padding: 80px 24px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default AboutTheme6;
