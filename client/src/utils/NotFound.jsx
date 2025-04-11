import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const styles = {
        page: {
            height: '100vh',
            width: '100%',
            background: 'radial-gradient(circle at top, #1a0033 0%, #0a001a 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            fontFamily: "'Poppins', sans-serif",
            color: '#fff',
        },
        shimmerText: {
            fontSize: '140px',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #ff4ecd, #fff500, #ff77e9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s infinite linear',
            letterSpacing: '10px',
        },
        container: {
            padding: '50px',
            borderRadius: '30px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 40px rgba(255, 110, 220, 0.3)',
            textAlign: 'center',
            zIndex: 2,
            animation: 'fadeUp 1.2s ease-out forwards',
        },
        subtitle: {
            fontSize: '26px',
            marginTop: '10px',
            fontWeight: '600',
            color: '#ff77e9',
        },
        description: {
            fontSize: '16px',
            maxWidth: '400px',
            margin: '20px auto',
            color: '#fefefe',
            opacity: 0.85,
        },
        button: {
            marginTop: '30px',
            padding: '14px 36px',
            fontSize: '16px',
            borderRadius: '50px',
            border: 'none',
            background: 'linear-gradient(to right, #ff4ecd, #fff500)',
            color: '#000',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 0 20px rgba(255, 118, 255, 0.4)',
        },
        particles: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            zIndex: 0,
            animation: 'floatBg 60s linear infinite',
        },
        keyframes: `
      @keyframes shimmer {
        0% { background-position: -600px 0; }
        100% { background-position: 600px 0; }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes floatBg {
        0% { background-position: 0 0; }
        100% { background-position: 100px 100px; }
      }
    `,
    };

    return (
        <div style={styles.page}>
            <style>{styles.keyframes}</style>
            <div style={styles.particles}></div>

            <div style={styles.container}>
                <h1 style={styles.shimmerText}>404</h1>
                <p style={styles.subtitle}>Page Not Found</p>
                <p style={styles.description}>
                    This page is off-limits. You’re outside the velvet ropes. Let’s get you back to the spotlight.
                </p>
                <Link
                    to="/"
                    style={styles.button}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = '0 0 30px rgba(255, 255, 150, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 0 20px rgba(255, 118, 255, 0.4)';
                    }}
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
