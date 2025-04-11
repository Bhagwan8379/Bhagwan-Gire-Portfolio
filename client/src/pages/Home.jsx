import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Hero from './hero';
import About from './About';
import Projects from '../components/Projects';
import Contact from './Contact';
import Footer from './Footer';

const Home = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        document.body.className = isDark ? 'dark' : 'light';
    }, [isDark]);
    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
            <Navbar isDark={isDark} setIsDark={setIsDark} />
            <Hero isDark={isDark} />
            <About isDark={isDark} />
            <Projects isDark={isDark} />
            <Contact isDark={isDark} />
            <Footer isDark={isDark} />
        </div>
    )
}

export default Home





