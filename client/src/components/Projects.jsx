// import React from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight } from 'lucide-react';

// function Projects({ isDark }) {
//   const projects = [
//     {
//       title: "E-Commerce Platform",
//       description: "A full-stack e-commerce solution with real-time inventory management",
//       image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
//       tech: ["React", "Node.js", "PostgreSQL"]
//     },
//     {
//       title: "AI Content Generator",
//       description: "An AI-powered platform for generating marketing content",
//       image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
//       tech: ["Python", "TensorFlow", "React"]
//     },
//     {
//       title: "Financial Dashboard",
//       description: "Real-time financial data visualization platform",
//       image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=800",
//       tech: ["React", "D3.js", "Firebase"]
//     }
//   ];

//   return (
//     <section id="projects" className="py-32 bg-transparent">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8">
//         <motion.h2
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className={`text-3xl md:text-5xl font-bold mb-20 text-center bg-clip-text ${isDark ? "bg-gradient-to-r from-pink-500 to-violet-500 text-transparent" : "bg-gradient-to-r from-cyan-300 to-pink-300 text-transparent"}`}
//         >
//           ✨ Featured Projects ✨
//         </motion.h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {projects.map((project, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
//               viewport={{ once: true }}
//               className={`rounded-xl border border-transparent hover:border-purple-500 shadow-lg transition-all duration-300 group relative overflow-hidden ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'} hover:shadow-[0_0_20px_#a855f7]`}
//             >
//               <div className="relative">
//                 <img src={project.image} alt={project.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
//               </div>

//               <div className="p-6 z-20 relative">
//                 <h3 className={`mb-4 text-xl font-semibold ${isDark ? "text-white neon-text" : "bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text"}`}>{project.title} </h3>
//                 <p p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{project.description}</p>

//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.tech.map((tech, i) => (
//                     <span
//                       key={i}
//                       className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-full text-sm"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.05, x: 5 }}
//                   className="flex items-center text-purple-400 hover:text-pink-400 transition-colors font-medium"
//                 >
//                   View Project <ChevronRight size={18} className="ml-1" />
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Custom Glow Styles */}
//       <style jsx>{`
//         .neon-text {
//           text-shadow: 0 0 5px #f0f, 0 0 10px #c0f, 0 0 20px #a0f;
//         }
//       `}</style>
//     </section >
//   );
// }

// export default Projects;






import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

function Projects({ isDark }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
    }
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
      tech: ["React", "Node.js", "PostgreSQL"]
    },
    {
      title: "AI Content Generator",
      description: "An AI-powered platform for generating marketing content",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      tech: ["Python", "TensorFlow", "React"]
    },
    {
      title: "Financial Dashboard",
      description: "Real-time financial data visualization platform",
      image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=800",
      tech: ["React", "D3.js", "Firebase"]
    }
  ];

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
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
              className={`min-w-[320px] max-w-sm rounded-xl border border-transparent hover:border-purple-500 shadow-lg transition-all duration-300 group relative overflow-hidden ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'} hover:shadow-[0_0_20px_#a855f7]`}
            >
              <div className="relative">
                <img src={project.image} alt={project.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              </div>

              <div className="p-6 z-20 relative">
                <h3 className={`mb-4 text-xl font-semibold ${isDark ? "text-white neon-text" : "bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text"}`}>{project.title}</h3>
                <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
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
          ))}
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
