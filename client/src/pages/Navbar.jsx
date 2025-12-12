import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Layout } from 'lucide-react';
import Resume from '../../src/assets/Bhagwan_Gire-Resume.pdf'

const Navbar = ({ isDark, setIsDark, LayoutChanage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navLinks = ['home', 'projects', 'contact'];

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isDark ? 'bg-black/40 backdrop-blur-md' : 'bg-white/60 backdrop-blur-md'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="text-3xl cursor-pointer font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                        BHAGWAN GIRE
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className="text-sm uppercase tracking-wider hover:text-purple-600 transition-colors"
                            >
                                {section}
                            </button>
                        ))}

                        <a
                            href={Resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm uppercase tracking-wider px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:from-pink-600 hover:to-purple-500 transition-all"
                        >
                            Resume
                        </a>

                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-full bg-purple-600/10 hover:bg-purple-600/20 transition-colors"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="relative">
                            <button
                                className="p-1 hover:text-violet-500"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <Layout size={25} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => { LayoutChanage("Layout1"); setIsDropdownOpen(false); }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-sans"
                                    >
                                        Theme 1 (Professional)
                                    </button>
                                    <button
                                        onClick={() => { LayoutChanage("Layout2"); setIsDropdownOpen(false); }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-sans"
                                    >
                                        Theme 2 (Gradient)
                                    </button>
                                    <button
                                        onClick={() => { LayoutChanage("Layout3"); setIsDropdownOpen(false); }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-mono"
                                    >
                                        Theme 3 (Hacker)
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[500px] pb-6' : 'max-h-0'
                    } ${isDark ? 'bg-black/80 text-white' : 'bg-white/90 text-black'} backdrop-blur-lg`}
            >
                <div className="px-6 pt-4 space-y-4">
                    {navLinks.map((section) => (
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
                        className="block text-center text-sm uppercase tracking-wider px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:from-pink-600 hover:to-purple-500 transition-all"
                    >
                        Resume
                    </a>

                    <div className="flex flex-col space-y-4 items-center justify-center pt-2">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-full bg-purple-600/10 hover:bg-purple-600/20 transition-colors"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="w-full border-t border-gray-500/30 pt-4 mt-2">
                            <p className="text-xs text-center mb-2 opacity-50 uppercase">Switch Theme</p>
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={() => LayoutChanage("Layout1")}
                                    className="block w-full text-center px-4 py-2 text-sm hover:bg-gray-100/10 rounded"
                                >
                                    Theme 1 (Professional)
                                </button>
                                <button
                                    onClick={() => LayoutChanage("Layout2")}
                                    className="block w-full text-center px-4 py-2 text-sm hover:bg-gray-100/10 rounded"
                                >
                                    Theme 2 (Gradient)
                                </button>
                                <button
                                    onClick={() => LayoutChanage("Layout3")}
                                    className="block w-full text-center px-4 py-2 text-sm hover:bg-gray-100/10 rounded font-mono"
                                >
                                    Theme 3 (Hacker)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500" />
        </nav>
    );
};

export default Navbar;






// import React, { useState } from 'react';
// import { Menu, X, Sun, Moon, Layout } from 'lucide-react';

// const Navbar = ({ isDark, setIsDark, LayoutChanage }) => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const closeMenu = () => setIsMenuOpen(false);

//     const scrollToSection = (id) => {
//         const el = document.getElementById(id);
//         if (el) {
//             el.scrollIntoView({ behavior: 'smooth' });
//             closeMenu();
//         }
//     };

//     return (
//         <nav className={`fixed w-full z-50 transition-all duration-300 ${isDark ? 'bg-black/40 backdrop-blur-md' : 'bg-white/60 backdrop-blur-md'}`}>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-20">
//                     <div className="text-3xl cursor-pointer font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
//                         BHAGWAN GIRE
//                     </div>

//                     {/* Desktop Nav */}
//                     <div className="hidden md:flex items-center space-x-8">
//                         {['home', 'projects', 'contact'].map((section) => (
//                             <button
//                                 key={section}
//                                 onClick={() => scrollToSection(section)}
//                                 className="text-sm cursor-pointer uppercase tracking-wider hover:text-purple-600 transition-colors"
//                             >
//                                 {section}
//                             </button>
//                         ))}
//                         <a
//                             href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-sm uppercase cursor-pointer tracking-wider px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:from-pink-600 hover:to-purple-500 transition-all"
//                         >
//                             Resume
//                         </a>
//                         <button
//                             onClick={() => setIsDark(!isDark)}
//                             className="p-2 cursor-pointer rounded-full bg-purple-600/10 hover:bg-purple-600/20 transition-colors"
//                         >
//                             {isDark ? <Sun size={20} /> : <Moon size={20} />}
//                         </button>
//                         <button
//                             className={`cursor-pointer ${isDark ? "hover:text-violet-500 p-1  " : "hover:text-violet-500 p-1 "}`}
//                             onClick={() => LayoutChanage("Layout1")} >
//                             <Layout size={25} />
//                         </button>
//                     </div>

//                     {/* Mobile Buttons */}
//                     <div className="md:hidden flex items-center space-x-4">
//                         <button
//                             onClick={() => setIsDark(!isDark)}
//                             className="p-2 rounded-full bg-purple-600/10 hover:bg-purple-600/20 transition-colors"
//                         >
//                             {isDark ? <Sun size={20} /> : <Moon size={20} />}
//                         </button>
//                         <button
//                             onClick={() => setIsMenuOpen(!isMenuOpen)}
//                             className="hover:text-purple-600 transition-colors"
//                         >
//                             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Dropdown */}
//             {
//                 isMenuOpen && (
//                     <div className={`md:hidden px-6 pb-4 pt-2 space-y-3 ${isDark ? 'bg-black/80 text-white' : 'bg-white/90 text-black'} backdrop-blur-lg`}>
//                         {['home', 'projects', 'contact'].map((section) => (
//                             <button
//                                 key={section}
//                                 onClick={() => scrollToSection(section)}
//                                 className="block w-full text-left text-sm uppercase tracking-wider hover:text-purple-600 transition-colors"
//                             >
//                                 {section}
//                             </button>
//                         ))}
//                         <a
//                             href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="block w-full text-sm uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-500 text-center rounded-full px-4 py-2 hover:from-pink-600 hover:to-purple-500 transition-all"
//                         >
//                             Resume
//                         </a>
//                     </div>
//                 )
//             }

//             {/* Bottom Gradient Line */}
//             <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500"></div>
//         </nav >
//     );
// };

// export default Navbar;