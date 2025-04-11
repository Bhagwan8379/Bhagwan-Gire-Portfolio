import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ isDark, setIsDark }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            closeMenu();
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isDark ? 'bg-black/40 backdrop-blur-md' : 'bg-white/60 backdrop-blur-md'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="text-3xl cursor-pointer font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                        BHAGWAN GIRE
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['home', 'projects', 'contact'].map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className="text-sm uppercase tracking-wider hover:text-purple-600 transition-colors"
                            >
                                {section}
                            </button>
                        ))}
                        <a
                            href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm uppercase cursor-pointer tracking-wider px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:from-pink-600 hover:to-purple-500 transition-all"
                        >
                            Resume
                        </a>
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 cursor-pointer rounded-full bg-purple-600/10 hover:bg-purple-600/20 transition-colors"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Buttons */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-full bg-purple-600/10 hover:bg-purple-600/20 transition-colors"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="hover:text-purple-600 transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
                <div className={`md:hidden px-6 pb-4 pt-2 space-y-3 ${isDark ? 'bg-black/80 text-white' : 'bg-white/90 text-black'} backdrop-blur-lg`}>
                    {['home', 'projects', 'contact'].map((section) => (
                        <button
                            key={section}
                            onClick={() => scrollToSection(section)}
                            className="block w-full text-left text-sm uppercase tracking-wider hover:text-purple-600 transition-colors"
                        >
                            {section}
                        </button>
                    ))}
                    <a
                        href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-sm uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-500 text-center rounded-full px-4 py-2 hover:from-pink-600 hover:to-purple-500 transition-all"
                    >
                        Resume
                    </a>
                </div>
            )}

            {/* Bottom Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500"></div>
        </nav>
    );
};

export default Navbar;
