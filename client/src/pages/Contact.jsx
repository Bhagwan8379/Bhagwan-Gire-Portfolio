import React, { useEffect } from 'react';
import * as yup from 'yup';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useSendMessageMutation } from '../redux/api/contactApi';
import { toast } from 'sonner';

const Contact = ({ isDark }) => {
    const [SendMessage, { isSuccess, isError, isLoading, error }] = useSendMessageMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            email: yup.string().email("Invalid Email").required("Enter Email"),
            message: yup.string().required("Enter Message"),
        }),
        onSubmit: (values, { resetForm }) => {
            SendMessage(values)
            resetForm();
        },
    });

    const inputClass = (field) =>
        clsx(
            "w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600",
            isDark
                ? "bg-gray-800 focus:bg-gray-700 border-gray-700 text-white placeholder-gray-400"
                : "bg-gray-50 focus:bg-white border-gray-200 text-gray-800",
            formik.touched[field] && formik.errors[field] && "border-red-500"
        );

    useEffect(() => {
        if (isLoading) {
            toast.info("Please wait...", {
                duration: 500,
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
        if (isSuccess) {
            toast.success("✅ Message Send Success! .", {
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
        }
    }, [isSuccess]);
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
        <section id="contact" className="py-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={clsx(
                        "rounded-xl p-8 transition-all duration-300 shadow-xl",
                        isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-gray-900"
                    )}
                >
                    {isError && JSON.stringify(error, null, 2)}
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                        Get in Touch
                    </h2>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...formik.getFieldProps("name")}
                                className={inputClass("name")}
                                placeholder="Your Name"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...formik.getFieldProps("email")}
                                className={inputClass("email")}
                                placeholder="your@email.com"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                {...formik.getFieldProps("message")}
                                className={inputClass("message")}
                                placeholder="Write your message here..."
                            />
                            {formik.touched.message && formik.errors.message && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
