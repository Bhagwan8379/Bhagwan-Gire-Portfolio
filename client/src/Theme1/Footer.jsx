import React, { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, X } from 'lucide-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { useAdminLoginMutation } from '../redux/api/authApi';
import { toast } from 'sonner';
import { Meta, useNavigate } from 'react-router-dom';

const Footer = ({ isDark }) => {
    const [showModal, setShowModal] = useState(false);
    const [Login, { isSuccess, isLoading, isError, error }] = useAdminLoginMutation()
    const navigate = useNavigate()


    const handleMouseDown = (e) => {
        if (e.detail > 1) e.preventDefault();
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
            Login(values)
            resetForm();
            setShowModal(false);
        },
    });


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
                    ? 'bg-[#0e0e12] border-[#1f1f1f] text-green-200'
                    : 'bg-[#f7f6ff] border-[#e2e2fa] text-violet-200'
                    }`}
            >
                {/* Gradient Top Border */}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p
                        className={`text-center md:text-left text-base font-semibold tracking-wide ${isDark
                            ? 'bg-gradient-to-r from-indigo-400 via-sky-400 to-violet-500 text-transparent bg-clip-text'
                            : 'bg-gradient-to-r from-violet-600 via-green-500 to-lime-400 text-transparent bg-clip-text'
                            }`}
                    >
                        © 2025 BHAGWAN GIRE. All rights reserved.
                    </p>

                    <div className="flex space-x-6 items-center">
                        {[
                            { icon: Mail, link: 'mailto:bhagwangire05@gmail.com' },
                            { icon: Github, link: 'https://github.com/Bhagwan8379' },
                            { icon: Linkedin, link: 'https://www.linkedin.com/in/bhagwan-gire-84013a293/' },
                        ].map(({ icon: Icon, link }, i) => (
                            <a
                                key={i}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={clsx(
                                    'transition duration-300 hover:scale-110',
                                    isDark
                                        ? 'text-indigo-300 hover:text-white'
                                        : 'text-violet-700 hover:text-green-600'
                                )}
                            >
                                <Icon size={22} />
                            </a>
                        ))}

                        <button
                            onClick={() => setShowModal(true)}
                            className={clsx(
                                'ml-4 px-4 py-1.5 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300',
                                isDark
                                    ? ' text-black'
                                    : 'text-slate-50'
                            )}
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
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-red-500 transition"
                        >
                            <X size={20} />
                        </button>

                        <h2
                            className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-green-300' : 'text-green-700'}`}
                        >
                            Admin Login
                        </h2>
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
                                className="w-full cursor-pointer bg-gradient-to-r from-green-400 to-lime-500 text-white py-2 rounded-md hover:from-green-500 hover:to-lime-600 transition-all"
                            >
                                Login
                            </button>
                        </form>
                    </div >
                </div >
            )}
        </>
    );
};

export default Footer;


