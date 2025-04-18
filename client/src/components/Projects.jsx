import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useGetAllProjectsQuery } from '../redux/api/projectsApi';
import { toast } from 'sonner';

function Projects({ isDark }) {
  const { data, isLoading, isError, error } = useGetAllProjectsQuery();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("❌ Something went wrong!", {
        duration: 1000,
        style: {
          background: 'linear-gradient(to right, #e52d27, #b31217)', // rich red gradient
          color: '#ffffff',
          borderRadius: '12px',
          padding: '14px 24px',
          fontWeight: 'bold',
          fontSize: '16px',
          boxShadow: '0 6px 16px rgba(229, 45, 39, 0.4)', // soft red glow
          border: '1px solid #e52d27',
          animation: 'fadeInUp 0.6s ease-out',
        },
      });
      console.error(error); // Log error to console for better debugging
    }
  }, [isError, error]);

  return (
    <section id="projects" className="py-32 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-5xl font-bold mb-20 text-center bg-clip-text ${isDark ? "bg-gradient-to-r from-pink-500 to-violet-500 text-transparent" : "bg-gradient-to-r from-cyan-400 to-pink-400 text-transparent"}`}
        >
          ✨ Featured Projects ✨
        </motion.h2>

        {/* Error Display */}
        {isError && <div className="text-red-500">Error: {JSON.stringify(error, null, 2)}</div>}

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/10 hover:bg-purple-500/30 backdrop-blur-md rounded-full text-purple-400 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/10 hover:bg-purple-500/30 backdrop-blur-md rounded-full text-purple-400 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={28} />
        </button>

        {/* Scrollable Grid */}
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto scroll-smooth no-scrollbar pb-2"
        >
          {data && data.length > 0 ? (
            data.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
                className={`min-w-[320px] max-w-sm rounded-xl border border-transparent hover:border-purple-500 shadow-lg transition-all duration-300 group relative overflow-hidden ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'} hover:shadow-[0_0_20px_#a855f7]`}
              >
                <div className="relative">
                  <img src={project.hero} alt={project.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                </div>

                <div className="p-6 z-20 relative">
                  <h3 className={`mb-4 text-xl font-semibold ${isDark ? "text-white neon-text" : "bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text"}`}>{project.name}</h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{project.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technology.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center text-purple-400 hover:text-pink-400 transition-colors font-medium"
                  >
                    View Project <ChevronRight size={18} className="ml-1" />
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">No projects available.</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 5px #f0f, 0 0 10px #c0f, 0 0 20px #a0f;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default Projects;


