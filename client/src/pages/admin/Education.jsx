import React, { useState, useContext } from 'react';
import { ThemeContext } from './Layout';
import { toast } from 'sonner';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';

const initialEducation = [
    {
        id: 1,
        degree: "Bachelor of Science",
        stream: "Computer Science",
        university: "ABC University",
        fromYear: "2016",
        toYear: "2020",
    },
    {
        id: 2,
        degree: "Master of Science",
        stream: "Data Science",
        university: "XYZ University",
        fromYear: "2021",
        toYear: "2023",
    },
];

const Education = () => {
    const { isDark } = useContext(ThemeContext);
    const [education, setEducation] = useState(initialEducation);
    const [isModalOpen, setModalOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            degree: "",
            stream: "",
            university: "",
            fromYear: "",
            toYear: ""
        },
        validationSchema: yup.object({
            degree: yup.string().required("Enter degree name"),
            stream: yup.string().required("Enter stream name"),
            university: yup.string().required("Enter university name"),
            fromYear: yup.string().required("Enter from year"),
            toYear: yup.string().required("Enter to year")
        }),
        onSubmit: (values, { resetForm }) => {
            const newEducation = {
                ...values,
                id: Date.now()
            };

            setEducation([...education, newEducation]);
            toast.success("Education added successfully");
            resetForm();
            setModalOpen(false);
        }
    });

    const handleDelete = (id) => {
        setEducation(education.filter(edu => edu.id !== id));
        toast.success("Education deleted");
    };

    return (
        <div className={clsx("p-6 min-h-screen transition-all duration-500", isDark ? 'bg-black/90 text-white' : 'bg-white text-gray-900')}>
            <div className="flex justify-between items-center mb-8">
                <h1 className={clsx("text-4xl font-bold tracking-wider", isDark ? 'text-yellow-400' : 'text-rose-600')}>🎓 Education</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className={clsx("px-6 py-2 rounded-xl font-semibold shadow-xl transition-all duration-300", isDark ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-rose-500 hover:bg-rose-600 text-white')}
                >
                    + Add Education
                </button>
            </div>

            <div className="overflow-x-auto shadow-2xl rounded-2xl">
                <table className={clsx("min-w-full text-sm border-separate border-spacing-y-2", isDark ? 'bg-white/5 text-white' : 'bg-white text-gray-800')}>
                    <thead className={clsx("uppercase text-left text-sm", isDark ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-black' : 'bg-gradient-to-r from-pink-300 to-yellow-200 text-gray-900')}>
                        <tr>
                            <th className="px-6 py-3">Degree</th>
                            <th className="px-6 py-3">Stream</th>
                            <th className="px-6 py-3">University</th>
                            <th className="px-6 py-3">Years</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {education.length > 0 ? (
                            education.map((edu) => (
                                <tr key={edu.id} className={clsx(isDark ? 'hover:bg-white/10' : 'hover:bg-rose-100', 'rounded-xl')}>
                                    <td className="px-6 py-4 font-semibold">{edu.degree}</td>
                                    <td className="px-6 py-4">{edu.stream}</td>
                                    <td className="px-6 py-4">{edu.university}</td>
                                    <td className="px-6 py-4">{edu.fromYear} - {edu.toYear}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleDelete(edu.id)}
                                            className={clsx("px-4 py-2 rounded-lg text-white transition-all duration-300", isDark ? 'bg-red-500 hover:bg-red-600' : 'bg-rose-500 hover:bg-rose-600')}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-8 italic opacity-70">
                                    No education added yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm px-4">
                    <div className={clsx(
                        "w-full max-w-lg rounded-2xl p-6 shadow-2xl border-2 transition-all duration-500",
                        isDark
                            ? "bg-gradient-to-br from-zinc-900 to-black border-yellow-500 text-white"
                            : "bg-gradient-to-br from-white via-rose-100 to-yellow-50 border-rose-300 text-gray-900"
                    )}>
                        <h2 className={clsx("text-3xl font-bold mb-4 text-center tracking-wide",
                            isDark ? "text-yellow-400" : "text-rose-600"
                        )}>
                            ✨ Add New Education
                        </h2>

                        <form onSubmit={formik.handleSubmit} className="space-y-5">
                            <input
                                type="text"
                                name="degree"
                                placeholder="Degree"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.degree}
                                className={clsx("w-full p-3 rounded-xl border focus:outline-none",
                                    isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-black"
                                )}
                            />
                            {formik.touched.degree && formik.errors.degree && <p className="text-red-400 text-sm">{formik.errors.degree}</p>}

                            <input
                                type="text"
                                name="stream"
                                placeholder="Stream"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.stream}
                                className={clsx("w-full p-3 rounded-xl border focus:outline-none",
                                    isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-black"
                                )}
                            />
                            {formik.touched.stream && formik.errors.stream && <p className="text-red-400 text-sm">{formik.errors.stream}</p>}

                            <input
                                type="text"
                                name="university"
                                placeholder="University/College"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.university}
                                className={clsx("w-full p-3 rounded-xl border focus:outline-none",
                                    isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-black"
                                )}
                            />
                            {formik.touched.university && formik.errors.university && <p className="text-red-400 text-sm">{formik.errors.university}</p>}

                            <input
                                type="text"
                                name="fromYear"
                                placeholder="From Year"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.fromYear}
                                className={clsx("w-full p-3 rounded-xl border focus:outline-none",
                                    isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-black"
                                )}
                            />
                            {formik.touched.fromYear && formik.errors.fromYear && <p className="text-red-400 text-sm">{formik.errors.fromYear}</p>}

                            <input
                                type="text"
                                name="toYear"
                                placeholder="To Year"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.toYear}
                                className={clsx("w-full p-3 rounded-xl border focus:outline-none",
                                    isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-black"
                                )}
                            />
                            {formik.touched.toYear && formik.errors.toYear && <p className="text-red-400 text-sm">{formik.errors.toYear}</p>}

                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setModalOpen(false);
                                        formik.resetForm();
                                    }}
                                    className={clsx("px-4 py-2 rounded-lg border transition-all duration-300",
                                        isDark
                                            ? "border-yellow-400 hover:bg-yellow-600 text-white"
                                            : "border-rose-400 hover:bg-rose-100 text-rose-700"
                                    )}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={clsx("px-5 py-2 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg",
                                        isDark
                                            ? "bg-yellow-500 hover:bg-yellow-600"
                                            : "bg-rose-500 hover:bg-rose-600"
                                    )}
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Education;
