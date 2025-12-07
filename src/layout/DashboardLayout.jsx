import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { FaHome, FaUserEdit, FaEye, FaAddressBook, FaHeart, FaUsers, FaUserShield, FaSignOutAlt, FaRing, FaList, FaInfoCircle, FaEnvelope, FaBars } from "react-icons/fa";

const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch(error => console.log(error));
    }

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navLinkClasses = ({ isActive }) => 
        `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 ${isActive ? "bg-gray-800 text-white border-l-4 border-indigo-500" : ""}`;

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" onClick={toggleSidebar}></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex items-center justify-center h-20 border-b border-gray-800">
                    <h1 className="text-2xl font-bold tracking-wider uppercase text-indigo-500">Matrimony</h1>
                </div>

                <nav className="mt-6 overflow-y-auto h-[calc(100vh-5rem)]">
                    <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Menu
                    </div>
                    {isAdmin ? (
                        <>
                            <NavLink to="/dashboard/admin-home" className={navLinkClasses}><FaHome className="mr-3"/> Admin Dashboard</NavLink>
                            <NavLink to="/dashboard/manage-users" className={navLinkClasses}><FaUsers className="mr-3"/> Manage Users</NavLink>
                            <NavLink to="/dashboard/approved-premium" className={navLinkClasses}><FaUserShield className="mr-3"/> Approved Premium</NavLink>
                            <NavLink to="/dashboard/approved-contact-request" className={navLinkClasses}><FaAddressBook className="mr-3"/> Contact Requests</NavLink>
                            <NavLink to="/dashboard/admin-success-story" className={navLinkClasses}><FaRing className="mr-3"/> Success Stories</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/dashboard/edit-biodata" className={navLinkClasses}><FaUserEdit className="mr-3"/> Edit Biodata</NavLink>
                            <NavLink to="/dashboard/view-biodata" className={navLinkClasses}><FaEye className="mr-3"/> View Biodata</NavLink>
                            <NavLink to="/dashboard/my-contact-request" className={navLinkClasses}><FaAddressBook className="mr-3"/> My Requests</NavLink>
                            <NavLink to="/dashboard/my-favourites" className={navLinkClasses}><FaHeart className="mr-3"/> Favourites</NavLink>
                            <NavLink to="/dashboard/got-married" className={navLinkClasses}><FaRing className="mr-3"/> Got Married</NavLink>
                        </>
                    )}

                    <div className="px-4 mt-8 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Quick Links
                    </div>
                    <NavLink to="/" className={navLinkClasses}><FaHome className="mr-3"/> Home</NavLink>
                    <NavLink to="/biodatas" className={navLinkClasses}><FaList className="mr-3"/> Biodatas</NavLink>
                    <NavLink to="/about" className={navLinkClasses}><FaInfoCircle className="mr-3"/> About Us</NavLink>
                    <NavLink to="/contact" className={navLinkClasses}><FaEnvelope className="mr-3"/> Contact Us</NavLink>
                    
                    <button onClick={handleLogOut} className="w-full flex items-center px-6 py-3 text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-200 mt-4">
                        <FaSignOutAlt className="mr-3"/> Logout
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
                    <div className="flex items-center">
                        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none lg:hidden">
                            <FaBars className="text-2xl" />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800 ml-4 lg:ml-0">Dashboard</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <img 
                                className="h-10 w-10 rounded-full object-cover border-2 border-indigo-500" 
                                src={user?.photoURL || "https://via.placeholder.com/150"} 
                                alt="User avatar" 
                            />
                            <span className="ml-3 font-medium text-gray-700 hidden md:block">{user?.displayName}</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <div className="container mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
