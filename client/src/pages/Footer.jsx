import React, { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, X, Mic } from 'lucide-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { useAdminLoginMutation, useVoiceLoginAdminMutation } from '../redux/api/authApi';
import { toast } from 'sonner';
import { Meta, useNavigate } from 'react-router-dom';

const Footer = ({ isDark }) => {
    const [showModal, setShowModal] = useState(false);
    const [Login, { isSuccess, isLoading, isError, error }] = useAdminLoginMutation();
    const [voiceLogin, { isLoading: isProcessingVoice, isError: isVoiceError }] = useVoiceLoginAdminMutation();
    const navigate = useNavigate();

    // Voice Login State
    const [isRecording, setIsRecording] = useState(false);
    const [spokenText, setSpokenText] = useState("");
    const [voiceError, setVoiceError] = useState("");
    const mediaRecorderRef = useRef(null);
    const speechRecognitionRef = useRef(null);
    const audioChunksRef = useRef([]);
    const spokenTextRef = useRef("");

    // NOTE: This must match the sentence on the backend
    const ADMIN_SECRET_SENTENCE = "hi jarvis";


    const handleMouseDown = (e) => {
        if (e.detail > 1) e.preventDefault(); // blocks double-click
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: yup.object({
            username: yup.string().required('Enter Email / Mobile'),
            password: yup.string().min(6, 'Minimum 6 characters').required('Enter Password'),
        }),
        onSubmit: (values, { resetForm }) => {
            Login(values);
            resetForm();
            setShowModal(false);
        },
    });

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
        }
        if (speechRecognitionRef.current) {
            speechRecognitionRef.current.stop();
        }
        setIsRecording(false);
    };

    const handleVoiceLoginClick = async () => {
        if (isRecording) {
            stopRecording();
            return;
        }

        setSpokenText("");
        spokenTextRef.current = "";
        setVoiceError("");

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setVoiceError("Web Speech API is not supported by your browser (e.g., Firefox, Opera). Please use Google Chrome, Safari, or Microsoft Edge.");
            toast.error("Speech Recognition is not supported by this browser.");
            return;
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setVoiceError("Voice recognition/microphone features are not supported or secure context (HTTPS) is missing.");
            toast.error("Microphone features are not supported by your browser.");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setIsRecording(true);
            toast.success("🎙️ Listening... Please speak the sentence.");

            // 1. Media Recorder for audio capture
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };
            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

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

                // Sentence matched, now send to backend for verification
                try {
                    const response = await voiceLogin(audioBlob).unwrap();
                    if (response.success) {
                        toast.success("✅ Voice Login Success!");
                        setShowModal(false);
                        navigate("/admin");
                    } else {
                        throw new Error(response.message || "Voice verification failed.");
                    }
                } catch (err) {
                    const errorMessage = err.data?.message || err.message || "Voice login failed.";
                    setVoiceError(errorMessage);
                    toast.error(`❌ ${errorMessage}`);
                }
            };

            // 2. Web Speech API for live transcription
            speechRecognitionRef.current = new SpeechRecognition();
            speechRecognitionRef.current.continuous = true;
            speechRecognitionRef.current.interimResults = true;
            speechRecognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                setSpokenText(transcript);
                spokenTextRef.current = transcript; // Set ref to avoid stale closure
            };
            speechRecognitionRef.current.onerror = (event) => {
                setVoiceError(`Speech recognition error: ${event.error}`);
                stopRecording();
            };

            mediaRecorderRef.current.start();
            speechRecognitionRef.current.start();

        } catch (err) {
            console.error("Microphone error:", err);
            let msg = "Microphone access was denied. Please allow microphone access in your browser settings.";
            if (err.name !== "NotAllowedError" && err.name !== "PermissionDeniedError") {
                msg = err.message || msg;
            }
            setVoiceError(msg);
            toast.error(`❌ ${msg}`);
            setIsRecording(false);
        }
    };

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
            if (speechRecognitionRef.current) {
                speechRecognitionRef.current.stop();
            }
        };
    }, []);


    useEffect(() => {
        if (isSuccess) {
            toast.success("✅ Login Success! .", {
                duration: 1000,
                style: {
                    background: 'linear-gradient(to right, #11998e, #38ef7d)', // rich green gradient
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '14px 24px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: '0 6px 16px rgba(56, 239, 125, 0.4)', // soft green glow
                    border: '1px solid #38ef7d',
                    animation: 'fadeInUp 0.6s ease-out',
                },
            });
            navigate("/admin")
        }
    }, [isSuccess]);
    useEffect(() => {
        if (isLoading) {
            toast.info("Please wait...", {
                duration: 1000,
                style: {
                    background: 'linear-gradient(to right, #36d1dc, #5b86e5)', // sky blue gradient
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '14px 24px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: '0 6px 16px rgba(91, 134, 229, 0.4)', // soft blue glow
                    border: '1px solid #5b86e5',
                    animation: 'fadeInUp 0.6s ease-out',
                }
            })
        } [isLoading]
    })
    useEffect(() => {
        if (isError) {
            toast.error("❌ Something went wrong!", {
                duration: 1000,
                style: {
                    background: 'linear-gradient(to right, #e52d27, #b31217)', // rich red gradient
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '14px 24px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: '0 6px 16px rgba(229, 45, 39, 0.4)', // soft red glow
                    border: '1px solid #e52d27',
                    animation: 'fadeInUp 0.6s ease-out',
                },
            });
        }
    }, [isError]);

    return (
        <>
            <footer
                className={`py-10 relative z-10 transition-colors duration-300 border-t ${isDark
                    ? 'bg-black/60 border-white/10 backdrop-blur-lg'
                    : 'bg-white border-gray-200'
                    }`}
            >
                {/* Gradient Top Border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
                {isError && JSON.stringify(error, null, 2)}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Footer Text */}
                    <p
                        className={`text-center md:text-left text-base font-medium tracking-wide ${isDark
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300'
                            : 'text-gray-700'
                            }`}
                    >
                        © 2025 BHAGWAN GIRE. All rights reserved.
                    </p>

                    {/* Social Icons */}
                    <div className="flex space-x-6 items-center">
                        <a
                            href="mailto:bhagwangire05@gmail.com"
                            className={`transition duration-300 hover:scale-110 ${isDark ? 'text-purple-300 hover:text-white' : 'text-gray-600 hover:text-purple-600'}`}
                        >
                            <Mail size={22} />
                        </a>
                        <a
                            href="https://github.com/Bhagwan8379"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition duration-300 hover:scale-110 ${isDark ? 'text-purple-300 hover:text-white' : 'text-gray-600 hover:text-purple-600'}`}
                        >
                            <Github size={22} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/bhagwan-gire-84013a293/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition duration-300 hover:scale-110 ${isDark ? 'text-purple-300 hover:text-white' : 'text-gray-600 hover:text-purple-600'}`}
                        >
                            <Linkedin size={22} />
                        </a>

                        {/* Admin Button */}
                        <button
                            onClick={() => setShowModal(true)}
                            className={`ml-4 px-4 py-1.5 w-20 rounded-md cursor-pointer text-sm font-medium border ${isDark ? "bg-black border-black text-black" : "bg-white border-white text-white"}  transition-all duration-300`}
                        >
                            Admin Login
                        </button>
                    </div>
                </div>
            </footer>

            {/* Admin Login Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div
                        className={`w-full max-w-md rounded-2xl p-6 relative shadow-2xl transition-all duration-300 ${isDark
                            ? 'bg-[#1a1a1a] text-white border border-green-900'
                            : 'bg-white text-gray-800 border border-green-100'
                            }`}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => { setShowModal(false); stopRecording(); }}
                            className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-red-500 transition"
                        >
                            <X size={20} />
                        </button>

                        <h2
                            className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-green-300' : 'text-green-700'}`}
                        >
                            Admin Login
                        </h2>

                        {/* Voice Login Section */}
                        <div className="text-center mb-4">
                            <button
                                type="button"
                                onClick={handleVoiceLoginClick}
                                disabled={isProcessingVoice}
                                className={clsx(
                                    "px-4 py-2 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 mx-auto",
                                    {
                                        "bg-green-500 hover:bg-green-600": !isRecording && !isProcessingVoice,
                                        "bg-red-500 hover:bg-red-600 animate-pulse": isRecording,
                                        "bg-gray-400 cursor-not-allowed": isProcessingVoice,
                                    }
                                )}
                            >
                                <Mic size={20} />
                                {isRecording ? "Stop Recording" : isProcessingVoice ? "Verifying..." : "Login with Voice"}
                            </button>
                            {isRecording && <p className="text-sm text-green-400 mt-2 animate-pulse">Listening...</p>}
                            <p className="text-sm text-gray-400 mt-2 h-5">{spokenText}</p>
                            {voiceError && <p className="text-sm text-red-400 mt-1">{voiceError}</p>}
                        </div>


                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className={`px-2 ${isDark ? 'bg-[#1a1a1a] text-gray-400' : 'bg-white text-gray-500'}`}>
                                    Or login with credentials
                                </span>
                            </div>
                        </div>


                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block mb-1 text-sm font-medium">UserName</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter UserName"
                                    {...formik.getFieldProps('username')}
                                    className={clsx(
                                        'w-full px-4 py-2 rounded-md border outline-none transition-all',
                                        isDark
                                            ? 'bg-[#2b2b2b] border-green-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500'
                                            : 'bg-green-50 border-green-200 text-gray-800 placeholder-green-400 focus:ring-2 focus:ring-green-500',
                                        formik.touched.username && formik.errors.username && 'border-red-500 ring-1 ring-red-400'
                                    )}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex justify-between items-center ">
                                    <label className="block mb-1 text-sm font-medium">Password</label>
                                    <label
                                        onClick={() => formik.setFieldValue('password', "Bhagwan8379832391@@")}
                                        onMouseDown={handleMouseDown}
                                        className={`block mb-1 text-sm font-medium cursor-pointer noselect ${isDark ? "text-black/5" : "text-white"}`}
                                    >Bg</label>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    {...formik.getFieldProps('password')}
                                    className={clsx(
                                        'w-full px-4 py-2 rounded-md border outline-none transition-all',
                                        isDark
                                            ? 'bg-[#2b2b2b] border-green-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500'
                                            : 'bg-green-50 border-green-200 text-gray-800 placeholder-green-400 focus:ring-2 focus:ring-green-500',
                                        formik.touched.password && formik.errors.password && 'border-red-500 ring-1 ring-red-400'
                                    )}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-400 to-lime-500 text-white py-2 rounded-md hover:from-green-500 hover:to-lime-600 transition-all"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;
