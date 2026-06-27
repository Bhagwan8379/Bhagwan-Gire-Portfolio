import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSendMessageMutation } from '../redux/api/contactApi';
import { toast } from 'sonner';
import './Theme6.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Magnetic Button ────────────────────────────────────── */
const MagneticButton = ({ children, type = 'button', disabled, onClick }) => {
    const btnRef = useRef(null);

    useEffect(() => {
        const el = btnRef.current;
        if (!el) return;
        const rect  = el.getBoundingClientRect;
        const RANGE = 60;

        const onMove = (e) => {
            const b = el.getBoundingClientRect();
            const dx = e.clientX - (b.left + b.width / 2);
            const dy = e.clientY - (b.top  + b.height / 2);
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < RANGE) {
                gsap.to(el, {
                    x: dx * 0.45, y: dy * 0.45,
                    duration: 0.35, ease: 'power2.out',
                });
            }
        };
        const onLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        };

        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        return () => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <button
            ref={btnRef}
            type={type}
            disabled={disabled}
            onClick={onClick}
            className="ob-btn-magnetic"
            style={{
                width: '100%',
                padding: '16px',
                fontSize: '12px',
                letterSpacing: '0.15em',
                opacity: disabled ? 0.6 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                willChange: 'transform',
            }}
        >
            <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
        </button>
    );
};

