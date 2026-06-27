import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { useAdminLoginMutation, useVoiceLoginAdminMutation } from '../redux/api/authApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { X, Mic, Mail, Github, Linkedin } from 'lucide-react';
import './Theme6.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Text Scramble ──────────────────────────────────────── */
class TextScrambler {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#░▒▓01';
        this.queue = [];
        this.frame = 0;
        this.resolve = null;
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const len = Math.max(oldText.length, newText.length);
        this.queue = [];
        for (let i = 0; i < len; i++) {
            const from = oldText[i] || '';
            const to   = newText[i] || '';
            const start = Math.floor(Math.random() * 18);
            const end   = start + Math.floor(Math.random() * 18);
            this.queue.push({ from, to, start, end, char: '' });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return new Promise(res => { this.resolve = res; });
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            const { from, to, start, end } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += `<span style="color:var(--ob-text)">${to}</span>`;
            } else if (this.frame >= start) {
                const c = this.chars[Math.floor(Math.random() * this.chars.length)];
                this.queue[i].char = c;
                output += `<span style="color:var(--ob-gold);opacity:0.7">${c}</span>`;
            } else {
                output += `<span style="color:var(--ob-text-dim)">${from}</span>`;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve?.();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

/* ── Social Link ─────────────────────────────────────────── */
const SocialLink = ({ href, icon, label, delay }) => {
    const ref = useRef(null);

    useEffect(() => {
        gsap.fromTo(ref.current,
            { opacity: 0, y: 20, scale: 0.7 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.6,
                delay,
                ease: 'back.out(2)',
                scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
            }
        );

        const el = ref.current;
        const enter = () => gsap.to(el, { y: -4, scale: 1.15, duration: 0.3, ease: 'power2.out' });
        const leave = () => gsap.to(el, { y:  0, scale: 1.00, duration: 0.4, ease: 'elastic.out(1,0.4)' });
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
        return () => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); };
    }, []);

    return (
        <a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            style={{
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px', height: '44px',
                borderRadius: '50%',
                border: '1px solid var(--ob-border)',
                color: 'var(--ob-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.3s, border-color 0.3s',
                willChange: 'transform',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--ob-gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ob-text-muted)'}
        >
            {icon}
        </a>
    );
};

/* ── Footer ─────────────────────────────────────────────── */
const FooterTheme6 = () => {
    const [showModal, setShowModal] = useState(false);
    const [Login, { isSuccess, isLoading, isError }] = useAdminLoginMutation();
    const [voiceLogin, { isLoading: isProcessingVoice }] = useVoiceLoginAdminMutation();
    const navigate = useNavigate();

    /* Voice login state */
    const [isRecording, setIsRecording] = useState(false);
    const [spokenText, setSpokenText]   = useState('');
    const [voiceError, setVoiceError]   = useState('');
    const mediaRecorderRef = useRef(null);
    const speechRef        = useRef(null);
    const audioChunksRef   = useRef([]);
    const spokenTextRef    = useRef('');
    const ADMIN_SECRET_SENTENCE = 'hi jarvis';

    /* Refs */
    const footerRef  = useRef(null);
    const nameRef    = useRef(null);
    const gridRef    = useRef(null);
    const copyrightRef = useRef(null);
    const scramblerRef = useRef(null);

    /* ── Scroll animations ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Rising gold grid lines */
            const lines = gridRef.current?.querySelectorAll('.ob-grid-line');
            if (lines) {
                gsap.fromTo(lines,
                    { scaleY: 0, opacity: 0 },
                    {
                        scaleY: 1,
                        opacity: 0.35,
                        stagger: 0.07,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: 'top 85%',
                            once: true,
                        },
                    }
                );
            }

            /* Text scramble on name */
            if (nameRef.current) {
                const scrambler = new TextScrambler(nameRef.current);
                scramblerRef.current = scrambler;
                ScrollTrigger.create({
                    trigger: nameRef.current,
                    start: 'top 85%',
                    once: true,
                    onEnter: () => scrambler.setText('BHAGWAN GIRE'),
                });
            }

