import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Moon, Sun, Menu, X, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useAdminLogoutMutation } from '../../redux/api/authApi';
import { toast } from 'sonner';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const toggleTheme = () => setIsDark(prev => !prev);

    return (
        <div className={clsx('flex min-h-screen transition-colors duration-500 font-sans', {
            'bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white': isDark,
            'bg-gradient-to-br from-yellow-50 via-white to-rose-100 text-gray-900': !isDark,
        })}>
            {/* Sidebar */}
            <div className={clsx('fixed top-0 left-0 h-full z-30 transition-all duration-300 ease-in-out overflow-hidden shadow-2xl', {
                'w-64': isSidebarOpen,
                'w-0': !isSidebarOpen,
            })}>
                <Sidebar isDark={isDark} />
            </div>

            {/* Main Content */}
            <div className={clsx('flex-1 transition-all duration-300', {
                'ml-64': isSidebarOpen,
                'ml-0': !isSidebarOpen,
            })}>
                <AdminNavbar
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                />
                {/* Add padding top to avoid navbar overlap */}
                <div className="p-6 pt-20">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({ isDark }) => {
    const [Logout, { isSuccess, isError, error, isLoading }] = useAdminLogoutMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success("✅Admin Logout", {
                duration: 1000,
                style: {
                    background: 'linear-gradient(to right, #1f1c2c, #928dab)',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '16px 24px',
                    fontWeight: '600',
                    boxShadow: '0 10px 30px rgba(146, 141, 171, 0.4)',
                    border: '1px solid #928dab',
                },
            });


        }
    }, [isSuccess]);
    useEffect(() => {
        if (isLoading) {
            toast.info("Please wait...", {
                duration: 500, // auto-close after 4 seconds (optional)
                style: {
                    background: 'linear-gradient(to right, #36d1dc, #5b86e5)', // sky blue gradient
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '14px 24px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: '0 6px 16px rgba(91, 134, 229, 0.4)', // soft blue glow
                    border: '1px solid #5b86e5',
                }
            })
        } [isLoading]
    }, [isLoading]);
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
                },
            });
        }
    }, [isError]);

    return <div className={clsx('h-full transition-all duration-300 p-4 relative', {
        'bg-gradient-to-b from-black via-gray-900 to-gray-800': isDark,
        'bg-gradient-to-b from-rose-100 via-pink-50 to-yellow-50': !isDark,
    })}>
        <h3 className={clsx('text-xl font-extrabold tracking-wide uppercase mb-6 text-center', {
            'text-yellow-400 drop-shadow-md': isDark,
            'text-rose-700': !isDark,
        })}>
            Super Admin
        </h3>

        <nav className="space-y-3 pt-3">
            <SidebarLink to="/admin" text="Dashboard" isDark={isDark} />
            <SidebarLink to="/admin/projects" text="Projects" isDark={isDark} />
            <SidebarLink to="/admin/education" text="Education" isDark={isDark} />
            <SidebarLink to="/admin/emails" text="Emails" isDark={isDark} />
            <SidebarLink to="/admin/contact" text="Contact Requests" isDark={isDark} />
        </nav>
        {error && JSON.stringify(error, null, 2)}
        <div className="absolute bottom-6 left-0 w-full px-4">
            <button
                onClick={Logout}

                className={clsx('w-full py-3 font-bold cursor-pointer rounded-xl shadow-lg transition-all duration-300', {
                    'bg-gradient-to-r from-yellow-500 to-red-500 text-white hover:from-yellow-600 hover:to-red-600': isDark,
                    'bg-gradient-to-r from-pink-400 to-red-400 text-white hover:brightness-110': !isDark,
                })}
            >
                Logout
            </button>
        </div>
    </div>
}

const SidebarLink = ({ to, text, isDark }) => (
    <Link
        to={to}
        className={clsx('block py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 group', {
            'text-gray-200 hover:bg-yellow-400 hover:text-black bg-opacity-20': isDark,
            'text-gray-800 hover:bg-rose-400 hover:text-black': !isDark,
        })}
    >
        <span className="group-hover:tracking-wide transition-all duration-200">{text}</span>
    </Link>
);

const AdminNavbar = ({ isDark, toggleTheme, toggleSidebar, isSidebarOpen }) => {
    return (
        <div className={clsx(
            'fixed top-0 left-0 right-0 z-40 flex justify-between items-center py-4 px-6 border-b shadow-md backdrop-blur-lg transition-all duration-300',
            {
                'bg-gray-950 bg-opacity-90 border-gray-700': isDark,
                'bg-white bg-opacity-80 border-rose-200': !isDark,
            }
        )}>
            {/* Toggle Sidebar Icon */}
            <button onClick={toggleSidebar}>
                {isSidebarOpen ? (
                    <X className={clsx('transition-all cursor-pointer duration-200', {
                        'text-yellow-400': isDark,
                        'text-rose-600': !isDark,
                    })} />
                ) : (
                    <Menu className={clsx('transition-all cursor-pointer duration-200', {
                        'text-yellow-400': isDark,
                        'text-rose-600': !isDark,
                    })} />
                )}
            </button>
            <p className={clsx(
                'text-lg font-extrabold tracking-wider text-transparent bg-clip-text',
                'bg-gradient-to-r from-yellow-400 via-rose-500 to-red-600',
                'drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)] ',
                'font-playfair'
            )}>
                👑 Super Admin
            </p>

            {/* Theme Switch */}
            <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-sm cursor-pointer font-semibold px-4 py-2 rounded-lg transition-all duration-300"
            >
                {isDark ? (
                    <>
                        <Sun className="text-yellow-400" size={18} />
                        <span className="hidden md:inline">Light Mode</span>
                    </>
                ) : (
                    <>
                        <Moon className="text-rose-700" size={18} />
                        <span className="hidden md:inline">Dark Mode</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default Layout;
