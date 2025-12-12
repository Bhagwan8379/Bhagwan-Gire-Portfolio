import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-green-900 py-8 text-center font-mono text-green-700 text-xs tracking-wider">
            <div className="max-w-7xl mx-auto px-4">
                <p className="mb-2">
                    <span className="animate-pulse">_</span> SYSTEM STATUS: STABLE
                </p>
                <p>
                    &copy; {new Date().getFullYear()} BHAGWAN_GIRE. ALL RIGHTS RESERVED.
                </p>
                <p className="mt-4 opacity-50">
                    [ END OF LINE ]
                </p>
            </div>
        </footer>
    );
};

export default Footer;
