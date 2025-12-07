import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-3xl font-bold text-pink-500 mb-4">SacredMatch</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Connecting hearts since 2025. We are dedicated to helping you find your perfect match with trust and security.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-pink-500 transition">Home</a></li>
                            <li><a href="/biodatas" className="text-gray-400 hover:text-pink-500 transition">Biodatas</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-pink-500 transition">About Us</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-pink-500 transition">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition">Cookie Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-pink-500 text-2xl transition"><FaFacebook /></a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 text-2xl transition"><FaTwitter /></a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 text-2xl transition"><FaInstagram /></a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 text-2xl transition"><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 text-center">
                    <p className="text-gray-500 text-sm">&copy; 2025 SacredMatch. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
