import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGetAllProjectsQuery } from '../redux/api/projectsApi';
import { toast } from 'sonner';
import './Theme6.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Card border SVG trace ─────────────────────────────── */
const CardTrace = () => (
    <div className="ob-card-trace" style={{ position: 'absolute', inset: 0, borderRadius: '10px', pointerEvents: 'none' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <rect
                x="0.75" y="0.75"
                width="calc(100% - 1.5px)" height="calc(100% - 1.5px)"
                rx="10"
                fill="none"
                stroke="var(--ob-gold)"
                strokeWidth="1.5"
                style={{
                    strokeDasharray: 2000,
                    strokeDashoffset: 2000,
                    transition: 'stroke-dashoffset 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
            />
        </svg>
    </div>
);

/* ── Project Card ──────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const rectRef = useRef(null);
    const imgRef  = useRef(null);
    const tagsRef = useRef(null);

    /* Entry vector: alternating directions */
    const vectors = [
        { x: -120, y:  60, rotate: -6 },
        { x:  120, y: -60, rotate:  6 },
        { x:  -80, y: 120, rotate: -4 },
        { x:   80, y:  80, rotate:  4 },
        { x: -100, y: -80, rotate: -5 },
        { x:  100, y:  40, rotate:  5 },
    ];
    const v = vectors[index % vectors.length];

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        gsap.fromTo(el,
            { x: v.x, y: v.y, rotate: v.rotate, opacity: 0, scale: 0.88 },
            {
                x: 0, y: 0, rotate: 0, opacity: 1, scale: 1,
                duration: 1.1,
                delay: index * 0.08,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    once: true,
                },
            }
        );

        /* Tech tags: typewriter stagger */
        if (tagsRef.current) {
            const tags = tagsRef.current.children;
            gsap.fromTo(tags,
                { opacity: 0, x: -12 },
                {
                    opacity: 1, x: 0,
                    stagger: 0.06,
                    duration: 0.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: tagsRef.current,
                        start: 'top 90%',
                        once: true,
                    },
                }
            );
        }

        /* Hover: SVG border trace */
        const rect = el.querySelector('svg rect');
        const img  = imgRef.current;

        const onEnter = () => {
            if (rect) rect.style.strokeDashoffset = '0';
            if (img)  gsap.to(img, { scale: 1.07, duration: 0.5, ease: 'power2.out' });
            gsap.to(el, { y: -8, boxShadow: '0 24px 60px rgba(0,0,0,0.5)', duration: 0.35, ease: 'power2.out' });
        };
        const onLeave = () => {
            if (rect) rect.style.strokeDashoffset = '2000';
            if (img)  gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
            gsap.to(el, { y: 0, boxShadow: 'none', duration: 0.35, ease: 'power2.out' });
        };

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        return () => {
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    const openProject = () => {
        if (project.onlineLink) window.open(project.onlineLink, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            ref={cardRef}
            className="ob-card"
            style={{
                position: 'relative',
                cursor: 'pointer',
                willChange: 'transform',
                opacity: 0, /* starts invisible until GSAP animates it */
            }}
            onClick={openProject}
        >
            <CardTrace />

            {/* Image */}
            <div style={{ overflow: 'hidden', height: '200px', position: 'relative' }}>
                <img
                    ref={imgRef}
                    src={project.hero}
                    alt={project.name}
                    style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        display: 'block',
                    }}
                />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(9,9,9,0.8) 0%, transparent 60%)',
                }} />
                {/* Index badge */}
                <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    fontFamily: 'var(--ob-font-mono)',
                    fontSize: '10px',
                    color: 'var(--ob-gold)',
                    background: 'rgba(9,9,9,0.7)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.1em',
                }}>
                    {String(index + 1).padStart(2, '0')}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
                <h3
                    style={{
                        fontFamily: 'var(--ob-font-display)',
                        fontSize: '22px',
                        fontWeight: 400,
                        color: 'var(--ob-text)',
                        marginBottom: '10px',
                        lineHeight: 1.2,
                    }}
                >
                    {project.name}
                </h3>
                <p style={{
                    fontFamily: 'var(--ob-font-ui)',
                    fontSize: '13px',
                    color: 'var(--ob-text-muted)',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    marginBottom: '18px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {project.desc}
                </p>

                {/* Tech tags */}
                <div ref={tagsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {project.technology?.map((tech, i) => (
                        <span key={i} className="ob-tag">{tech}</span>
                    ))}
                </div>

                {/* View link */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ob-gold)' }}>
                    <span style={{ fontFamily: 'var(--ob-font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        View Project
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

/* ── Projects Section ─────────────────────────────────── */
const ProjectsTheme6 = () => {
    const { data, isError, error } = useGetAllProjectsQuery();
    const sectionRef = useRef(null);
    const headRef    = useRef(null);
    const gridRef    = useRef(null);

    useEffect(() => {
        if (isError) toast.error('Could not load projects.');
    }, [isError]);

    /* Section title reveal */
    useEffect(() => {
        if (!headRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: headRef.current,
                start: 'top 80%',
                once: true,
            },
        });

        const label = headRef.current.querySelector('.proj-label');
        const title = headRef.current.querySelector('.proj-title');
        const line  = headRef.current.querySelector('.proj-line');

        tl.fromTo(label,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
        tl.fromTo(title,
            { opacity: 0, y: 40, skewY: 3 },
            { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'expo.out' },
            '-=0.3'
        );
        tl.fromTo(line,
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: 'power3.out', transformOrigin: 'left' },
            '-=0.5'
        );
    }, []);

    return (
        <section
            id="ob-projects"
            ref={sectionRef}
            className="ob-section"
            style={{
                background: 'var(--ob-surface)',
                padding: '120px 0',
                position: 'relative',
            }}
        >
            {/* Background: subtle diagonal lines */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    rgba(201,168,76,0.015) 0px,
                    rgba(201,168,76,0.015) 1px,
                    transparent 1px,
                    transparent 60px
                )`,
                pointerEvents: 'none',
            }} />

            <div className="ob-container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Section header */}
                <div ref={headRef} style={{ marginBottom: '80px' }}>
                    <p className="proj-label ob-label" style={{ marginBottom: '16px' }}>
                        Selected Work
                    </p>
                    <h2
                        className="proj-title"
                        style={{
                            fontFamily: 'var(--ob-font-display)',
                            fontSize: 'clamp(44px, 6vw, 86px)',
                            fontWeight: 300,
                            lineHeight: 0.95,
                            color: 'var(--ob-text)',
                            marginBottom: '32px',
                        }}
                    >
                        Featured<br/>
                        <span style={{ color: 'var(--ob-gold)', fontStyle: 'italic' }}>Projects</span>
                    </h2>
                    <div
                        className="proj-line ob-divider"
                        style={{ transform: 'scaleX(0)', transformOrigin: 'left', maxWidth: '400px' }}
                    />
                </div>

                {/* Projects Grid */}
                {data && data.length > 0 ? (
                    <div
                        ref={gridRef}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                            gap: '32px',
                        }}
                    >
                        {data.map((project, index) => (
                            <ProjectCard key={project._id || index} project={project} index={index} />
                        ))}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 0',
                        color: 'var(--ob-text-muted)',
                        fontFamily: 'var(--ob-font-ui)',
                        fontSize: '14px',
                    }}>
                        {isError ? 'Failed to load projects.' : 'No projects available.'}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsTheme6;
