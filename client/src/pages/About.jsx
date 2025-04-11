// import React from "react";
// import { motion } from "framer-motion";

// const About = ({ isDark }) => {
//     const educationData = [
//         {
//             degree: "Bachelor of Technology",
//             major: "Computer Science & Engineering",
//             institution: "ABC Institute of Technology",
//             year: "2021 - 2025",
//         },
//         {
//             degree: "Higher Secondary Education",
//             major: "Science Stream",
//             institution: "XYZ Senior Secondary School",
//             year: "2019 - 2021",
//         },
//     ];

//     return (
//         <section id="about" className="py-24">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* About Me */}
//                 <motion.h2
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     viewport={{ once: true }}
//                     className="text-center text-4xl md:text-5xl font-extrabold mb-12 bg-gradient-to-r from-pink-500 to-yellow-300 text-transparent bg-clip-text tracking-wide"
//                 >
//                     👋 About Me
//                 </motion.h2>

//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ duration: 0.8 }}
//                     viewport={{ once: true }}
//                     className={`text-lg leading-relaxed mb-20 ${isDark ? "text-gray-300" : "text-gray-700"
//                         }`}
//                 >
//                     <p className="mb-4">
//                         I'm a passionate full-stack developer with a love for building beautiful,
//                         responsive, and meaningful user experiences. My journey started with a
//                         curiosity about how websites work and turned into a full-blown obsession
//                         with creating scalable applications.
//                     </p>
//                     <p className="mb-4">
//                         With a strong foundation in both frontend and backend development, I enjoy
//                         working with modern tech stacks like React, Node.js, and MongoDB.
//                         Recently, I’ve been diving into performance optimization, serverless
//                         architecture, and UI animations using Framer Motion.
//                     </p>
//                     <p>
//                         Outside of coding, I enjoy sketching, exploring new tech trends, listening
//                         to EDM, and collaborating on creative projects.
//                     </p>
//                 </motion.div>

//                 {/* Education */}
//                 <motion.h3
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     viewport={{ once: true }}
//                     className="text-3xl font-bold mb-10 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-transparent bg-clip-text"
//                 >
//                     🎓 Education Timeline
//                 </motion.h3>

//                 <div className="space-y-10">
//                     {educationData.map((edu, idx) => (
//                         <motion.div
//                             key={idx}
//                             initial={{ opacity: 0, x: -20 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ delay: idx * 0.2 }}
//                             viewport={{ once: true }}
//                             className={`relative pl-6 border-l-4 ${isDark ? "border-purple-600" : "border-pink-500"
//                                 }`}
//                         >
//                             <div className="mb-1 text-sm font-medium text-gray-400">{edu.year}</div>
//                             <h4
//                                 className={`text-xl font-bold mb-1 ${isDark
//                                     ? "text-white"
//                                     : "bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text"
//                                     }`}
//                             >
//                                 {edu.degree}
//                             </h4>
//                             <p className={`text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}>
//                                 {edu.major} – <span className="font-semibold">{edu.institution}</span>
//                             </p>
//                         </motion.div>
//                     ))}
//                 </div>

//                 {/* Extras */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.3 }}
//                     viewport={{ once: true }}
//                     className="mt-20"
//                 >
//                     <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
//                         🛠 Skills & Interests
//                     </h3>
//                     <ul
//                         className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${isDark ? "text-gray-300" : "text-gray-700"
//                             }`}
//                     >
//                         <li>⚛️ React & React Native</li>
//                         <li>🧠 Problem Solving</li>
//                         <li>🌐 RESTful APIs & Express.js</li>
//                         <li>📦 MongoDB & PostgreSQL</li>
//                         <li>🎨 UI/UX & Framer Motion</li>
//                         <li>🚀 Deployment (Vercel, Render)</li>
//                     </ul>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default About;







import React from "react";
import { motion } from "framer-motion";

const About = ({ isDark }) => {
    const educationData = [
        {
            degree: "Bachelor of Computer Science",
            major: "Computer Science & Engineering",
            institution: "Dr.Babasaheb Ambedkar Marathwada University Chhatrapati Sambhajinagar",
            year: "2021 - 2025",
        },
        {
            degree: "Higher Secondary Education",
            major: "Science Stream",
            institution: "Raje Shahaji Junior College Sultanpur",
            year: "2020 - 2022",
        },
    ];

    return (
        <section id="about" className="py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-pink-700 to-blue-400 text-transparent bg-clip-text"
                >
                    👋 About Me
                </motion.h2>

                {/* Profile + About Text */}
                <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
                    {/* Profile Image - hidden on mobile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="shrink-0 hidden md:block"
                    >
                        <div className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl border-4 border-transparent bg-gradient-to-tr from-pink-500 to-purple-600 p-1 shadow-lg">
                            <img
                                src="https://res.cloudinary.com/dmolheokh/image/upload/v1744097393/Bhagwan_au3zhm.jpg"
                                alt="Profile"
                                className="w-full hover:scale-150 h-full rounded-2xl object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* About Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"
                            }`}
                    >
                        <p className="mb-4">
                            I'm a passionate full-stack developer with a love for building beautiful,
                            responsive, and meaningful user experiences. My journey started with a
                            curiosity about how websites work and turned into a full-blown obsession
                            with creating scalable applications.
                        </p>
                        <p className="mb-4">
                            With a strong foundation in both frontend and backend development, I enjoy
                            working with modern tech stacks like React, Node.js, and MongoDB.
                            Recently, I’ve been diving into performance optimization, serverless
                            architecture, and UI animations using Framer Motion.
                        </p>
                        <p>
                            Outside of coding, I enjoy sketching, exploring new tech trends, listening
                            to EDM, and collaborating on creative projects.
                        </p>
                    </motion.div>
                </div>

                {/* Education Timeline */}
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-10 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-transparent bg-clip-text"
                >
                    🎓 Education Timeline
                </motion.h3>

                <div className="space-y-10">
                    {educationData.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className={`relative pl-6 border-l-4 ${isDark ? "border-purple-600" : "border-pink-500"
                                }`}
                        >
                            <div className="mb-1 text-sm font-medium text-gray-400">{edu.year}</div>
                            <h4
                                className={`text-xl font-bold mb-1 ${isDark
                                    ? "text-white"
                                    : "bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text"
                                    }`}
                            >
                                {edu.degree}
                            </h4>
                            <p className={`text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                {edu.major} – <span className="font-semibold">{edu.institution}</span>
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Skills & Interests */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
                        🛠 Skills & Interests
                    </h3>
                    <ul
                        className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${isDark ? "text-gray-300" : "text-gray-700"
                            }`}
                    >
                        <li>⚛️ React & React Native</li>
                        <li>🧠 Problem Solving</li>
                        <li>🌐 RESTful APIs & Express.js</li>
                        <li>📦 MongoDB & PostgreSQL</li>
                        <li>🎨 UI/UX & Framer Motion</li>
                        <li>🚀 Deployment (Vercel, Render)</li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
