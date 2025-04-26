import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useGetAllEducationQuery } from "../redux/api/educationApi";
import { toast } from "sonner";

const About = ({ isDark }) => {
    const { data: educationData, isError, error } = useGetAllEducationQuery()

    useEffect(() => {
        if (isError) {
            toast.error("Something Wrong (Education)")
        }
    }, [isError]);
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

                {isError && JSON.stringify(error, null, 2)}

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
                        <p className="mb-4" >
                            Hi, I’m Bhagwan Babasaheb Gire from Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. I completed my Bachelor’s in Computer Science from Dr. Babasaheb Ambedkar Marathwada University.
                        </p>
                        <p className="mb-4">
                            I’m a Full Stack Developer with skills in HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, and tools like Git and GitHub. I also use Bootstrap, Tailwind CSS, React Native, Expo, and React Native Paper for web and mobile app development.
                        </p>
                        <p>
                            I have completed a 6-month internship at Matic UI as a Full Stack Developer, where I worked on real-world projects and improved my coding and teamwork skills.

                            In my free time, I enjoy reading books, traveling, photography, and learning about new technologies.
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
                    🎓 Education
                </motion.h3>

                <div className="space-y-10">
                    {educationData && educationData.result.map((edu, idx) => (
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
                                {edu.major}<span className="font-semibold">{edu.stream}</span>
                            </p>
                            <p className={`text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                {edu.major}– <span className="font-semibold">{edu.institute}</span>
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
                        🛠 Skills
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




