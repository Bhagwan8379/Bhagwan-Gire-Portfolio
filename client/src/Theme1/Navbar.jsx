import React, { useState } from "react";
import { Sun, Moon, Layout } from "lucide-react";

const Navbar = ({ isDark, setIsDark, layout, LayoutChanage }) => {
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
        <nav className={`fixed w-full z-50 transition-all duration-300  backdrop-blur-sm lg:backdrop-blur-none ${isDark ? 'border-slate-700/50' : 'border-slate-300'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16 md:h-20">
                    {/* Mobile Menu Button */}
                    <div className="flex justify-around items-center text-2xl gap-10">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`lg:hidden p-2 rounded-md ${isDark ? 'text-white hover:bg-slate-700' : 'text-black hover:bg-slate-200'}`}
                        >
                            {isMenuOpen ? "✕" : "☰"}
                        </button>
                        <p className="text-transparent lg:hidden bg-clip-text bg-gradient-to-r  from-purple-600 via-pink-500 to-teal-400 animate-gradient-x font-bold tracking-tight">
                            BHAGWAN GIRE
                        </p>
                    </div>

                    {/* Desktop Nav */}
                    <div className={`hidden lg:flex items-center space-x-1 rounded-full p-1 border transition-all duration-300 ${isDark ? "bg-slate-800/50 border-slate-600" : "bg-white/80 border-slate-300"}`}>
                        <a
                            onClick={() => scrollToSection('home')}
                            className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md ${isDark ? 'text-white hover:bg-teal-500/20 hover:text-teal-300' : 'text-black hover:bg-teal-900/20 hover:text-teal-700'}`}
                        >
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </span>
                        </a>
                        <a
                            onClick={() => scrollToSection('projects')}
                            className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md ${isDark ? 'text-white hover:bg-amber-500/20 hover:text-amber-300' : 'text-black hover:bg-amber-800/20 hover:text-amber-700'}`}
                        >
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Projects
                            </span>
                        </a>
                        <a
                            onClick={() => scrollToSection('contact')}
                            className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md ${isDark ? 'text-white hover:bg-violet-500/20 hover:text-violet-300' : 'text-black hover:bg-violet-900/20 hover:text-violet-700'}`}
                        >
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                Contact
                            </span>
                        </a>
                        <a
                            href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs md:text-sm uppercase cursor-pointer tracking-wider px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:from-pink-600 hover:to-purple-500 transition-all"
                        >
                            Resume
                        </a>
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-1.5 md:p-2 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-indigo-500/30"
                        >
                            {isDark ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} className="text-indigo-700" />}
                        </button>
                        <button
                            className={`p-1 md:p-1.5 cursor-pointer rounded-full transition-all ${isDark ? "hover:text-indigo-400 hover:bg-violet-500/20" : "hover:text-indigo-600 hover:bg-violet-500/20"}`}
                            onClick={() => LayoutChanage("Layout2")}>
                            <Layout size={20} />
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className={`absolute top-16 left-0 right-0 mx-4 rounded-lg shadow-lg lg:hidden overflow-hidden transition-all duration-300 ${isDark ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-200"}`}>
                            <a
                                onClick={() => scrollToSection('home')}
                                className={`block px-6 py-3 ${isDark ? 'text-white hover:bg-teal-500/20 ' : 'text-black hover:bg-teal-100'}`}
                            >
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Home
                                </span>
                            </a>
                            <a
                                onClick={() => scrollToSection('projects')}
                                className={`block px-6 py-3 ${isDark ? 'text-white hover:bg-amber-500/20' : 'text-black hover:bg-amber-100'}`}
                            >
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    Projects
                                </span>
                            </a>
                            <a
                                onClick={() => scrollToSection('contact')}
                                className={`block px-6 py-3 ${isDark ? 'text-white hover:bg-violet-500/20' : 'text-black hover:bg-violet-100'}`}
                            >
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                    Contact
                                </span>
                            </a>
                            <a
                                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block px-6 py-3 text-center ${isDark ? 'text-white' : 'text-white'} bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-500`}
                            >
                                Resume
                            </a>
                            <div className="flex border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}">
                                <button
                                    onClick={() => setIsDark(!isDark)}
                                    className={`flex-1 py-3 flex items-center justify-center ${isDark ? 'text-white hover:bg-slate-700' : 'text-black hover:bg-slate-100'}`}
                                >
                                    {isDark ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} className="text-indigo-700" />}
                                </button>
                                <button
                                    onClick={() => LayoutChanage("Layout2")}
                                    className={`flex-1 py-3 flex items-center justify-center ${isDark ? 'text-white hover:bg-slate-700' : 'text-black hover:bg-slate-100'}`}
                                >
                                    <Layout size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;





// import React, { useState } from "react";
// import { Sun, Moon, Layout } from "lucide-react";

// const Navbar = ({ isDark, setIsDark, layout, LayoutChanage }) => {
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
//         <nav className={`fixed w-full z-50 transition-all duration-300 ${isDark ? 'border-slate-700/50' : 'border-slate-300'}`}>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="relative flex items-center justify-between h-20">
//                     {/* Mobile Menu Button */}
//                     <button
//                         onClick={() => setIsMenuOpen(!isMenuOpen)}
//                         className="lg:hidden text-2xl text-black dark:text-white"
//                     >
//                         {isMenuOpen ? "✕" : "☰"}
//                     </button>

//                     {/* Desktop Nav */}
//                     <div className={`flex items-center space-x-1 rounded-full p-1 backdrop-blur-sm border transition-all duration-300 ${isDark ? "bg-slate-800/50 border-slate-600" : "bg-white border-slate-300"}`}>
//                         <a
//                             onClick={() => scrollToSection('home')}
//                             className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-teal-500/20 hover:shadow-md ${isDark ? 'text-white hover:text-teal-400' : 'text-black hover:bg-teal-900 hover:text-teal-300'}`}
//                         >
//                             <span className="flex items-center">
//                                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                                 </svg>
//                                 Home
//                             </span>
//                         </a>
//                         <a
//                             onClick={() => scrollToSection('projects')}
//                             className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md ${isDark ? 'text-white hover:bg-amber-500/20 hover:text-amber-300' : 'text-black hover:bg-amber-800 hover:text-amber-300'}`}
//                         >
//                             <span className="flex items-center">
//                                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                                 </svg>
//                                 Projects
//                             </span>
//                         </a>
//                         <a
//                             onClick={() => scrollToSection('contact')}
//                             className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md ${isDark ? 'text-white hover:bg-violet-500/20 hover:text-violet-300' : 'text-black hover:bg-violet-900 hover:text-violet-300'}`}
//                         >
//                             <span className="flex items-center">
//                                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
//                                 </svg>
//                                 Contact
//                             </span>
//                         </a>
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
//                             className="px-4 py-2 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-indigo-500/30"
//                         >
//                             {isDark ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-indigo-700" />}
//                         </button>
//                         <button
//                             className={`p-1 cursor-pointer ${isDark ? "hover:text-indigo-500 hover:bg-violet-500/20  rounded-2xl " : "hover:text-indigo-500 hover:bg-violet-500/20  rounded-2xl"}`}
//                             onClick={() => LayoutChanage("Layout2")}>
//                             <Layout size={25} />
//                         </button>

//                     </div>

//                     {/* Mobile Menu */}
//                     {isMenuOpen && (
//                         <div className="absolute top-20 left-0 w-full bg-white dark:bg-gray-800 shadow-lg lg:hidden">
//                             <a
//                                 onClick={() => scrollToSection('home')}
//                                 className="block px-6 py-4 text-black dark:text-white hover:bg-teal-500/20"
//                             >
//                                 Home
//                             </a>
//                             <a
//                                 onClick={() => scrollToSection('projects')}
//                                 className="block px-6 py-4 text-black dark:text-white hover:bg-amber-500/20"
//                             >
//                                 Projects
//                             </a>
//                             <a
//                                 onClick={() => scrollToSection('contact')}
//                                 className="block px-6 py-4 text-black dark:text-white hover:bg-violet-500/20"
//                             >
//                                 Contact
//                             </a>
//                             <a
//                                 href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="block px-6 py-4 dark:text-white bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:from-pink-600 hover:to-purple-500"
//                             >
//                                 Resume
//                             </a>
//                             <button
//                                 onClick={() => setIsDark(!isDark)}
//                                 className="block w-full px-6 py-4 text-black dark:text-white hover:bg-indigo-500/30"
//                             >
//                                 {isDark ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-indigo-700" />}
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
