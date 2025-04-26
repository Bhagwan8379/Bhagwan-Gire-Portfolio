// import React, { useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import clsx from 'clsx';
// import { useSendMessageMutation } from '../redux/api/contactApi';
// import { toast } from 'sonner';

// const Contact = ({ isDark }) => {
//     const [SendMessage, { isSuccess, isError, isLoading, error }] = useSendMessageMutation()
//     const formik = useFormik({
//         initialValues: {
//             name: "",
//             email: "",
//             message: ""
//         },
//         validationSchema: yup.object({
//             name: yup.string().required("Enter your name"),
//             email: yup.string().email("Invalid email").required("Enter your email"),
//             message: yup.string().required("Write your message")
//         }),
//         onSubmit: (values, { resetForm }) => {
//             SendMessage(values)
//             resetForm();
//         }
//     });


//     useEffect(() => {
//         if (isLoading) {
//             toast.info("Please wait...", {
//                 duration: 500,
//                 style: {
//                     background: 'linear-gradient(to right, #36d1dc, #5b86e5)', // sky blue gradient
//                     color: '#ffffff',
//                     borderRadius: '12px',
//                     padding: '14px 24px',
//                     fontWeight: 'bold',
//                     fontSize: '16px',
//                     boxShadow: '0 6px 16px rgba(91, 134, 229, 0.4)', // soft blue glow
//                     border: '1px solid #5b86e5',
//                     animation: 'fadeInUp 0.6s ease-out',
//                 }
//             })
//         } [isLoading]
//     })
//     useEffect(() => {
//         if (isSuccess) {
//             toast.success("✅ Message Send Success! .", {
//                 duration: 1000,
//                 style: {
//                     background: 'linear-gradient(to right, #11998e, #38ef7d)', // rich green gradient
//                     color: '#ffffff',
//                     borderRadius: '12px',
//                     padding: '14px 24px',
//                     fontWeight: 'bold',
//                     fontSize: '16px',
//                     boxShadow: '0 6px 16px rgba(56, 239, 125, 0.4)', // soft green glow
//                     border: '1px solid #38ef7d',
//                     animation: 'fadeInUp 0.6s ease-out',
//                 },
//             });
//         }
//     }, [isSuccess]);
//     useEffect(() => {
//         if (isError) {
//             toast.error("❌ Something went wrong!", {
//                 duration: 1000,
//                 style: {
//                     background: 'linear-gradient(to right, #e52d27, #b31217)', // rich red gradient
//                     color: '#ffffff',
//                     borderRadius: '12px',
//                     padding: '14px 24px',
//                     fontWeight: 'bold',
//                     fontSize: '16px',
//                     boxShadow: '0 6px 16px rgba(229, 45, 39, 0.4)', // soft red glow
//                     border: '1px solid #e52d27',
//                     animation: 'fadeInUp 0.6s ease-out',
//                 },
//             });
//         }
//     }, [isError]);

//     return (
//         <div className={clsx(
//             'flex min-h-screen font-sans transition-all duration-500 border',
//             isDark ? 'bg-[#0d0d0d] border-white text-white' : 'bg-white border-black text-black'
//         )}>
//             {isError && JSON.stringify(error, null, 2)}
//             {/* Left Section */}
//             <div className={clsx(
//                 'min-h-screen flex flex-col items-center justify-center transition-all duration-500 p-6',
//                 isDark ? 'bg-black text-white' : 'bg-gradient-to-br from-indigo-200 via-indigo-200 to-indigo-200 text-black'
//             )}>
//                 <div className="text-center animate-fade-in-up">
//                     <h1
//                         className="text-5xl font-extrabold mb-4 tracking-tight"
//                         style={{ fontFamily: 'Playfair Display, serif' }}
//                     >
//                         👋 Let's Connect!
//                     </h1>
//                     <p
//                         className="text-lg max-w-xl mx-auto font-medium"
//                         style={{ fontFamily: 'Inter, sans-serif' }}
//                     >
//                         I’m always open to new ideas 💡, creative projects 🎨, or just a friendly chat ☕.
//                         Let’s build something amazing together 🚀!
//                     </p>
//                 </div>
//             </div>

//             {/* Right Section */}
//             <div className={clsx(
//                 'w-1/2 p-10 flex items-center',
//                 isDark ? 'bg-[#262626] border-indigo-500' : 'border-black bg-indigo-200'
//             )}>
//                 <div
//                     className="w-full max-w-lg mx-auto"
//                     style={{ fontFamily: 'Inter, sans-serif' }}
//                 >
//                     <h2
//                         className="text-3xl font-bold mb-2"
//                         style={{ fontFamily: 'Playfair Display, serif' }}
//                     >
//                         Contact us
//                     </h2>
//                     <p className="text-sm mb-6">
//                         Interested in trying one? Use the form below to get in touch.
//                     </p>

