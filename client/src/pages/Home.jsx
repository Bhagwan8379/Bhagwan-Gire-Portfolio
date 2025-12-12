import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeLayout } from '../redux/slice/authSlice';
import { getTheme } from '../themes/themeRegistry';

const Home = () => {
    const [isDark, setIsDark] = useState(true);
    const { layout } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // Get current theme components
    const Theme = getTheme(layout);
    // Destructure components with fallback to null/safe-check if needed, 
    // but getTheme ensures we get a valid object.
    const { Navbar, Hero, About, Projects, Contact, Footer } = Theme;

    const LayoutChanage = (arg) => {
        dispatch(changeLayout(arg))
    }

    useEffect(() => {
        // Base theme class
        const themeClass = isDark ? 'dark' : 'light';

        // Remove previous theme-specific classes
        document.body.classList.remove('theme-hacker');

        // Set base class and add specific layout classes
        document.body.className = themeClass;

        if (layout === 'Layout3') {
            document.body.classList.add('theme-hacker');
        }
    }, [isDark, layout]);

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





