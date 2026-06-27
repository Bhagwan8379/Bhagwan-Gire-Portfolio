import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeLayout } from '../redux/slice/authSlice';
import { getTheme } from '../themes/themeRegistry';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const [isDark, setIsDark] = useState(true);
    const { layout } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // Get current theme components
    const Theme = getTheme(layout);
    const { Navbar, Hero, About, Projects, Contact, Footer } = Theme;

    const LayoutChanage = (arg) => {
        dispatch(changeLayout(arg))
    }

    // Lenis Smooth Scroll Initialization for Layout6 and Layout7
    useEffect(() => {
        if (layout === 'Layout6' || layout === 'Layout7') {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                gestureOrientation: 'vertical',
                normalizeWheel: true,
                smoothWheel: true
            });

            lenis.on('scroll', ScrollTrigger.update);

            const tick = (time) => {
                lenis.raf(time * 1000);
            };

            gsap.ticker.add(tick);
            gsap.ticker.lagSmoothing(0);

            return () => {
                lenis.destroy();
                gsap.ticker.remove(tick);
            };
        }
    }, [layout]);

    useEffect(() => {
        // Remove all theme-specific classes first
        document.body.classList.remove('theme-obsidian', 'theme-aura');

        // Set base class and add layout-specific class
        document.body.className = isDark ? 'dark' : 'light';

        if (layout === 'Layout6') document.body.classList.add('theme-obsidian');
        if (layout === 'Layout7') document.body.classList.add('theme-aura');
    }, [isDark, layout]);

    useEffect(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
    }, [layout]);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
            <Navbar themelayout={layout} layout={layout} LayoutChanage={LayoutChanage} isDark={isDark} setIsDark={setIsDark} />
            <Hero isDark={isDark} />
            <About isDark={isDark} />
            <Projects isDark={isDark} />
            <Contact isDark={isDark} />
            <Footer isDark={isDark} />
        </div>
    )
}

export default Home





