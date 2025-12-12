import React from 'react';
import { useGetAllProjectsQuery } from '../redux/api/projectsApi';
import { ExternalLink, Folder } from 'lucide-react';

const Projects = () => {
    const { data: projects = [], isLoading, isError } = useGetAllProjectsQuery();

    if (isLoading) return <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center animate-pulse">ACCESSING ARCHIVES...</div>;
    if (isError) return <div className="min-h-screen bg-black text-red-500 font-mono flex items-center justify-center">FATAL ERROR: DATABASE_CORRUPT</div>;

    return (
        <section id="projects" className="min-h-screen bg-black text-green-500 font-mono py-20 px-4 border-t border-green-900/30">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 border-b border-green-500/50 pb-4">
                    <h2 className="text-3xl font-bold uppercase tracking-wider">
                        <span className="animate-pulse mr-2">{'>'}</span> PROJECT_DIRECTORY
                    </h2>
                    <p className="text-sm text-green-700 mt-2">TOTAL_RECORDS_FOUND: {projects.length}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div key={project._id} className="group border border-green-900 bg-black hover:border-green-500 hover:bg-green-900/10 transition-all duration-300 p-4 flex flex-col h-full relative overflow-hidden">
                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            {/* Project Header */}
                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-green-900 group-hover:border-green-500/50">
                                <div className="flex items-center space-x-2">
                                    <Folder size={16} />
                                    <span className="text-xs font-bold uppercase truncate max-w-[150px]">
                                        PRJ_{index + 1}_{project.name.replace(/\s+/g, '_').toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-[10px] bg-green-900/30 px-1 text-green-400">READ_ONLY</span>
                            </div>

                            {/* Image Visual with Overlay */}
                            <div className="relative mb-4 overflow-hidden border border-green-900/50 h-40">
                                <div className="absolute inset-0 bg-green-500/20 mix-blend-overlay z-10 opacity-50 group-hover:opacity-0 transition-opacity"></div>
                                <img
                                    src={project.hero}
                                    alt={project.name}
                                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                                />
                                {/* Scanline for image */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-full w-full pointer-events-none animate-scan opacity-30"></div>
                            </div>

                            <p className="text-xs text-green-400 mb-4 flex-grow font-light leading-relaxed">
                                {'>'} {project.desc}
                            </p>

                            <div className="mb-4">
                                <div className="text-[10px] text-green-700 mb-1">DEPENDENCIES:</div>
                                <div className="flex flex-wrap gap-1">
                                    {project.technology.map((tech, i) => (
                                        <span key={i} className="text-[10px] border border-green-800 px-1 text-green-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => window.open(project.onlineLink, '_blank')}
                                className="mt-auto w-full py-2 border border-green-700 bg-green-900/20 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all text-xs font-bold uppercase flex items-center justify-center space-x-2 group/btn"
                            >
                                <span>Execute Project</span>
                                <ExternalLink size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
