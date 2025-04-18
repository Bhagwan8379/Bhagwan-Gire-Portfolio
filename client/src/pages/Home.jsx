import React, { useEffect, useState } from 'react'
// Default Theme
import Navbar from './Navbar';
import Hero from './hero';
import About from './About';
import Projects from '../components/Projects';
import Contact from './Contact';
import Footer from './Footer';

// Theme1
import NavbarTheme1 from '../Theme1/Navbar';
import HeroTheme1 from '../Theme1/Hero';
import AboutTheme1 from '../Theme1/About';
import ProjectsTheme1 from '../Theme1/Projects';
import ContactTheme1 from '../Theme1/Contact';
import FooterTheme1 from '../Theme1/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { changeLayout } from '../redux/slice/authSlice';


const Home = () => {
    const [isDark, setIsDark] = useState(true);
    const { layout } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [themelayout, setThemelayout] = useState(layout)
    const LayoutChanage = (arg) => {
        dispatch(changeLayout(arg))
    }
    useEffect(() => {
        setThemelayout(layout)
    }, [LayoutChanage]);
    useEffect(() => {
        document.body.className = isDark ? 'dark' : 'light';
    }, [isDark]);
    return (
        <>
            {
                themelayout === "Layout1" ?
                    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
                        <NavbarTheme1 themelayout={themelayout} LayoutChanage={LayoutChanage} isDark={isDark} setIsDark={setIsDark} />
                        <HeroTheme1 isDark={isDark} />
                        <AboutTheme1 isDark={isDark} />
                        <ProjectsTheme1 isDark={isDark} />
                        <ContactTheme1 isDark={isDark} />
                        <FooterTheme1 isDark={isDark} />
                    </div>
                    :
                    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
                        <Navbar themelayout={themelayout} LayoutChanage={LayoutChanage} isDark={isDark} setIsDark={setIsDark} />
                        <Hero isDark={isDark} />
                        <About isDark={isDark} />
                        <Projects isDark={isDark} />
                        <Contact isDark={isDark} />
                        <Footer isDark={isDark} />
                    </div>

            }
        </>
    )
}

export default Home





