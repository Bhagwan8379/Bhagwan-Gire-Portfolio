import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code, Smartphone, Layout, Cpu } from 'lucide-react';
import { useGetAllProjectsQuery } from '../redux/api/projectsApi';
import { useGetAllEducationQuery } from '../redux/api/educationApi';
import './Theme7.css';

// Fallback project details if server doesn't return list
const FALLBACK_PROJECTS = [
    {
        _id: '1',
        name: 'Aura Premium Portfolio',
        hero: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
        category: 'Premium glassmorphism',
        desc: 'Interactive portfolio website with custom 3D visuals, frosted panels, and physics-based scroll indicators.',
        onlineLink: '#'
    },
    {
        _id: '2',
        name: 'Glassmorphic Task Board',
        hero: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=60',
        category: 'React Web Application',
        desc: 'Collaborative task management tool utilizing real-time web sockets and styled with premium glassy overlays.',
        onlineLink: '#'
    },
    {
        _id: '3',
        name: 'Cyberpunk E-Commerce',
        hero: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=60',
        category: 'Full Stack Integration',
        desc: 'Advanced digital storefront using Node.js, Express, MongoDB, and animated with Framer Motion cards.',
        onlineLink: '#'
    },
    {
        _id: '4',
        name: 'Mobile Crypto Wallet',
        hero: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60',
        category: 'React Native / Expo',
        desc: 'Sleek cross-platform application to monitor, trade, and send cryptocurrency assets securely.',
        onlineLink: '#'
    },
    {
        _id: '5',
        name: 'Neural Music Player',
        hero: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&auto=format&fit=crop&q=60',
        category: 'Web Audio API',
        desc: 'Custom music player with real-time audio visualizer waves and responsive dashboard layers.',
        onlineLink: '#'
    }
];