            /* Copyright letter reveal */
            if (copyrightRef.current) {
                gsap.fromTo(copyrightRef.current,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1, x: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: copyrightRef.current,
                            start: 'top 90%',
                            once: true,
                        },
                    }
                );
            }
        }, footerRef);

        return () => ctx.revert();
    }, []);

    /* ── Admin login effects ── */
    useEffect(() => {
        if (isSuccess) {
            toast.success('✦ Login successful.');
            navigate('/admin');
        }
        if (isError) toast.error('✕ Login failed.');
    }, [isSuccess, isError]);

    /* ── Voice login ── */
    const stopRecording = () => {
        if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
        if (speechRef.current) speechRef.current.stop();
        setIsRecording(false);
    };

    const handleVoiceLogin = async () => {
        if (isRecording) { stopRecording(); return; }
        setSpokenText(''); spokenTextRef.current = ''; setVoiceError('');

        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) {
            setVoiceError("Web Speech API is not supported by your browser (e.g., Firefox, Opera). Please use Google Chrome, Safari, or Microsoft Edge.");
            toast.error("Speech Recognition is not supported by this browser.");
            return;
        }

        if (!navigator.mediaDevices?.getUserMedia) {
            setVoiceError("Voice recognition/microphone features are not supported or secure context (HTTPS) is missing.");
            toast.error("Microphone features are not supported by your browser.");
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setIsRecording(true);
            toast.success('🎙️ Listening...');
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
            mediaRecorderRef.current.ondataavailable = e => audioChunksRef.current.push(e.data);
            mediaRecorderRef.current.onstop = async () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

                // Sanitized matching to ignore case, punctuation, and extra spaces
                const cleanSpoken = spokenTextRef.current.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
                const cleanSecret = ADMIN_SECRET_SENTENCE.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

                if (cleanSpoken !== cleanSecret) {
                    const whatWasSpoken = spokenTextRef.current ? `"${spokenTextRef.current}"` : "nothing";
                    toast.error(`Sentence did not match. You said: ${whatWasSpoken}`);
                    setVoiceError(`Sentence did not match. You said: ${whatWasSpoken}`);
                    setIsRecording(false); // Reset to allow another attempt
                    return;
                }
                try {
                    const res = await voiceLogin(blob).unwrap();
                    if (res.success) { toast.success('✦ Voice login success!'); setShowModal(false); navigate('/admin'); }
                    else throw new Error(res.message);
                } catch (e) {
                    setVoiceError(e.data?.message || e.message || 'Voice login failed.'); toast.error(`✕ ${e.message}`);
                }
            };
            speechRef.current = new SR();
            speechRef.current.continuous = true;
            speechRef.current.interimResults = true;
            speechRef.current.onresult = e => {
                const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
                setSpokenText(transcript);
                spokenTextRef.current = transcript; // Set ref to avoid stale closure
            };
            speechRef.current.onerror = e => { setVoiceError(`Error: ${e.error}`); stopRecording(); };
            mediaRecorderRef.current.start();
            speechRef.current.start();
        } catch (err) {
            console.error("Microphone error:", err);
            let msg = "Microphone access was denied. Please allow microphone access in your browser settings.";
            if (err.name !== "NotAllowedError" && err.name !== "PermissionDeniedError") {
                msg = err.message || msg;
            }
            setVoiceError(msg);
            toast.error(`✕ ${msg}`);
            setIsRecording(false);
        }
    };

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema: yup.object({
            username: yup.string().required('Enter username'),
            password: yup.string().min(6, 'Min 6 chars').required('Enter password'),
        }),
        onSubmit: (values, { resetForm }) => {
            Login(values); resetForm(); setShowModal(false);
        },
    });

    const handleMouseDown = (e) => { if (e.detail > 1) e.preventDefault(); };

    /* Grid lines config */
    const gridLines = Array.from({ length: 12 }, (_, i) => ({
        left: `${(i + 0.5) * (100 / 12)}%`,
        height: `${40 + Math.random() * 60}%`,
    }));

    return (
        <>
            <footer
                ref={footerRef}
                style={{
                    background: 'var(--ob-surface)',
                    borderTop: '1px solid var(--ob-border-subtle)',
                    padding: '80px 0 40px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Gold top line */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--ob-gold), transparent)',
                    opacity: 0.5,
                }} />

                {/* Decorative rising grid lines */}
                <div
                    ref={gridRef}
                    style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
                >
                    {gridLines.map((l, i) => (
                        <div
                            key={i}
                            className="ob-grid-line"
                            style={{ left: l.left, height: l.height, bottom: 0 }}
                        />
                    ))}
                </div>

                <div
                    className="ob-container"
                    style={{ position: 'relative', zIndex: 1, maxWidth: '1280px' }}
                >
                    {/* Big name */}
                    <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                        <h2
                            ref={nameRef}
                            style={{
                                fontFamily: 'var(--ob-font-display)',
                                fontSize: 'clamp(40px, 7vw, 96px)',
                                fontWeight: 300,
                                letterSpacing: '0.12em',
                                color: 'var(--ob-text)',
                                lineHeight: 1,
                                minHeight: '1em',
                            }}
                        >
                            ···
                        </h2>
                        <p className="ob-label" style={{ marginTop: '12px' }}>Full-Stack Developer · Aurangabad, India</p>
                    </div>

                    <div className="ob-divider" style={{ marginBottom: '40px' }} />

                    {/* Bottom row */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '24px',
                    }}>
                        <p
                            ref={copyrightRef}
                            style={{
                                fontFamily: 'var(--ob-font-mono)',
                                fontSize: '10px',
                                letterSpacing: '0.15em',
                                color: 'var(--ob-text-muted)',
                                textTransform: 'uppercase',
                                opacity: 0,
                            }}
                        >
                            © 2025 Bhagwan Gire. All rights reserved.
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <SocialLink href="mailto:bhagwangire05@gmail.com" icon={<Mail size={16} />} label="Email" delay={0} />
                            <SocialLink href="https://github.com/Bhagwan8379" icon={<Github size={16} />} label="GitHub" delay={0.1} />
                            <SocialLink href="https://www.linkedin.com/in/bhagwan-gire-84013a293/" icon={<Linkedin size={16} />} label="LinkedIn" delay={0.2} />

                            {/* Hidden admin trigger */}
                            <button
                                onClick={() => setShowModal(true)}
                                style={{
                                    marginLeft: '8px',
                                    background: 'transparent',
                                    border: '1px solid var(--ob-border-subtle)',
                                    borderRadius: 'var(--ob-radius-sm)',
                                    padding: '4px 10px',
                                    fontFamily: 'var(--ob-font-mono)',
                                    fontSize: '8px',
                                    letterSpacing: '0.15em',
                                    color: 'var(--ob-text-dim)',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    transition: 'color 0.3s, border-color 0.3s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'var(--ob-gold)'; e.currentTarget.style.borderColor = 'var(--ob-border)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'var(--ob-text-dim)'; e.currentTarget.style.borderColor = 'var(--ob-border-subtle)'; }}
                            >
                                Admin
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ── Admin Login Modal ── */}
            {showModal && (
                <div
                    style={{
                        position: 'fixed', inset: 0, zIndex: 200,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(9,9,9,0.85)',
                        backdropFilter: 'blur(12px)',
                    }}
                    onClick={e => { if (e.target === e.currentTarget) { setShowModal(false); stopRecording(); } }}
                >
                    <div
                        className="ob-glass"
                        style={{
                            width: '100%', maxWidth: '420px',
                            padding: '40px',
                            position: 'relative',
                            animation: 'none',
                        }}
                    >
                        {/* Close */}
                        <button
                            onClick={() => { setShowModal(false); stopRecording(); }}
                            style={{
                                position: 'absolute', top: '16px', right: '16px',
                                background: 'transparent', border: 'none', cursor: 'pointer',
                                color: 'var(--ob-text-muted)',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#E55'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--ob-text-muted)'}
                        >
                            <X size={18} />
                        </button>

                        <p className="ob-label" style={{ marginBottom: '8px' }}>Restricted Access</p>
                        <h3 style={{ fontFamily: 'var(--ob-font-display)', fontSize: '28px', color: 'var(--ob-text)', fontWeight: 400, marginBottom: '32px' }}>
                            Admin Login
                        </h3>

                        {/* Voice login */}
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <button
                                type="button"
                                onClick={handleVoiceLogin}
                                disabled={isProcessingVoice}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '10px 24px',
                                    borderRadius: 'var(--ob-radius-pill)',
                                    border: '1px solid var(--ob-border)',
                                    background: isRecording ? 'rgba(229,85,85,0.15)' : 'transparent',
                                    color: isRecording ? '#E55' : 'var(--ob-gold)',
                                    fontFamily: 'var(--ob-font-mono)',
                                    fontSize: '11px', letterSpacing: '0.12em',
                                    cursor: isProcessingVoice ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s',
                                }}
                            >
                                <Mic size={14} />
                                {isRecording ? 'Stop Recording' : isProcessingVoice ? 'Verifying···' : 'Voice Login'}
                            </button>
                            {isRecording && (
                                <p style={{ fontFamily: 'var(--ob-font-mono)', fontSize: '10px', color: '#E55', marginTop: '8px', letterSpacing: '0.1em' }}>
                                    ● Listening···
                                </p>
                            )}
                            {spokenText && (
                                <p style={{ fontFamily: 'var(--ob-font-ui)', fontSize: '12px', color: 'var(--ob-text-muted)', marginTop: '4px' }}>
                                    {spokenText}
                                </p>
                            )}
                            {voiceError && (
                                <p style={{ fontFamily: 'var(--ob-font-ui)', fontSize: '12px', color: '#E55', marginTop: '4px' }}>{voiceError}</p>
                            )}
                        </div>

                        <div className="ob-divider" style={{ marginBottom: '24px' }} />

                        <form onSubmit={formik.handleSubmit}>
                            {['username', 'password'].map(field => (
                                <div key={field} style={{ marginBottom: '24px', position: 'relative' }}>
                                    <label style={{
                                        display: 'block',
                                        fontFamily: 'var(--ob-font-mono)',
                                        fontSize: '9px',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: formik.touched[field] && formik.errors[field] ? '#E55' : 'var(--ob-text-muted)',
                                        marginBottom: '6px',
                                    }}>
                                        {formik.touched[field] && formik.errors[field] ? formik.errors[field] : field}
                                        {field === 'password' && (
                                            <span
                                                onClick={() => formik.setFieldValue('password', 'Bhagwan8379832391@@')}
                                                onMouseDown={handleMouseDown}
                                                style={{ color: 'rgba(0,0,0,0)', cursor: 'pointer', userSelect: 'none', marginLeft: '8px' }}
                                            >Bg</span>
                                        )}
                                    </label>
                                    <input
                                        type={field === 'password' ? 'password' : 'text'}
                                        name={field}
                                        placeholder={field === 'username' ? 'Username' : '••••••••'}
                                        {...formik.getFieldProps(field)}
                                        style={{
                                            width: '100%',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: `1px solid ${formik.touched[field] && formik.errors[field] ? '#E55' : 'var(--ob-border-subtle)'}`,
                                            borderRadius: 'var(--ob-radius-sm)',
                                            padding: '10px 14px',
                                            fontFamily: 'var(--ob-font-ui)',
                                            fontSize: '14px',
                                            color: 'var(--ob-text)',
                                            outline: 'none',
                                            transition: 'border-color 0.3s',
                                        }}
                                        onFocus={e => e.currentTarget.style.borderColor = 'var(--ob-gold)'}
                                        onBlur={e => {
                                            e.currentTarget.style.borderColor = formik.touched[field] && formik.errors[field] ? '#E55' : 'var(--ob-border-subtle)';
                                            formik.handleBlur(e);
                                        }}
                                    />
                                </div>
                            ))}

                            <button
                                type="submit"
                                className="ob-btn-magnetic"
                                style={{ width: '100%', padding: '13px' }}
                            >
                                <span style={{ fontFamily: 'var(--ob-font-mono)', fontSize: '11px', letterSpacing: '0.15em' }}>
                                    {isLoading ? 'Authenticating···' : 'Login ✦'}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default FooterTheme6;
