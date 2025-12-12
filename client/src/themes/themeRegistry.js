
// Default Theme Components (Layout2 or default)
import NavbarDefault from '../pages/Navbar';
import HeroDefault from '../pages/hero';
import AboutDefault from '../pages/About';
import ProjectsDefault from '../components/Projects';
import ContactDefault from '../pages/Contact';
import FooterDefault from '../pages/Footer';


// Theme 1 Components (Layout1)
import NavbarTheme1 from '../Theme1/Navbar';
import HeroTheme1 from '../Theme1/Hero';
import AboutTheme1 from '../Theme1/About';
import ProjectsTheme1 from '../Theme1/Projects';
import ContactTheme1 from '../Theme1/Contact';
import FooterTheme1 from '../Theme1/Footer';

// Theme 3 Components (Layout3 - Hacker Theme)
import NavbarTheme3 from '../Theme3/Navbar';
import HeroTheme3 from '../Theme3/Hero';
import AboutTheme3 from '../Theme3/About';
import ProjectsTheme3 from '../Theme3/Projects';
import ContactTheme3 from '../Theme3/Contact';
import FooterTheme3 from '../Theme3/Footer';

export const themeRegistry = {
    // Mapping internal layout names to component sets
    "Layout1": {
        Navbar: NavbarTheme1,
        Hero: HeroTheme1,
        About: AboutTheme1,
        Projects: ProjectsTheme1,
        Contact: ContactTheme1,
        Footer: FooterTheme1,
    },
    "Layout2": {
        Navbar: NavbarDefault,
        Hero: HeroDefault,
        About: AboutDefault,
        Projects: ProjectsDefault,
        Contact: ContactDefault,
        Footer: FooterDefault,
    },
    "Layout3": {
        Navbar: NavbarTheme3,
        Hero: HeroTheme3,
        About: AboutTheme3,
        Projects: ProjectsTheme3,
        Contact: ContactTheme3,
        Footer: FooterTheme3,
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