const ProjectsTheme7 = () => {
    const { data: serverProjects } = useGetAllProjectsQuery();
    const { data: serverEducation } = useGetAllEducationQuery();
    
    const projects = serverProjects && serverProjects.length > 0 ? serverProjects : FALLBACK_PROJECTS;
    
    const educationList = serverEducation && serverEducation.length > 0 ? serverEducation : [
        {
            degree: 'Bachelor of Computer Science',
            stream: 'Computer Science',
            institute: 'Dr. Babasaheb Ambedkar Marathwada University',
            year: 'Completed',
            desc: 'Graduated with solid concepts in algorithms, data structures, and database management.'
        },
        {
            degree: 'Full Stack Internship',
            stream: 'Matic UI',
            institute: 'Matic UI Team',
            year: '6 Months',
            desc: 'Developed production-grade interfaces and designed clean modular UI components.'
        }
    ];

    // Carousel States
    const [activeIndex, setActiveIndex] = useState(0);
    const [timelineHeight, setTimelineHeight] = useState(0);
    const [activeServiceNode, setActiveServiceNode] = useState(0);

    const servicesRef = useRef(null);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    // Scroll drawing timeline handler
    useEffect(() => {
        const handleScroll = () => {
            if (!servicesRef.current) return;
            const rect = servicesRef.current.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            // Calculate how much of the services section has scrolled through viewport
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            
            // Calculate percentage from 0% (enters bottom of screen) to 100% (leaves top)
            let percent = ((viewHeight - sectionTop) / (sectionHeight + viewHeight)) * 100;
            percent = Math.max(0, Math.min(100, percent));
            setTimelineHeight(percent);

            // Determine active node based on percent scroll
            if (percent < 30) {
                setActiveServiceNode(0);
            } else if (percent < 60) {
                setActiveServiceNode(1);
            } else if (percent < 90) {
                setActiveServiceNode(2);
            } else {
                setActiveServiceNode(3);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openProject = (link) => {
        if (link && link !== '#') {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div style={{ background: 'var(--aura-bg)' }} className="relative text-white">
            {/* ── SECTION 4: PROJECTS (3D perspective carousel) ── */}
            <section
                id="aura-projects"
                className="py-24 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden theme-aura relative"
            >
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="aura-title-serif text-3xl md:text-5xl">Projects</h2>
                </div>

                {/* 3D perspective container */}
                <div 
                    className="relative w-full h-[400px] md:h-[450px] flex items-center justify-center"
                    style={{ perspective: '1200px' }}
                >
                    <div className="relative w-[280px] md:w-[350px] h-[320px] md:h-[380px] flex items-center justify-center transform-style-preserve-3d">
                        {projects.map((proj, idx) => {
                            // Calculate relative position offset
                            let offset = idx - activeIndex;
                            // Handle circular wrap-around
                            if (offset < -Math.floor(projects.length / 2)) {
                                offset += projects.length;
                            } else if (offset > Math.floor(projects.length / 2)) {
                                offset -= projects.length;
                            }

                            const isActive = offset === 0;
                            const isLeft = offset === -1;
                            const isRight = offset === 1;
                            const isFarLeft = offset < -1;
                            const isFarRight = offset > 1;

                            let transform = 'translate3d(0, 0, 0) scale(0.6)';
                            let opacity = 0;
                            let zIndex = 0;

                            if (isActive) {
                                transform = 'translate3d(0, 0, 80px) scale(1.1)';
                                opacity = 1;
                                zIndex = 10;
                            } else if (isLeft) {
                                transform = 'translate3d(-110%, 0, -60px) rotateY(15deg) scale(0.9)';
                                opacity = 0.55;
                                zIndex = 5;
                            } else if (isRight) {
                                transform = 'translate3d(110%, 0, -60px) rotateY(-15deg) scale(0.9)';
                                opacity = 0.55;
                                zIndex = 5;
                            } else if (isFarLeft) {
                                transform = 'translate3d(-180%, 0, -120px) rotateY(25deg) scale(0.75)';
                                opacity = 0.15;
                                zIndex = 1;
                            } else if (isFarRight) {
                                transform = 'translate3d(180%, 0, -120px) rotateY(-25deg) scale(0.75)';
                                opacity = 0.15;
                                zIndex = 1;
                            }

                            return (
                                <div
                                    key={proj._id || idx}
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        transform,
                                        opacity,
                                        zIndex,
                                        transition: 'transform 0.8s var(--aura-ease-expo), opacity 0.8s var(--aura-ease-expo)',
                                        cursor: isActive ? 'pointer' : 'default',
                                    }}
                                    className="rounded-2xl aura-glass border border-white/5 overflow-hidden flex flex-col justify-between"
                                    onClick={() => isActive && openProject(proj.onlineLink)}
                                >
                                    {/* Project Image */}
                                    <div className="relative w-full h-[60%] overflow-hidden bg-black/40">
                                        <img
                                            src={proj.hero}
                                            alt={proj.name}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                        <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] uppercase tracking-wider">
                                            {proj.category || 'Premium Glassmorphism'}
                                        </div>
                                    </div>

                                    {/* Project Meta */}
                                    <div className="p-5 flex flex-col justify-between flex-grow">
                                        <div>
                                            <h3 className="text-white font-semibold text-base md:text-lg mb-1 leading-tight">
                                                {proj.name}
                                            </h3>
                                            <p className="text-white/40 text-[11px] md:text-[12px] font-light line-clamp-2 leading-relaxed">
                                                {proj.desc}
                                            </p>
                                        </div>

                                        <div className="flex justify-end mt-2">
                                            <button
                                                style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '50%',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        style={{
                            position: 'absolute',
                            left: '5%',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '50%',
                            width: '44px',
                            height: '44px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            cursor: 'pointer',
                            zIndex: 20
                        }}
                        className="hover:bg-white/10 hover:border-white/20"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <button
                        onClick={handleNext}
                        style={{
                            position: 'absolute',
                            right: '5%',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '50%',
                            width: '44px',
                            height: '44px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            cursor: 'pointer',
                            zIndex: 20
                        }}
                        className="hover:bg-white/10 hover:border-white/20"
                    >
                        <ArrowRight size={16} />
                    </button>
                </div>

                {/* Bottom indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {projects.slice(0, 5).map((_, dotIdx) => (
                        <button
                            key={dotIdx}
                            onClick={() => setActiveIndex(dotIdx)}
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: dotIdx === activeIndex % 5 ? 'var(--aura-purple)' : 'rgba(255, 255, 255, 0.2)',
                                boxShadow: dotIdx === activeIndex % 5 ? '0 0 8px var(--aura-purple)' : 'none',
                                transition: 'all 0.3s ease',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        />
                    ))}
                </div>
            </section>


            {/* ── SECTION 5: EXPERIENCE ── */}
            <section
                id="aura-experience"
                className="py-24 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden theme-aura relative"
            >
                {/* Visual grid connecting line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    {/* Left Column (Details) */}
                    <div className="md:col-span-6 relative flex flex-col gap-6">
                        {/* Faded Ghosted background text */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '-20px',
                                fontFamily: 'var(--aura-font-display)',
                                fontSize: 'clamp(80px, 15vw, 150px)',
                                fontWeight: 700,
                                color: 'rgba(255,255,255,0.02)',
                                pointerEvents: 'none',
                                lineHeight: 1,
                                select: 'none',
                                zIndex: 0
                            }}
                            className="hidden lg:block uppercase"
                        >
                            Designer
                        </div>

                        <div className="relative z-10">
                            <h2 className="aura-title-serif text-3xl md:text-5xl text-white mb-6">Experience</h2>
                            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light mb-4">
                                I completed a 6-month internship at Matic UI as a Full Stack Developer. During this period, I worked closely with senior architects to develop scalable web dashboards, optimize application performance, and implement smooth UI animations.
                            </p>
                            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light mb-6">
                                I specialize in building pixel-perfect responsive layouts with modern CSS paradigms, robust Node/Express servers, and hybrid mobile applications using React Native.
                            </p>
                            <button
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--aura-purple)',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: 0,
                                    transition: 'gap 0.3s'
                                }}
                                className="hover:gap-3"
                                onClick={() => {
                                    const el = document.getElementById('aura-services');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Learn More →
                            </button>
                        </div>
                    </div>

                    {/* Right Column (Horizontal work experience carousel) */}
                    <div className="md:col-span-6 flex flex-col gap-6 overflow-hidden">
                        <div className="flex gap-4 overflow-x-auto pb-4 aura-hide-scrollbar snap-x">
                            {[
                                {
                                    title: 'Full Stack Developer',
                                    company: 'Matic UI (Internship)',
                                    period: '6 Months',
                                    desc: 'Collaborated on user interface components, REST API setups, and database integration.'
                                },
                                {
                                    title: 'UI Designer & Developer',
                                    company: 'Freelance Portfolio Projects',
                                    period: 'Ongoing',
                                    desc: 'Designed high-fidelity mockups and developed robust portfolio pages for creative clients.'
                                },
                                {
                                    title: 'Application Lead',
                                    company: 'BAMU Academic Projects',
                                    period: 'Academic',
                                    desc: 'Managed system configurations, database designs, and built mobile frontends.'
                                }
                            ].map((job, idx) => (
                                <div
                                    key={idx}
                                    className="shrink-0 w-[270px] md:w-[320px] rounded-2xl overflow-hidden border border-white/5 snap-start"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        backdropFilter: 'blur(10px)',
                                        WebkitBackdropFilter: 'blur(10px)'
                                    }}
                                >
                                    <div className="h-[100px] overflow-hidden bg-gradient-to-tr from-purple-950/20 to-indigo-950/20 flex items-center justify-center p-4">
                                        <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
                                            {job.period}
                                        </span>
                                    </div>
                                    <div className="p-5 flex flex-col gap-2">
                                        <div>
                                            <h3 className="text-white font-medium text-sm md:text-base leading-tight">
                                                {job.title}
                                            </h3>
                                            <span style={{ color: 'var(--aura-purple)' }} className="text-[10px] uppercase font-mono tracking-wider">
                                                {job.company}
                                            </span>
                                        </div>
                                        <p className="text-white/40 text-[11px] md:text-[12px] font-light leading-relaxed">
                                            {job.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* ── SECTION 5.5: EDUCATION ── */}
            <section
                id="aura-education"
                className="py-24 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden theme-aura relative"
            >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    {/* Left Column (Details) */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                        <h2 className="aura-title-serif text-3xl md:text-5xl text-white">Education</h2>
                        <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed">
                            Academic milestones and educational achievements that laid the technical foundation.
                        </p>
                    </div>

                    {/* Right Column (timeline cards) */}
                    <div className="md:col-span-8 flex flex-col gap-6">
                        {educationList.map((edu, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)'
                                }}
                            >
                                <div>
                                    <span style={{ color: 'var(--aura-purple)' }} className="text-[10px] uppercase font-mono tracking-wider block mb-1">
                                        {edu.year}
                                    </span>
                                    <h3 className="text-white font-semibold text-base md:text-lg">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-white/60 text-xs font-light mt-1">
                                        {edu.stream || 'Academic Program'}
                                    </p>
                                </div>
                                <div className="text-right md:self-center">
                                    <span className="text-white/45 text-xs font-mono uppercase tracking-wider block">
                                        {edu.institute}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ── SECTION 6: SERVICES ── */}
            <section
                id="aura-services"
                ref={servicesRef}
                className="py-24 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden theme-aura"
            >
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="aura-title-serif text-3xl md:text-5xl text-white">Services</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left Column: Vertical Timeline */}
                    <div className="lg:col-span-5 flex gap-6 relative">
                        {/* Vertical line drawing container */}
                        <div
                            style={{
                                width: '2px',
                                background: 'rgba(255,255,255,0.05)',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                            className="shrink-0 h-[380px]"
                        >
                            {/* Running scroll-height line */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    width: '100%',
                                    background: 'var(--aura-amber)',
                                    height: `${timelineHeight}%`,
                                    transition: 'height 0.1s ease-out',
                                }}
                            />

                            {/* Node Markers */}
                            {[0, 1, 2, 3].map((nodeIdx) => {
                                const isActive = activeServiceNode === nodeIdx;
                                return (
                                    <div
                                        key={nodeIdx}
                                        style={{
                                            position: 'absolute',
                                            top: `${nodeIdx * 30}%`,
                                            width: '14px',
                                            height: '14px',
                                            borderRadius: '50%',
                                            background: isActive ? 'var(--aura-amber)' : 'rgba(255, 255, 255, 0.15)',
                                            border: '3px solid #050512',
                                            zIndex: 2,
                                            transition: 'all 0.3s'
                                        }}
                                        className={isActive ? 'animate-pulse-glow' : ''}
                                    />
                                );
                            })}
                        </div>

                        {/* Nodes Details List */}
                        <div className="flex flex-col justify-between h-[380px] py-1">
                            {[
                                { title: 'Web Development', desc: 'Crafting ultra-responsive interactive portfolio structures.' },
                                { title: 'Mobile Applications', desc: 'Creating mobile environments with React Native framework.' },
                                { title: 'Custom API Design', desc: 'Developing solid databases and secure REST infrastructures.' },
                                { title: 'UX Animation Solutions', desc: 'Designing immersive interactive experiences and 3D mockups.' }
                            ].map((service, idx) => {
                                const isActive = activeServiceNode === idx;
                                return (
                                    <div
                                        key={idx}
                                        style={{
                                            opacity: isActive ? 1 : 0.4,
                                            transform: `translateX(${isActive ? '10px' : '0px'})`,
                                            transition: 'all 0.4s ease'
                                        }}
                                        className="flex flex-col justify-center"
                                    >
                                        <h4 className="text-white font-medium text-sm md:text-base mb-1">{service.title}</h4>
                                        <p className="text-white/50 text-[11px] md:text-[12px] font-light max-w-xs">{service.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Grid Layout */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                name: 'Application Coding',
                                category: 'React & Frameworks',
                                desc: 'Delivering pixel-perfect coding interfaces utilizing clean components.',
                                icon: <Code size={20} color="var(--aura-purple)" />
                            },
                            {
                                name: 'Mobile Architecture',
                                category: 'Expo & Native Paper',
                                desc: 'Building dynamic and fast android and iOS platforms.',
                                icon: <Smartphone size={20} color="var(--aura-indigo)" />
                            },
                            {
                                name: 'Interface Modeling',
                                category: 'Modern UX & Layouts',
                                desc: 'Delivering polished styling sheets, responsive maps, and interactive glass.',
                                icon: <Layout size={20} color="var(--aura-amber)" />
                            },
                            {
                                name: 'Database Management',
                                category: 'MongoDB & PostgreSQL',
                                desc: 'Optimizing schemas for high performance and clean operations.',
                                icon: <Cpu size={20} color="var(--aura-purple)" />
                            }
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
                                className="p-6 rounded-2xl border border-white/5 relative flex flex-col justify-between select-none"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)'
                                }}
                            >
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                                        {card.icon}
                                    </div>
                                    <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block mb-2">
                                        {card.category}
                                    </span>
                                    <h3 className="text-white font-semibold text-base mb-2">
                                        {card.name}
                                    </h3>
                                    <p className="text-white/50 text-[12px] font-light leading-relaxed">
                                        {card.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectsTheme7;