//                     <form onSubmit={formik.handleSubmit} className="space-y-4">
//                         <div className='gap-2 flex'>
//                             <div className="w-1/2">
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     placeholder="Name"
//                                     className={clsx("w-full p-2 rounded border", formik.errors.name && formik.touched.name ? "border-red-500" : "border")}
//                                     value={formik.values.name}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                 />
//                                 {formik.touched.name && formik.errors.name && (
//                                     <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
//                                 )}
//                             </div>
//                             <div className="w-1/2">
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     placeholder="Email"
//                                     className={clsx("w-full p-2 rounded border", formik.errors.email && formik.touched.email ? "border-red-500" : "border")}
//                                     value={formik.values.email}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                 />
//                                 {formik.touched.email && formik.errors.email && (
//                                     <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
//                                 )}
//                             </div>
//                         </div>
//                         <div>
//                             <textarea
//                                 name="message"
//                                 placeholder="Message"
//                                 rows={5}
//                                 className={clsx("w-full p-2 rounded border", formik.errors.message && formik.touched.message ? "border-red-500" : "border")}
//                                 value={formik.values.message}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                             />
//                             {formik.touched.message && formik.errors.message && (
//                                 <p className="text-red-500 text-xs mt-1">{formik.errors.message}</p>
//                             )}
//                         </div>

//                         <button
//                             type="submit"
//                             className="bg-black text-white px-6 py-2 mt-2 rounded hover:opacity-80 transition"
//                         >
//                             Submit
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Contact;










import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { useSendMessageMutation } from '../redux/api/contactApi';
import { toast } from 'sonner';

const Contact = ({ isDark }) => {
    const [SendMessage, { isSuccess, isError, isLoading, error }] = useSendMessageMutation();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter your name"),
            email: yup.string().email("Invalid email").required("Enter your email"),
            message: yup.string().required("Write your message")
        }),
        onSubmit: (values, { resetForm }) => {
            SendMessage(values);
            resetForm();
        }
    });

    useEffect(() => {
        if (isLoading) {
            toast.info("Please wait...", {
                duration: 500,
                style: {
                    background: 'linear-gradient(to right, #36d1dc, #5b86e5)',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '14px 24px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: '0 6px 16px rgba(91, 134, 229, 0.4)',
                    border: '1px solid #5b86e5',
                    animation: 'fadeInUp 0.6s ease-out',
                }
            });
        }
    }, [isLoading]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("✅ Message Send Success!", {
                duration: 1000,
                style: {
                    background: 'linear-gradient(to right, #11998e, #38ef7d)',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '14px 24px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: '0 6px 16px rgba(56, 239, 125, 0.4)',
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
                    background: 'linear-gradient(to right, #e52d27, #b31217)',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '14px 24px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: '0 6px 16px rgba(229, 45, 39, 0.4)',
                    border: '1px solid #e52d27',
                    animation: 'fadeInUp 0.6s ease-out',
                },
            });
        }
    }, [isError]);

    return (
        <div className={clsx(
            'flex flex-col md:flex-row min-h-screen font-sans transition-all duration-500 border',
            isDark ? 'bg-[#0d0d0d] border-white text-white' : 'bg-white border-black text-black'
        )}>
            {/* Left Section */}
            <div className={clsx(
                'w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-10 transition-all duration-500',
                isDark ? 'bg-black text-white' : 'bg-gradient-to-br from-indigo-200 via-indigo-200 to-indigo-200 text-black'
            )}>
                <div className="text-center animate-fade-in-up px-4">
                    <h1
                        className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                        👋 Let's Connect!
                    </h1>
                    <p
                        className="text-base md:text-lg max-w-xl mx-auto font-medium"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        Thanks for stopping by! 😊 Whether you have a project idea, a question, or just want to say hi — feel free to reach out. I’m always open to new opportunities, collaborations, and connecting with new people. Let’s create something amazing together!💻
                    </p>
                </div>
            </div>

            {/* Right Section */}
            <div className={clsx(
                'w-full md:w-1/2 p-6 md:p-10 flex items-center',
                isDark ? 'bg-[#262626] border-indigo-500' : 'border-black bg-indigo-200'
            )}>
                <div className="w-full max-w-lg mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <h2
                        className="text-2xl md:text-3xl font-bold mb-2"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                        Contact us
                    </h2>
                    <p className="text-sm mb-6">
                        Interested in trying one? Use the form below to get in touch.
                    </p>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="w-full md:w-1/2">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className={clsx("w-full p-2 rounded border", formik.errors.name && formik.touched.name ? "border-red-500" : "border")}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                                )}
                            </div>
                            <div className="w-full md:w-1/2">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className={clsx("w-full p-2 rounded border", formik.errors.email && formik.touched.email ? "border-red-500" : "border")}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <textarea
                                name="message"
                                placeholder="Message"
                                rows={5}
                                className={clsx("w-full p-2 rounded border", formik.errors.message && formik.touched.message ? "border-red-500" : "border")}
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.message && formik.errors.message && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-2 mt-2 rounded hover:opacity-80 transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
