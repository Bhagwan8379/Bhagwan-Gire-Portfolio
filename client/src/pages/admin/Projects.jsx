import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from './Layout';
import { toast } from 'sonner';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAddProjectsMutation, useDeleteProjectsMutation, useGetAllProjectsQuery } from '../../redux/api/projectsApi';

const Projects = () => {
    const { isDark } = useContext(ThemeContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const { data, isError: fetchIserror, error: fetchError } = useGetAllProjectsQuery()
    const [DeleteProjects, { isSuccess, isLoading, isError, error }] = useDeleteProjectsMutation()
    const [AddProjects, { isSuccess: projectSuccess, isError: projectIsError, error: projectError, isLoading: projectLoding }] = useAddProjectsMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            desc: "",
            technology: "",
            hero: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter project name"),
            desc: yup.string().required("Enter desc"),
            technology: yup.string().required("Enter technology"),
            hero: yup.string().required("Upload Image")
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData()
            for (const keys in values) {
                fd.append(keys, values[keys])
            }
            AddProjects(fd)
            resetForm()
        }
    });

    useEffect(() => {
        if (projectSuccess) {
            toast.success("✅ Project Add Success! .", {
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
                }
            })
        }
    }, [projectSuccess]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("✅ Project Deleted! .", {
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
                }
            })
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isLoading || projectLoding) {
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
        } [isLoading || projectLoding]
    })
    useEffect(() => {
        if (isError || fetchIserror || projectIsError) {
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
    }, [isError || fetchIserror || projectIsError]);

    return (
        <div className={clsx("p-6 min-h-screen transition-all duration-500", isDark ? 'bg-black/90 text-white' : 'bg-white text-gray-900')}>
            <div className="flex justify-between items-center mb-8">
                <h1 className={clsx("text-4xl font-bold tracking-wider", isDark ? 'text-yellow-400' : 'text-rose-600')}>📁 Projects</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className={clsx("px-6 py-2 rounded-xl font-semibold shadow-xl transition-all duration-300", isDark ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-rose-500 hover:bg-rose-600 text-white')}
                >
                    + Add Project
                </button>
            </div>
            {fetchIserror || projectIsError || isError && JSON.stringify(fetchError || projectError || error, data, null, 2)}
            <div className="overflow-x-auto shadow-2xl rounded-2xl">
                <table className={clsx("min-w-full text-sm border-separate border-spacing-y-2", isDark ? 'bg-white/5 text-white' : 'bg-white text-gray-800')}>
                    <thead className={clsx("uppercase text-left text-sm", isDark ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-black' : 'bg-gradient-to-r from-pink-300 to-yellow-200 text-gray-900')}>
                        <tr>
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">description</th>
                            <th className="px-6 py-3">Technologies</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((project) => (
                                <tr key={project.id} className={clsx(isDark ? 'hover:bg-white/10' : 'hover:bg-rose-100', 'rounded-xl')}>
                                    <td className="px-6 py-4">
                                        <img
                                            src={project.hero}
                                            alt={project.name}
                                            className="w-20 h-20 object-cover rounded-xl shadow-lg border-2 border-white dark:border-yellow-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-semibold">{project.name}</td>
                                    <td className="px-6 py-4">{project.desc}</td>
                                    <td className="px-6 py-4">{project.technology}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => DeleteProjects(project._id)}
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
                                    No projects added yet.
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
                            ✨ Add New Project
                        </h2>

                        <form onSubmit={formik.handleSubmit} className="space-y-5">
                            <input
                                type="text"
                                name="name"
                                placeholder="Project Name"
                                onChange={formik.handleChange}
                                {...formik.getFieldProps("name")}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className={clsx("w-full p-3 rounded-xl border focus:outline-none",
                                    isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-black"
                                )}
                            />
                            {formik.touched.name && formik.errors.name && <p className="text-red-400 text-sm">{formik.errors.name}</p>}

                            <textarea
                                name="desc"
                                placeholder="desc"
                                onChange={formik.handleChange}
                                {...formik.getFieldProps("desc")}
                                onBlur={formik.handleBlur}
                                value={formik.values.desc}
                                className={clsx("w-full p-3 rounded-xl border focus:outline-none",
                                    isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-black"
                                )}
                            />
                            {formik.touched.desc && formik.errors.desc && <p className="text-red-400 text-sm">{formik.errors.desc}</p>}

                            <input
                                type="text"
                                name="technology"
                                placeholder="technology (comma separated)"
                                onChange={formik.handleChange}
                                {...formik.getFieldProps("technology")}
                                onBlur={formik.handleBlur}
                                value={formik.values.technology}
                                className={clsx("w-full p-3 rounded-xl border focus:outline-none",
                                    isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-black"
                                )}
                            />
                            {formik.touched.technology && formik.errors.technology && <p className="text-red-400 text-sm">{formik.errors.technology}</p>}

                            <div>
                                <label className="block font-medium mb-2">Project Image</label>
                                <input
                                    type="file"
                                    name='hero'
                                    accept="image/*"
                                    placeholder='Choose Image'
                                    onChange={e => formik.setFieldValue("hero", e.currentTarget.files[0])}
                                    className={clsx("w-full bg-white p-2 rounded-lg border",
                                        isDark ? "dark:bg-zinc-800 border-zinc-700 text-white" : "border-gray-300 text-black"
                                    )}
                                />
                                {formik.touched.hero && formik.errors.hero && <p className="text-red-400 text-sm">{formik.errors.hero}</p>}
                            </div>

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

export default Projects;


