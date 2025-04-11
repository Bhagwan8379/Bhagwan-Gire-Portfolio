import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ compo }) => {
    const { admin } = useSelector((state) => state.auth);
    const navigate = useNavigate();


    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.3; }
                50% { transform: scale(1.1); opacity: 0.5; }
            }

            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    if (admin) return <>{compo}</>;

    // Inline styles
    const styles = {
        container: {
            height: "100vh",
            width: "100%",
            background: "linear-gradient(to bottom right, #0f0f0f, #1c1c1c, #2a0033)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        },
        orb1: {
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "250px",
            height: "250px",
            background: "radial-gradient(circle, #D946EF, #8B5CF6)",
            borderRadius: "50%",
            filter: "blur(120px)",
            opacity: 0.3,
            animation: "spin 20s linear infinite",
        },
        orb2: {
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, #8B5CF6, #A78BFA)",
            borderRadius: "50%",
            filter: "blur(150px)",
            opacity: 0.25,
            animation: "pulse 6s ease-in-out infinite",
        },
        card: {
            position: "relative",
            zIndex: 10,
            padding: "3rem",
            maxWidth: "480px",
            width: "90%",
            background: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 25px 60px rgba(255, 0, 255, 0.2)",
            textAlign: "center",
        },
        title: {
            fontSize: "2.5rem",
            fontWeight: "bold",
            background: "linear-gradient(to right, #D946EF, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
        },
        text: {
            color: "#E9D5FF",
            fontSize: "1.1rem",
            marginBottom: "2rem",
        },
        button: {
            background: "linear-gradient(to right, #D946EF, #8B5CF6)",
            color: "#fff",
            padding: "0.8rem 2rem",
            borderRadius: "9999px",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            boxShadow: "0 0 18px rgba(216, 70, 239, 0.4)",
        }
    };

    // Button hover animation
    const handleMouseEnter = (e) => {
        e.target.style.transform = "scale(1.05)";
        e.target.style.boxShadow = "0 0 30px rgba(216, 70, 239, 0.7)";
    };

    const handleMouseLeave = (e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = "0 0 18px rgba(216, 70, 239, 0.4)";
    };


    return (
        <> {admin ? (
            <>{compo}</>
        ) : (
            <div style={styles.container}>
                <div style={styles.orb1}></div>
                <div style={styles.orb2}></div>

                <div style={styles.card}>
                    <h1 style={styles.title}>Admin Area Only</h1>
                    <p style={styles.text}>This section is exclusive to <strong>Admins</strong>. Please log in to proceed.</p>
                    <button
                        style={styles.button}
                        onClick={() => navigate("/")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Login as Admin
                    </button>
                </div>
            </div>
        )}
        </>
    );
};

export default Protected;

