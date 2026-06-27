import React from 'react';
import { Toaster } from 'sonner';
import { useSelector } from 'react-redux';
import './ThemedToaster.css';

const ThemedToaster = () => {
    const { layout } = useSelector(state => state.auth);

    // Theme-specific configurations
    const getThemeConfig = () => {
        switch (layout) {
            case 'Layout1':
                // Professional Theme - Clean and modern
                return {
                    position: 'top-right',
                    toastOptions: {
                        style: {
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            fontSize: '14px',
                            fontWeight: '500',
                            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                            backdropFilter: 'blur(10px)',
                        },
                        className: 'professional-toast',
                        duration: 4000,
                    },
                };

            case 'Layout2':
                // Gradient Theme - Vibrant and colorful
                return {
                    position: 'top-right',
                    toastOptions: {
                        style: {
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                            color: '#ffffff',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '16px',
                            padding: '18px 24px',
                            fontSize: '15px',
                            fontWeight: '600',
                            boxShadow: '0 12px 40px rgba(240, 147, 251, 0.4), 0 0 20px rgba(102, 126, 234, 0.2)',
                            backdropFilter: 'blur(12px)',
                        },
                        className: 'gradient-toast',
                        duration: 4500,
                    },
                };

            case 'Layout3':
                // Hacker Theme - Matrix-style terminal
                return {
                    position: 'top-right',
                    toastOptions: {
                        style: {
                            background: 'rgba(0, 20, 0, 0.95)',
                            color: '#00ff41',
                            border: '1px solid #00ff41',
                            borderRadius: '4px',
                            padding: '14px 18px',
                            fontSize: '13px',
                            fontWeight: '500',
                            fontFamily: "'Courier New', monospace",
                            boxShadow: '0 0 20px rgba(0, 255, 65, 0.3), inset 0 0 10px rgba(0, 255, 65, 0.1)',
                            textShadow: '0 0 5px rgba(0, 255, 65, 0.5)',
                        },
                        className: 'hacker-toast',
                        duration: 5000,
                    },
                };

            case 'Layout4':
                // 3D Theme - Futuristic with cyan/purple gradient
                return {
                    position: 'top-right',
                    toastOptions: {
                        style: {
                            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.9) 0%, rgba(168, 85, 247, 0.9) 100%)',
                            color: '#ffffff',
                            border: '2px solid rgba(6, 182, 212, 0.5)',
                            borderRadius: '20px',
                            padding: '18px 24px',
                            fontSize: '15px',
                            fontWeight: '600',
                            boxShadow: '0 20px 60px rgba(6, 182, 212, 0.4), 0 0 30px rgba(168, 85, 247, 0.3)',
                            backdropFilter: 'blur(16px)',
                        },
                        className: 'theme3d-toast',
                        duration: 4500,
                    },
                };
            case 'Layout6':
                // Obsidian Codex Theme - Dark Academy with gold accents
                return {
                    position: 'top-right',
                    toastOptions: {
                        style: {
                            background: '#090909',
                            color: '#c9a84c',
                            border: '1px solid rgba(201, 168, 76, 0.3)',
                            borderRadius: '8px',
                            padding: '14px 20px',
                            fontSize: '13px',
                            fontWeight: '400',
                            fontFamily: "'Space Mono', 'Courier New', monospace",
                            boxShadow: '0 8px 30px rgba(9, 9, 9, 0.8), 0 0 15px rgba(201, 168, 76, 0.15)',
                        },
                        className: 'obsidian-toast',
                        duration: 4500,
                    },
                };

            case 'Layout7':
                // Aura Glassmorphism - Frosted glass with soft violet/indigo & amber glow
                return {
                    position: 'top-right',
                    toastOptions: {
                        style: {
                            background: 'rgba(10, 10, 22, 0.5)',
                            color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '16px 22px',
                            fontSize: '14px',
                            fontWeight: '500',
                            fontFamily: "'Outfit', system-ui, sans-serif",
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(139, 92, 246, 0.2)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                        },
                        className: 'aura-toast',
                        duration: 4000,
                    },
                };

            default:
                // Default fallback - Pink gradient (matching particle default)
                return {
                    position: 'top-right',
                    toastOptions: {
                        style: {
                            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                            color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            fontSize: '14px',
                            fontWeight: '500',
                            boxShadow: '0 8px 32px rgba(236, 72, 153, 0.3)',
                            backdropFilter: 'blur(10px)',
                        },
                        className: 'default-toast',
                        duration: 4000,
                    },
                };
        }
    };

    const config = getThemeConfig();

    return (
        <Toaster
            position={config.position}
            toastOptions={config.toastOptions}
            expand={true}
            richColors={false}
            closeButton={true}
        />
    );
};

export default ThemedToaster;