/* ── Animated Input Field ───────────────────────────────── */
const AnimatedField = ({ id, label, type = 'text', rows, formik }) => {
    const [focused, setFocused] = useState(false);
    const lineRef  = useRef(null);
    const labelRef = useRef(null);
    const isTextarea = !!rows;
    const hasValue = formik.values[id] !== '';
    const hasError = formik.touched[id] && formik.errors[id];

    useEffect(() => {
        if (!lineRef.current) return;
        gsap.to(lineRef.current, {
            scaleX: focused ? 1 : 0,
            transformOrigin: 'left',
            duration: 0.4,
            ease: 'power3.out',
        });
    }, [focused]);

    const inputStyle = {
        width: '100%',
        background: 'transparent',
        border: 'none',
        borderBottom: `1px solid ${hasError ? '#E55' : 'rgba(255,255,255,0.08)'}`,
        padding: '14px 0',
        fontFamily: 'var(--ob-font-ui)',
        fontSize: '15px',
        fontWeight: 300,
        color: 'var(--ob-text)',
        outline: 'none',
        resize: 'none',
        display: 'block',
    };

    const fieldProps = formik.getFieldProps(id);

    return (
        <div style={{ position: 'relative', marginBottom: '36px' }}>
            <label
                ref={labelRef}
                htmlFor={id}
                style={{
                    display: 'block',
                    fontFamily: 'var(--ob-font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: focused ? 'var(--ob-gold)' : hasError ? '#E55' : 'var(--ob-text-muted)',
                    marginBottom: '6px',
                    transition: 'color 0.3s',
                }}
            >
                {hasError ? formik.errors[id] : label}
            </label>

            {isTextarea ? (
                <textarea
                    id={id}
                    rows={rows}
                    {...fieldProps}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => { setFocused(false); fieldProps.onBlur(e); }}
                    placeholder=""
                    style={{ ...inputStyle, lineHeight: 1.7 }}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    {...fieldProps}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => { setFocused(false); fieldProps.onBlur(e); }}
                    placeholder=""
                    style={inputStyle}
                />
            )}

            {/* Animated gold underline */}
            <div
                ref={lineRef}
                style={{
                    position: 'absolute',
                    bottom: 0, left: 0,
                    width: '100%', height: '1px',
                    background: 'linear-gradient(90deg, var(--ob-gold), var(--ob-gold-light))',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

/* ── Contact Section ────────────────────────────────────── */
const ContactTheme6 = () => {
    const [SendMessage, { isSuccess, isError, isLoading }] = useSendMessageMutation();
    const sectionRef = useRef(null);
    const titleRef   = useRef(null);
    const formRef    = useRef(null);
    const panelRef   = useRef(null);
    const glowRef    = useRef(null);

    const formik = useFormik({
        initialValues: { name: '', email: '', message: '' },
        validationSchema: yup.object({
            name:    yup.string().required('Name is required'),
            email:   yup.string().email('Invalid email').required('Email is required'),
            message: yup.string().required('Message is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            SendMessage(values);
            resetForm();
        },
    });

    useEffect(() => {
        if (isSuccess) toast.success('✦ Message delivered successfully.');
        if (isError)   toast.error('✕ Transmission failed. Try again.');
    }, [isSuccess, isError]);

    /* ── Entrance animations ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Animated gold radial glow */
            gsap.to(glowRef.current, {
                scale: 1.3,
                opacity: 0.6,
                repeat: -1,
                yoyo: true,
                duration: 4,
                ease: 'sine.inOut',
            });

            /* Title clip-path reveal */
            if (titleRef.current) {
                const split = new SplitType(titleRef.current, { types: 'lines' });
                split.lines.forEach((line) => {
                    const wrap = document.createElement('div');
                    wrap.style.cssText = 'overflow:hidden;';
                    line.parentNode.insertBefore(wrap, line);
                    wrap.appendChild(line);
                });
                gsap.fromTo(split.lines,
                    { yPercent: 100 },
                    {
                        yPercent: 0,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: 'top 80%',
                            once: true,
                        },
                    }
                );
            }

            /* Form panel slide in */
            if (panelRef.current) {
                gsap.fromTo(panelRef.current,
                    { opacity: 0, y: 50, scale: 0.97 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 1,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: panelRef.current,
                            start: 'top 80%',
                            once: true,
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="ob-contact"
            ref={sectionRef}
            className="ob-section"
            style={{
                background: 'var(--ob-bg)',
                padding: '140px 0',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Animated gold bloom */}
            <div
                ref={glowRef}
                style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '700px', height: '700px',
                    background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            <div className="ob-container" style={{ position: 'relative', zIndex: 1, maxWidth: '1000px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <p className="ob-label" style={{ marginBottom: '20px' }}>Let's Connect</p>
                    <h2
                        ref={titleRef}
                        style={{
                            fontFamily: 'var(--ob-font-display)',
                            fontSize: 'clamp(44px, 6vw, 80px)',
                            fontWeight: 300,
                            lineHeight: 0.95,
                            color: 'var(--ob-text)',
                            overflow: 'hidden',
                        }}
                    >
                        Start a<br/>
                        <span style={{ color: 'var(--ob-gold)', fontStyle: 'italic' }}>Conversation</span>
                    </h2>
                </div>

                {/* Form Panel */}
                <div
                    ref={panelRef}
                    className="ob-glass"
                    style={{
                        padding: 'clamp(32px, 5vw, 64px)',
                        maxWidth: '680px',
                        margin: '0 auto',
                        opacity: 0, /* starts hidden */
                    }}
                >
                    {/* Contact info */}
                    <div style={{ display: 'flex', gap: '32px', marginBottom: '48px', flexWrap: 'wrap' }}>
                        {[
                            { label: 'Email', value: 'bhagwangire05@gmail.com', href: 'mailto:bhagwangire05@gmail.com' },
                            { label: 'Location', value: 'Aurangabad, MH, India', href: null },
                        ].map(({ label, value, href }) => (
                            <div key={label}>
                                <p className="ob-label" style={{ fontSize: '9px', marginBottom: '4px' }}>{label}</p>
                                {href ? (
                                    <a href={href} style={{ fontFamily: 'var(--ob-font-ui)', fontSize: '13px', color: 'var(--ob-gold)', textDecoration: 'none' }}>{value}</a>
                                ) : (
                                    <p style={{ fontFamily: 'var(--ob-font-ui)', fontSize: '13px', color: 'var(--ob-text-muted)' }}>{value}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="ob-divider" style={{ marginBottom: '48px' }} />

                    <form onSubmit={formik.handleSubmit}>
                        <AnimatedField id="name"    label="Your Name"    formik={formik} />
                        <AnimatedField id="email"   label="Email Address" type="email" formik={formik} />
                        <AnimatedField id="message" label="Message"       rows={5}    formik={formik} />

                        <MagneticButton type="submit" disabled={isLoading}>
                            {isLoading ? 'Sending ···' : 'Send Message ✦'}
                        </MagneticButton>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactTheme6;
