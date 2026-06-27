
// Default Theme Components (Professional / default)
import NavbarDefault from '../pages/Navbar';
import HeroDefault from '../pages/hero';
import AboutDefault from '../pages/About';
import ProjectsDefault from '../components/Projects';
import ContactDefault from '../pages/Contact';
import FooterDefault from '../pages/Footer';



// Theme 6 Components (Layout6 - Obsidian Codex)
import NavbarTheme6 from '../Theme6/Navbar';
import HeroTheme6 from '../Theme6/Hero';
import AboutTheme6 from '../Theme6/About';
import ProjectsTheme6 from '../Theme6/Projects';
import ContactTheme6 from '../Theme6/Contact';
import FooterTheme6 from '../Theme6/Footer';

// Theme 7 Components (Layout7 - Aura Glassmorphism Theme)
import NavbarTheme7 from '../Theme7/Navbar';
import HeroTheme7 from '../Theme7/Hero';
import AboutTheme7 from '../Theme7/About';
import ProjectsTheme7 from '../Theme7/Projects';
import ContactTheme7 from '../Theme7/Contact';
import FooterTheme7 from '../Theme7/Footer';

export const themeRegistry = {
    "Layout1": {
        Navbar: NavbarDefault,
        Hero: HeroDefault,
        About: AboutDefault,
        Projects: ProjectsDefault,
        Contact: ContactDefault,
        Footer: FooterDefault,
    },

    "Layout6": {
        Navbar: NavbarTheme6,
        Hero: HeroTheme6,
        About: AboutTheme6,
        Projects: ProjectsTheme6,
        Contact: ContactTheme6,
        Footer: FooterTheme6,
    },
    "Layout7": {
        Navbar: NavbarTheme7,
        Hero: HeroTheme7,
        About: AboutTheme7,
        Projects: ProjectsTheme7,
        Contact: ContactTheme7,
        Footer: FooterTheme7,
    },
    "default": { // Fallback
        Navbar: NavbarDefault,
        Hero: HeroDefault,
        About: AboutDefault,
        Projects: ProjectsDefault,
        Contact: ContactDefault,
        Footer: FooterDefault,
    }
};

export const getTheme = (layoutName) => {
    return themeRegistry[layoutName] || themeRegistry["default"];
};

