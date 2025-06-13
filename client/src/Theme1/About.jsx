import React, { useEffect, useState } from "react";
import { useGetAllEducationQuery } from "../redux/api/educationApi";
import { toast } from "sonner";


const About = ({ isDark }) => {

    const { data, isError, error } = useGetAllEducationQuery()

    useEffect(() => {
        if (isError) {
            toast.error("Something Wrong (Education)")
        }
    }, [isError]);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800'}`}>
            <div className="container mx-auto px-4 py-16">
                {isError && JSON.stringify(error, null, 2)}
                {/* Main Horizontal Layout */}
                <div className={`flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
                    {/* Left Column - Profile & Image */}
                    <div className={`lg:w-2/5 p-8 flex flex-col items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gradient-to-br from-green-500 to-blue-400'}`}>
                        <div className="relative mb-6">
                            <div className="overflow-hidden border-4 rounded-2xl border-white shadow-xl">
                                <img
                                    src="https://res.cloudinary.com/dmolheokh/image/upload/v1744097393/Bhagwan_au3zhm.jpg"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <h2 className={`text-3xl font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-sky-100'}`}>Bhagwan Gire</h2>
                        <p className={`text-lg mb-6 ${isDark ? 'text-indigo-300' : 'text-blue-100'}`}>Fullstack Web & Mobile App Developer</p>

                        <div className={`w-full max-w-xs p-6 rounded-2xl ${isDark ? 'bg-gray-600' : 'bg-white bg-opacity-20'}`}>
                            <div className="flex items-center mb-4">
                                <svg className={`w-5 h-5 mr-3 ${isDark ? 'text-indigo-400' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className={isDark ? 'text-gray-200' : 'text-black'}>bhagwangire05@gamil.com</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <svg className={`w-5 h-5 mr-3 ${isDark ? 'text-indigo-400' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className={isDark ? 'text-gray-200' : 'text-black'}>+91 839832391</span>
                            </div>
                            <div className="flex items-center">
                                <svg className={`w-5 h-5 mr-3 ${isDark ? 'text-indigo-400' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className={isDark ? 'text-gray-200' : 'text-black'}>Chhatrapati Sambhajinagar (Aurangabad),Maharashtra</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:w-3/5 p-8">
                        {/* About Section */}
                        <div className="mb-10">
                            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-indigo-300' : 'text-blue-700'}`}>About Me</h3>
                            <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Hi, I’m Bhagwan Babasaheb Gire from Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. I completed my Bachelor’s in Computer Science from Dr. Babasaheb Ambedkar Marathwada University.
                                I have completed a 6-month internship at Matic UI as a Full Stack Developer, where I worked on real-world projects and improved my coding and teamwork skills.
                                In my free time, I enjoy reading books, traveling, photography, and learning about new technologies.
                            </p>
                        </div>

                        {/* Education Section */}
                        <div className="mb-10">
                            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-indigo-300' : 'text-blue-700'}`}>Education</h3>
                            <div className="space-y-6">
                                {data && data.map((edu, index) => (
                                    <div key={index} className="flex">
                                        {/* Static icon for all items */}
                                        <div className={`mr-4 flex-shrink-0 ${isDark ? 'text-indigo-400' : 'text-blue-500'}`}>
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13
                                                       C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13
                                                       C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13
                                                       C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{edu.degree}</h4>
                                            <p className={` ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{edu.stream}</p>
                                            <p className={` ${isDark ? 'text-white' : 'text-black'}`}>{edu.institute}</p>
                                            <p className={`${isDark ? 'text-indigo-300' : 'text-blue-600'}`}>{edu.year}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Skills & Interests */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-indigo-300' : 'text-blue-700'}`}>Skills</h3>
                                <div className="space-y-3">
                                    {['JavaScript (ES6+)', 'React.js', 'Node.js', 'React-Native', 'Expo', 'Tailwind css', 'Bootstrap', "Html", "Css", "MongoDB", "Git & GitHub"].map((skill) => (
                                        <div key={skill} className="flex items-center">
                                            <div className={`w-2 h-2 rounded-full mr-3 ${isDark ? 'bg-indigo-400' : 'bg-blue-500'}`}></div>
                                            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-indigo-300' : 'text-blue-700'}`}>Interests</h3>
                                <div className="flex flex-wrap gap-3">
                                    {['Photography', 'Reading', 'Traveling'].map((interest) => (
                                        <span
                                            key={interest}
                                            className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-700 text-indigo-300' : 'bg-blue-100 text-blue-700'}`}
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;