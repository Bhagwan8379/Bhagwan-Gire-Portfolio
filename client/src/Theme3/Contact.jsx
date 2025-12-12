import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSendMessageMutation } from '../redux/api/contactApi';
import { toast } from 'sonner';

const Contact = () => {
    const [SendMessage, { isSuccess, isError, isLoading }] = useSendMessageMutation();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("IDENTITY REQUESTED"),
            email: yup.string().email("INVALID PROTOCOL").required("TARGET ADDRESS REQUIRED"),
            message: yup.string().required("DATA PACKET EMPTY")
        }),
        onSubmit: (values, { resetForm }) => {
            SendMessage(values);
            resetForm();
        }
    });

    useEffect(() => {
        if (isSuccess) toast.success("[SUCCESS]: TRANSMISSION COMPLETE");
        if (isError) toast.error("[ERROR]: CONNECTION FAILED");
    }, [isSuccess, isError]);

    return (
        <section id="contact" className="min-h-screen bg-black text-green-500 font-mono py-20 px-4 border-t border-green-900/30 flex items-center justify-center">
            <div className="w-full max-w-4xl border border-green-500 rounded bg-gray-900/50 shadow-[0_0_30px_rgba(0,255,0,0.1)] backdrop-blur-sm">

                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-green-500 bg-gray-900">
                    <span className="text-sm">ROOT@SERVER: ~/SEND_MESSAGE.EXE</span>
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                </div>

                <div className="p-8">
                    <p className="mb-6 opacity-70">
                        {'>'} ESTABLISHING SECURE CONNECTION... [OK] <br />
                        {'>'} ENTER CREDENTIALS TO INITIALIZE UPLINK...
                    </p>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <label className="block text-xs mb-1 opacity-70">USER_ID (NAME)</label>
                                <div className="absolute left-0 top-8 text-green-700 pl-3 pt-1 pointer-events-none">{'>'}</div>
                                <input
                                    type="text"
                                    name="name"
                                    className={`w-full bg-black border ${formik.errors.name && formik.touched.name ? 'border-red-500' : 'border-green-800 focus:border-green-500'} text-green-400 pl-8 pr-4 py-3 outline-none transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]`}
                                    placeholder="Enter Name"
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="text-red-500 text-xs mt-1 animate-pulse">{formik.errors.name}</div>
                                )}
                            </div>

                            <div className="relative group">
                                <label className="block text-xs mb-1 opacity-70">DESTINATION (EMAIL)</label>
                                <div className="absolute left-0 top-8 text-green-700 pl-3 pt-1 pointer-events-none">{'>'}</div>
                                <input
                                    type="email"
                                    name="email"
                                    className={`w-full bg-black border ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-green-800 focus:border-green-500'} text-green-400 pl-8 pr-4 py-3 outline-none transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]`}
                                    placeholder="Enter Email"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-500 text-xs mt-1 animate-pulse">{formik.errors.email}</div>
                                )}
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block text-xs mb-1 opacity-70">PAYLOAD (MESSAGE)</label>
                            <div className="absolute left-0 top-8 text-green-700 pl-3 pt-1 pointer-events-none">{'>'}</div>
                            <textarea
                                name="message"
                                rows="5"
                                className={`w-full bg-black border ${formik.errors.message && formik.touched.message ? 'border-red-500' : 'border-green-800 focus:border-green-500'} text-green-400 pl-8 pr-4 py-3 outline-none transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]`}
                                placeholder="Enter Message Data..."
                                {...formik.getFieldProps('message')}
                            ></textarea>
                            {formik.touched.message && formik.errors.message && (
                                <div className="text-red-500 text-xs mt-1 animate-pulse">{formik.errors.message}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-green-900/30 border border-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 font-bold tracking-widest uppercase flex items-center justify-center group"
                        >
                            {isLoading ? (
                                <span className="animate-pulse">TRANSMITTING...</span>
                            ) : (
                                <>
                                    <span>[ EXECUTE_SEND ]</span>
                                    <span className="ml-2 group-hover:translate-x-2 transition-transform">{'>'}</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
