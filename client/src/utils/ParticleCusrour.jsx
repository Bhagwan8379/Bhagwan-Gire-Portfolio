// // import React, { useEffect, useRef } from 'react';

// // const ParticleCusrour = () => {
// //     const canvasRef = useRef(null);
// //     const particles = useRef([]);
// //     const mouse = useRef({ x: 0, y: 0 });

// //     useEffect(() => {
// //         const canvas = canvasRef.current;
// //         const ctx = canvas.getContext('2d');
// //         canvas.width = window.innerWidth;
// //         canvas.height = window.innerHeight;

// //         const handleResize = () => {
// //             canvas.width = window.innerWidth;
// //             canvas.height = window.innerHeight;
// //         };

// //         const handleMouseMove = (e) => {
// //             mouse.current.x = e.clientX;
// //             mouse.current.y = e.clientY;

// //             for (let i = 0; i < 5; i++) {
// //                 particles.current.push({
// //                     x: e.clientX,
// //                     y: e.clientY,
// //                     size: Math.random() * 4 + 2,
// //                     speedX: (Math.random() - 0.5) * 4,
// //                     speedY: (Math.random() - 0.5) * 4,
// //                     alpha: 1,
// //                     color: `rgba(${255}, ${Math.floor(Math.random() * 150)}, 0, 1)`
// //                 });
// //             }
// //         };

// //         const animate = () => {
// //             ctx.clearRect(0, 0, canvas.width, canvas.height);

// //             particles.current.forEach((p, index) => {
// //                 p.x += p.speedX;
// //                 p.y += p.speedY;
// //                 p.alpha -= 0.02;

// //                 if (p.alpha <= 0) {
// //                     particles.current.splice(index, 1);
// //                 }

// //                 ctx.beginPath();
// //                 ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
// //                 ctx.fillStyle = `rgba(255, ${Math.floor(Math.random() * 150)}, 0, ${p.alpha})`;
// //                 ctx.fill();
// //             });

// //             requestAnimationFrame(animate);
// //         };

// //         window.addEventListener('mousemove', handleMouseMove);
// //         window.addEventListener('resize', handleResize);
// //         animate();

// //         return () => {
// //             window.removeEventListener('mousemove', handleMouseMove);
// //             window.removeEventListener('resize', handleResize);
// //         };
// //     }, []);

// //     return (
// //         <canvas
// //             ref={canvasRef}
// //             style={{
// //                 position: 'fixed',
// //                 top: 0,
// //                 left: 0,
// //                 pointerEvents: 'none',
// //                 zIndex: 9999,
// //             }}
// //         />
// //     );
// // };

// // export default ParticleCusrour;




// import React, { useEffect, useRef } from 'react';

// const ParticleCursor = () => {
//     const canvasRef = useRef(null);
//     const particles = useRef([]);
//     const mouse = useRef({ x: 0, y: 0 });

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;

//         const handleResize = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//         };

//         const handleMouseMove = (e) => {
//             mouse.current.x = e.clientX;
//             mouse.current.y = e.clientY;

//             for (let i = 0; i < 10; i++) {
//                 const hue = Math.floor(Math.random() * 40) + 280; // pink-violet range: 280–320
//                 particles.current.push({
//                     x: e.clientX,
//                     y: e.clientY,
//                     size: Math.random() * 5 + 2,
//                     speedX: (Math.random() - 0.5) * 2,
//                     speedY: (Math.random() - 0.5) * 2,
//                     alpha: 1,
//                     hue,
//                 });
//             }
//         };

//         const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             particles.current.forEach((p, index) => {
//                 p.x += p.speedX;
//                 p.y += p.speedY;
//                 p.alpha -= 0.01;

//                 if (p.alpha <= 0) {
//                     particles.current.splice(index, 1);
//                     return;
//                 }

//                 ctx.beginPath();
//                 ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//                 ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.alpha})`;
//                 ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, ${p.alpha})`;
//                 ctx.shadowBlur = 15;
//                 ctx.fill();
//             });

//             requestAnimationFrame(animate);
//         };

//         window.addEventListener('mousemove', handleMouseMove);
//         window.addEventListener('resize', handleResize);
//         animate();

//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove);
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     return (
//         <canvas
//             ref={canvasRef}
//             style={{
//                 position: 'fixed',
//                 top: 0,
//                 left: 0,
//                 pointerEvents: 'none',
//                 zIndex: 9999,
//             }}
//         />
//     );
// };

// export default ParticleCursor;







import React, { useEffect, useRef } from 'react';

const ParticleCursor = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            // Reduce density from 10 to 3
            for (let i = 0; i < 3; i++) {
                const hue = Math.floor(Math.random() * 40) + 280; // pink-violet range: 280–320
                particles.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 5 + 2,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: (Math.random() - 0.5) * 2,
                    alpha: 1,
                    hue,
                });
            }

            // Optional: limit total particles to avoid overload
            if (particles.current.length > 500) {
                particles.current.splice(0, 100);
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((p, index) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.alpha -= 0.015; // Slightly faster fade

                if (p.alpha <= 0) {
                    particles.current.splice(index, 1);
                    return;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.alpha})`;
                ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, ${p.alpha})`;
                ctx.shadowBlur = 15;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
};

export default ParticleCursor;
