import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ isDark }) => {

    // Color schemes
    const colors = isDark ? {
        bg: 'bg-gray-900',
        text: 'text-gray-100',
        accent: 'text-purple-400',
        button: 'bg-purple-600 hover:bg-purple-700',
        card: 'bg-gray-800',
        stat: 'bg-gray-700 text-purple-300'
    } : {
        bg: 'bg-gray-50',
        text: 'text-gray-900',
        accent: 'text-blue-600',
        button: 'bg-blue-500 hover:bg-blue-600',
        card: 'bg-white',
        stat: 'bg-blue-100 text-blue-800'
    };





    return (
        <div className={`min-h-screen ${colors.bg} ${colors.text} transition-colors duration-300`}>
            {/* Hero Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 space-y-8">
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold leading-tight"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={colors.accent}>Fullstack</span> Web & Mobile App Developer
                        </motion.h1>

                        <motion.p
                            className="text-xl opacity-90 max-w-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Building decentralized applications and digital experiences that push boundaries
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <a
                                href="https://leetcode.com/u/Bhagwan8379/"
                                className={`px-6 py-3 rounded-lg ${colors.button} text-white font-medium`}
                            >
                                LeetCode
                            </a>
                            <a
                                href="https://www.linkedin.com/in/bhagwan-gire-84013a293/"
                                className={`px-6 py-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-200'} font-medium`}
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/Bhagwan8379"
                                className={`px-6 py-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-200'} font-medium`}
                            >
                                GitHub
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        className="lg:w-1/2 relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className={`p-1 rounded-2xl ${isDark ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} bg-opacity-30`}>
                            <div className="rounded-xl overflow-hidden border-2 border-white border-opacity-10">
                                <img
                                    src="https://i.pinimg.com/736x/32/f4/d6/32f4d6f4e6da23d03fb10c8ee1658fa2.jpg"
                                    alt="NFT Development"
                                    className="w-full h-96"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>





        </div>
    );
};

export default Hero;