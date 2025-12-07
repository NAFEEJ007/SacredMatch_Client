import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaHandHoldingHeart, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User Logged Out Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch(error => console.log(error));
    }

    const navLinkStyles = ({ isActive }) => 
        isActive 
            ? "text-pink-600 font-semibold px-3 py-2 border-b-2 border-pink-600 font-['Poppins']" 
            : "text-gray-600 hover:text-pink-600 px-3 py-2 transition duration-300 font-['Poppins'] font-medium hover:bg-pink-50 rounded-md";

    const navOptions = <>
        <NavLink to="/" className={navLinkStyles}>Home</NavLink>
        <NavLink to="/biodatas" className={navLinkStyles}>Biodatas</NavLink>
        <NavLink to="/about" className={navLinkStyles}>About Us</NavLink>
        <NavLink to="/contact" className={navLinkStyles}>Contact Us</NavLink>
        {
            user ? <>
                <NavLink to="/dashboard" className={navLinkStyles}>Dashboard</NavLink>
                <button onClick={handleLogOut} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-lg font-['Poppins'] font-medium transform hover:-translate-y-0.5 ml-2">
                    Log Out
                </button>
            </> : <>
                <NavLink to="/login" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-lg ml-4 font-['Poppins'] font-medium transform hover:-translate-y-0.5">
                    Login
                </NavLink>
            </>
        }
    </>

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-white shadow-md py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="bg-pink-100 p-2 rounded-full group-hover:bg-pink-200 transition-colors duration-300">
                                <FaHandHoldingHeart className="text-3xl text-pink-600" />
                            </div>
                            <span className="font-['Great_Vibes'] font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 tracking-wide ml-2">
                                SacredMatch
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-1">
                        {navOptions}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-pink-600 focus:outline-none p-2 rounded-md hover:bg-pink-50 transition-colors">
                            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`md:hidden bg-white border-t transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col items-center shadow-inner">
                    {navOptions}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
