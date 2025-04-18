import React from 'react';
import { Github, Linkedin, Code } from 'lucide-react'; // Icons from lucide-react

const socialLinks = [
    {
        icon: <Github size={24} />,
        label: 'GitHub',
        href: 'https://github.com/Bhagwan8379',
        color: 'hover:text-white hover:bg-black',
    },
    {
        icon: <Linkedin size={24} />,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/bhagwan-gire-84013a293/',
        color: 'hover:text-white hover:bg-blue-600',
    },
    {
        icon: <Code size={24} />,
        label: 'LeetCode',
        href: 'https://leetcode.com/u/Bhagwan8379/',
        color: 'hover:text-black hover:bg-yellow-400',
    },
];

const Hero = ({ isDark }) => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-8 animate-pulse">
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-red-600 text-transparent bg-clip-text">
                        Fullstack Web
                    </h1>
                    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                        Developer
                    </h1>
                </div>
                <p className={`text-xl md:text-2xl mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Full-Stack Developer & Mobile App Developer
                </p>

                <div className="flex justify-center gap-6 animate-fade-in-up">
                    {socialLinks.map(({ icon, label, href, color }, index) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 border-2 border-gray-400 hover:scale-105 ${color}`}
                            style={{ animation: `fadeIn 0.3s ease forwards`, animationDelay: `${index * 0.2}s` }}
                        >
                            {icon}
                            <span className="hidden sm:inline font-medium">{label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;



