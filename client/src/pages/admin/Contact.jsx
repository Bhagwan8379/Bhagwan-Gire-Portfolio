import React, { useContext, useEffect } from 'react';
import { useDeleteMessageMutation, useGetAllMessagesQuery, useLazyGetAllMessagesQuery } from '../../redux/api/contactApi';
import { toast } from 'sonner';
import { ThemeContext } from './Layout';


const Contact = () => {
    const { isDark } = useContext(ThemeContext);
    const { data, isError, error } = useGetAllMessagesQuery();
    const [Delete, { isSuccess, isError: contactisError, isLoading, error: contactError }] = useDeleteMessageMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success("✅ Delete Success! .", {
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
        if (isError || contactisError) {
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
    }, [isError || contactisError]);

    return (
        <div
            className={`min-h-screen p-6 rounded-xl transition-all duration-500 ${isDark
                ? 'bg-transparent'
                : 'bg-transparent'
                }`}
        >
            <h1
                className={`text-4xl font-bold text-center mb-10 tracking-wide ${isDark ? 'text-yellow-400' : 'text-rose-600'
                    }`}
            >
                📇 Contact List
            </h1>

            {isError || contactisError && (
                <pre className="text-red-400 bg-red-900/30 p-4 rounded-lg mb-6">{JSON.stringify(error || contactError, null, 2)}</pre>
            )}

            <div className="overflow-x-auto shadow-xl rounded-xl">
                <table
                    className={`min-w-full text-sm rounded-xl transition-all ${isDark ? 'bg-white/5 text-white' : 'bg-white text-gray-800'
                        }`}
                >
                    <thead
                        className={`uppercase tracking-wide text-left ${isDark
                            ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-black'
                            : 'bg-gradient-to-r from-pink-300 to-yellow-200 text-gray-900'
                            }`}
                    >
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Message</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllMessages?.length > 0 ? (
                            getAllMessages.map((contact) => (
                                <tr
                                    key={contact._id}
                                    className={`transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-rose-100'
                                        }`}
                                >
                                    <td className="px-6 py-4">{contact.name}</td>
                                    <td className="px-6 py-4">{contact.email}</td>
                                    <td className="px-6 py-4">{contact.message}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => Delete(contact._id)}
                                            className={`px-4 py-2 rounded-md font-semibold shadow-md transition-all duration-300 ${isDark
                                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                                : 'bg-rose-500 hover:bg-rose-600 text-white'
                                                }`}
                                        >
                                            {isLoading ? <div>Wait ...</div> : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-8 italic opacity-70">
                                    No contacts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Contact;
