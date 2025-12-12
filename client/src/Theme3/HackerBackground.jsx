import React, { useEffect, useRef } from 'react';

const HackerBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Matrix Rain Configuration
        const fontSize = 14;
        const columns = Math.floor(width / fontSize);
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Start at random heights above
        }
        const chars = "0123456789ABCDEF";

        // Globe Configuration
        const globeRadius = Math.min(width, height) * 0.35; // Responsive radius
        const dots = [];
        const numDots = 400; // Number of points on the sphere
        let rotation = 0;

        // Initialize Globe Dots (Fibonacci Sphere)
        for (let i = 0; i < numDots; i++) {
            const phi = Math.acos(-1 + (2 * i) / numDots);
            const theta = Math.sqrt(numDots * Math.PI) * phi;
            const x = globeRadius * Math.cos(theta) * Math.sin(phi);
            const y = globeRadius * Math.sin(theta) * Math.sin(phi);
            const z = globeRadius * Math.cos(phi);
            dots.push({ x, y, z });
        }

        const render = () => {
            // Semi-transparent fade for trails
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);

            // 1. Draw Matrix Rain (Sliding Numbers)
            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Randomly skip drawing some frames to create "glitch" or less dense feel
                if (Math.random() > 0.05) {
                    const text = chars.charAt(Math.floor(Math.random() * chars.length));
                    const x = i * fontSize;
                    const y = drops[i] * fontSize;

                    // Vary opacity for depth
                    const opacity = Math.random() > 0.8 ? 1 : 0.3;
                    ctx.fillStyle = `rgba(0, 255, 70, ${opacity})`;

                    ctx.fillText(text, x, y);
                }

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += 0.5; // Speed of falling
            }

            // 2. Draw Rotating Earth (Wireframe/Dots)
            // Position globe roughly centered but maybe slightly offset or behind content
            const globeCenterX = width * 0.75; // Right side
            const globeCenterY = height * 0.5;

            rotation += 0.005; // Rotation speed

            ctx.save();
            ctx.translate(globeCenterX, globeCenterY);

            dots.forEach(dot => {
                // Rotate around Y axis
                const rotatedX = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
                const rotatedZ = dot.x * Math.sin(rotation) + dot.z * Math.cos(rotation);

                // 3D Projection scale
                let scale = (globeRadius + rotatedZ) / (globeRadius * 2) + 0.5;
                // Clamp scale
                scale = Math.max(0.1, Math.min(1.5, scale));

                const alpha = (rotatedZ + globeRadius) / (2 * globeRadius); // Fade back dots

                ctx.beginPath();
                ctx.fillStyle = `rgba(0, 255, 70, ${alpha})`;
                ctx.arc(rotatedX, dot.y, 2 * scale, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();

            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen"
        />
    );
};

export default HackerBackground;
