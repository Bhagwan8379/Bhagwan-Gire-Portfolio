import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './Theme7.css';

// 3D Glass Cube helper
const GlassCube3D = ({ size = 50, speed = 15, x = 0, y = 0, rot = { x: 0, y: 0, z: 0 } }) => {
    return (
        <div
            style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                perspective: '800px',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <div
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) rotateZ(${rot.z}deg)`,
                    animation: `rotate-cube-3d ${speed}s linear infinite`,
                    position: 'relative',
                }}
            >
                {[
                    { transform: `rotateY(0deg) translateZ(${size / 2}px)` },
                    { transform: `rotateY(180deg) translateZ(${size / 2}px)` },
                    { transform: `rotateY(90deg) translateZ(${size / 2}px)` },
                    { transform: `rotateY(-90deg) translateZ(${size / 2}px)` },
                    { transform: `rotateX(90deg) translateZ(${size / 2}px)` },
                    { transform: `rotateX(-90deg) translateZ(${size / 2}px)` },
                ].map((face, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                            boxShadow: 'inset 0 0 10px rgba(255,255,255,0.05)',
                            borderRadius: '4px',
                            ...face,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

const AboutTheme7 = () => {
    const [progressVals, setProgressVals] = useState({
        react: [85, 90, 80],
        node: [80, 85, 75],
        db: [75, 80, 70],
        ui: [90, 95, 85]
    });
    const [activeSection, setActiveSection] = useState('aura-hero');

    useEffect(() => {
        const sections = ['aura-hero', 'aura-about', 'aura-projects', 'aura-services', 'aura-contact'];
        
        const handleScroll = () => {
            let currentSection = 'aura-hero';
            for (const sectionId of sections) {
                const el = document.getElementById(sectionId);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2) {
                        currentSection = sectionId;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const resetProgress = () => {
        setProgressVals({
            react: [0, 0, 0],
            node: [0, 0, 0],
            db: [0, 0, 0],
            ui: [0, 0, 0]
        });
        setTimeout(() => {
            setProgressVals({
                react: [85, 90, 80],
                node: [80, 85, 75],
                db: [75, 80, 70],
                ui: [90, 95, 85]
            });
        }, 150);
    };

    const scrollToContact = () => {
        const el = document.getElementById('aura-contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{ background: 'var(--aura-bg-navy)' }} className="relative">
            {/* ── SECTION 2: ABOUT ── */}
            <section
                id="aura-about"
                className="relative py-24 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden theme-aura"
            >
                {/* Side Dotted Section Divider */}
                <div 
                    className="absolute left-4 top-1/4 bottom-1/4 hidden lg:flex flex-col items-center opacity-20"
                    style={{ pointerEvents: 'none' }}
                >
                    <div style={{ width: '1px', borderLeft: '2px dashed rgba(255,255,255,0.4)', height: '100%' }} />
                </div>

                {/* Right Side Vertical Indicators */}
                <div 
                    className="fixed right-6 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-3 z-50"
                    style={{ pointerEvents: 'auto' }}
                >
                    {[
                        { id: 'aura-hero' },
                        { id: 'aura-about' },
                        { id: 'aura-projects' },
                        { id: 'aura-services' },
                        { id: 'aura-contact' }
                    ].map((section, idx) => {
                        const isActive = activeSection === section.id;
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    const el = document.getElementById(section.id);
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: isActive ? 'var(--aura-amber)' : 'rgba(255,255,255,0.2)',
                                    boxShadow: isActive ? '0 0 8px var(--aura-amber)' : 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    padding: 0
                                }}
                                className="hover:bg-white hover:scale-125"
                            />
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    {/* Left Column (Slide from Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="md:col-span-7 flex flex-col gap-6"
                    >
                        <h2 className="aura-title-serif text-4xl md:text-5xl text-white">About</h2>
                        <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
                            Hi, I’m Bhagwan Babasaheb Gire from Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. I completed my Bachelor’s in Computer Science from Dr. Babasaheb Ambedkar Marathwada University.
                        </p>
                        <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
                            I’m a Full Stack Developer with skills in HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, and tools like Git and GitHub. I also use Bootstrap, Tailwind CSS, React Native, Expo, and React Native Paper for web and mobile app development.
                        </p>
                        
                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={scrollToContact}
                                className="relative flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white"
                                style={{
                                    background: 'linear-gradient(to right, var(--aura-purple), var(--aura-indigo))',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Book Now
                            </button>
                            <button
                                onClick={() => {
                                    const el = document.getElementById('aura-projects');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white/80 bg-transparent border border-white/20 hover:border-white hover:text-white"
                                style={{
                                    cursor: 'pointer',
                                    transition: 'var(--aura-transition)',
                                }}
                            >
                                More
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Column (Slide from Right & Glassmorphism Cubes Card) */}
                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="md:col-span-5 flex justify-center"
                    >
                        <div
                            className="relative w-full max-w-[340px] aspect-[4/5] border border-white/10 rounded-2xl overflow-hidden"
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.03)'
                            }}
                        >
                            {/* Glassmorphic reflections */}
                            <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                            {/* 4 Floating Crystal Glass Cubes */}
                            <GlassCube3D size={50} speed={16} x={30} y={30} rot={{ x: 20, y: 35, z: 10 }} />
                            <GlassCube3D size={75} speed={25} x={70} y={45} rot={{ x: 45, y: -20, z: 15 }} />
                            <GlassCube3D size={40} speed={12} x={25} y={75} rot={{ x: -10, y: 15, z: 45 }} />
                            <GlassCube3D size={60} speed={20} x={65} y={78} rot={{ x: 15, y: 45, z: -30 }} />
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ── SECTION 3: SKILLS ── */}
            <section
                id="aura-skills"
                className="py-24 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden theme-aura"
            >
                <div className="flex items-center mb-12">
                    <h2 className="aura-title-serif text-3xl md:text-4xl text-white">Skills</h2>
                </div>

                {/* Stagger Slide-Up Horizontal Scrollable cards */}
                <div 
                    className="flex gap-6 overflow-x-auto pb-8 aura-hide-scrollbar snap-x"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {[
                        {
                            name: 'Frontend Development',
                            key: 'react',
                            skills: ['React.js & Redux', 'HTML5 & Vanilla CSS', 'Tailwind CSS & Boot'],
                            color: 'from-blue-500 to-indigo-600'
                        },
                        {
                            name: 'Mobile App Development',
                            key: 'ui',
                            skills: ['React Native & Expo', 'Paper UI Components', 'Responsive Styling'],
                            color: 'from-purple-500 to-pink-600'
                        },
                        {
                            name: 'Backend & APIs',
                            key: 'node',
                            skills: ['Node.js & Express.js', 'RESTful API Services', 'Authentication (JWT)'],
                            color: 'from-indigo-500 to-purple-600'
                        },
                        {
                            name: 'Database & Tools',
                            key: 'db',
                            skills: ['MongoDB & Mongoose', 'Git, GitHub & Vercel', 'System Architecture'],
                            color: 'from-pink-500 to-rose-600'
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                            className="shrink-0 w-[280px] md:w-[320px] p-6 rounded-2xl aura-glass-card snap-start select-none border border-white/5"
                        >
                            {/* Hexagon 3D gradient icon */}
                            <div className="w-12 h-12 flex items-center justify-center mb-6 relative">
                                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                                    <defs>
                                        <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="var(--aura-purple)" />
                                            <stop offset="100%" stopColor="var(--aura-indigo)" />
                                        </linearGradient>
                                    </defs>
                                    <polygon
                                        points="50,5 93,30 93,80 50,98 7,80 7,30"
                                        fill={`url(#grad-${index})`}
                                    />
                                    <polygon
                                        points="50,15 83,35 83,75 50,90 17,75 17,35"
                                        fill="#050512"
                                        opacity="0.8"
                                    />
                                </svg>
                                <span className="absolute text-white font-bold text-xs">{index + 1}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-white font-semibold text-lg mb-6">{item.name}</h3>

                            {/* Progress Bars */}
                            <div className="flex flex-col gap-4">
                                {item.skills.map((skill, subIdx) => {
                                    const percent = progressVals[item.key][subIdx] || 0;
                                    return (
                                        <div key={subIdx} className="flex flex-col gap-1.5">
                                            <div className="flex justify-between text-[11px] text-white/50">
                                                <span>{skill}</span>
                                                <span className="font-mono">{percent}%</span>
                                            </div>
                                            {/* Progress Track */}
                                            <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: `${percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutTheme7;
