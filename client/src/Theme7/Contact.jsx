import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useSendMessageMutation } from '../redux/api/contactApi';
import { toast } from 'sonner';
import './Theme7.css';

const ContactTheme7 = () => {
    const [SendMessage, { isLoading, isSuccess, isError }] = useSendMessageMutation();

    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    // Ripple effect state
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Message sent successfully!');
            // Reset fields
            setName('');
            setEmail('');
            setMessage('');
        }
        if (isError) {
            toast.error('Failed to deliver message. Please try again.');
        }
    }, [isSuccess, isError]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !email || !message) {
            toast.error('Name, Email and Message are required.');
            return;
        }

        SendMessage({
            name,
            email,
            message
        });
    };

    // Concentric ripple click handler
    const triggerRipple = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        // Ripple position relative to the button
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const id = Date.now();
        setRipples((prev) => [...prev, { id, x, y }]);
        
        // Remove ripple after transition ends
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 1200);
    };

    return (
        <section
            id="aura-contact"
            className="relative py-28 px-6 md:px-12 w-full min-h-screen flex flex-col justify-center items-center overflow-hidden theme-aura"
            style={{ background: 'var(--aura-bg)' }}
        >
            {/* ── DRAMATIC BOTTOM WARM AMBER GLOW ── */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    height: '80%',
                    background: 'radial-gradient(circle at 50% 100%, rgba(245, 158, 11, 0.16) 0%, rgba(5, 5, 18, 0) 70%)',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            {/* ── CONTACT CARD (Fade & Slide-Up Reveal) ── */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-3xl aura-glass p-8 md:p-12 border border-white/5"
            >
                {/* Heading */}
                <div className="mb-10 text-center md:text-left">
                    <h2 className="aura-title-serif text-3xl md:text-5xl text-white">Contact</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                    {/* Row 1: Name | Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col border-b border-white/10 py-2 focus-within:border-amber-500 transition-all">
                            <label className="text-[10px] uppercase font-mono tracking-widest text-white/40 mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-transparent border-none outline-none text-white font-light text-sm"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="flex flex-col border-b border-white/10 py-2 focus-within:border-amber-500 transition-all">
                            <label className="text-[10px] uppercase font-mono tracking-widest text-white/40 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent border-none outline-none text-white font-light text-sm"
                                placeholder="name@domain.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Row 2: Message (Full width) */}
                    <div className="flex flex-col border-b border-white/10 py-2 focus-within:border-amber-500 transition-all">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-white/40 mb-1">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="bg-transparent border-none outline-none text-white font-light text-sm resize-none h-[120px]"
                            placeholder="Write your message here..."
                            required
                        />
                    </div>

                    {/* Submit Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
                        {/* Copyright */}
                        <div className="text-[11px] text-white/40 font-light select-none self-start py-2">
                            © 2026 Bhagwan Gire
                        </div>

                        {/* Large special pill Send Message button */}
                        <div className="relative overflow-visible shrink-0">
                            {/* Render ripples OUTSIDE the button for around expansion */}
                            {ripples.map((ripple) => (
                                <span
                                    key={ripple.id}
                                    className="ripple-circle"
                                    style={{
                                        left: ripple.x,
                                        top: ripple.y,
                                    }}
                                />
                            ))}

                            <button
                                type="submit"
                                disabled={isLoading}
                                onMouseDown={triggerRipple}
                                style={{
                                    background: 'linear-gradient(to right, #f59e0b, #d97706)',
                                    border: 'none',
                                    borderRadius: '999px',
                                    color: 'white',
                                    padding: '14px 40px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
                                }}
                                className="shimmer-trigger relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_4px_30px_rgba(245, 158, 11, 0.5)]"
                            >
                                {/* Shimmer Sweep Overlay */}
                                <span
                                    className="shimmer-bar absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                                    style={{
                                        transform: 'translateX(-150%) skewX(-25deg)',
                                        transition: 'none'
                                    }}
                                />
                                {isLoading ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </section>
    );
};

export default ContactTheme7;
