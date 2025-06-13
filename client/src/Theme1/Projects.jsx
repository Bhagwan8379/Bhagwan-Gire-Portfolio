import React, { useState, useEffect, useRef } from 'react';
import { useGetAllProjectsQuery } from '../redux/api/projectsApi';

const Projects = ({ isDark }) => {
    const { data: projects = [], isLoading, isError } = useGetAllProjectsQuery();
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const intervalRef = useRef(null);

    const colors = isDark ? {
        bg: 'bg-gradient-to-br from-black-200 via-black-200 to-black-200',
        text: 'text-gray-100',
        accent: 'text-violet-400',
        card: 'bg-gray-800/80 backdrop-blur-sm border border-purple-500/30',
        button: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700',
        tech: 'bg-gray-700/50 text-pink-300 border border-pink-500/20',
        dotActive: 'bg-gradient-to-r from-pink-500 to-purple-600 w-6',
        dotInactive: 'bg-gray-600 w-3'
    } : {
        bg: 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50',
        text: 'text-gray-900',
        accent: 'text-blue-600',
        card: 'bg-white/80 backdrop-blur-sm border border-blue-600',
        button: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
        tech: 'bg-blue-100/80 text-blue-800 border border-blue-300',
        dotActive: 'bg-gradient-to-r from-blue-500 to-purple-600 w-6',
        dotInactive: 'bg-gray-300 w-3'
    };

    useEffect(() => {
        const startCarousel = () => {
            intervalRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % projects.length);
            }, 4000)
        };

        if (projects.length > 0) {
            startCarousel();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [projects.length]);

    useEffect(() => {
        if (carouselRef.current && projects.length > 0) {
            const projectWidth = carouselRef.current.children[0]?.offsetWidth || 0;
            carouselRef.current.scrollTo({
                left: currentIndex * projectWidth,
                behavior: 'smooth'
            });
        }
    }, [currentIndex, projects.length]);

    const goToProject = (index) => {
        setCurrentIndex(index);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % projects.length);
        }, 2000);
    }

    if (isLoading) return <div className="text-center py-20">Loading projects...</div>;
    if (isError) return <div className="text-center py-20 text-red-500">Error loading projects</div>;
    if (!projects.length) return <div className="text-center py-20">No projects found</div>;

    const openProject = (link) => {
        if (link) {
            window.open(link, '_blank'); // Open in new tab
        }
    };

    return (
        <div className={`${colors.bg} ${colors.text} min-h-screen w-full transition-colors duration-500`}>
            <div className="h-screen w-full flex flex-col justify-center p-4">
                <h1
                    className="text-4xl md:text-5xl font-bold text-center mb-8"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                >
                    My <span className={colors.accent}>Projects</span>
                </h1>

                <div
                    ref={carouselRef}
                    className="flex overflow-x-hidden scroll-snap-x-mandatory scrollbar-hide w-full"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="flex-shrink-0 w-full h-full px-4 scroll-snap-align-start"
                        >
                            <div className={`${colors.card} rounded-xl shadow-2xl h-full flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-lg`}>
                                <div className="md:w-1/2 h-64 md:h-auto relative p-4">
                                    <img
                                        src={project.hero}
                                        alt={project.name}
                                        className="w-full h-full object-cover rounded-2xl border-black border"
                                    />
                                    <div className={`absolute inset-0 ${isDark ? 'border border-white rounded-2xl' : 'rounded-2xl'}`}></div>
                                </div>

                                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                                    <h2
                                        className="text-3xl font-bold mb-4"
                                        style={{ fontFamily: 'Playfair Display, serif' }}
                                    >
                                        Name: {project.name}
                                    </h2>
                                    <p
                                        className="text-lg mb-6 opacity-90"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        Description: {project.desc}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        Technologies :
                                        {project.technology.map((tech, i) => (
                                            <span
                                                key={i}
                                                className={`${colors.tech} px-3 py-1 rounded-full text-sm flex items-center`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => openProject(project.onlineLink)}
                                        className={`${colors.button} text-white px-6 py-3 cursor-pointer rounded-lg font-medium w-full md:w-auto transition-all duration-300 hover:shadow-lg`}
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        View Project →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8 gap-2">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToProject(index)}
                            className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex ? colors.dotActive : colors.dotInactive}`}
                            aria-label={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
