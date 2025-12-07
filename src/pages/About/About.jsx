import { FaUsers, FaHeart, FaShieldAlt, FaHandshake } from "react-icons/fa";

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white py-24">
                <div className="absolute inset-0 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Wedding background" className="w-full h-full object-cover opacity-30" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">About Us</h1>
                    <p className="text-xl max-w-3xl mx-auto text-gray-300">Connecting hearts and building families since 2020. We are dedicated to helping you find your perfect life partner.</p>
                </div>
            </div>

            {/* Our Mission */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">To provide a secure, easy-to-use, and trusted platform for singles to find their soulmates. We believe in the sanctity of marriage and the joy of finding true love.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:-translate-y-2 transition duration-300">
                            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-600">
                                <FaHeart className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Trusted Matchmaking</h3>
                            <p className="text-gray-600">Thousands of success stories and happy couples. We verify profiles to ensure a safe environment.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:-translate-y-2 transition duration-300">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                                <FaShieldAlt className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">100% Privacy</h3>
                            <p className="text-gray-600">Your privacy is our top priority. We use advanced security measures to protect your personal information.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:-translate-y-2 transition duration-300">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
                                <FaHandshake className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Dedicated Support</h3>
                            <p className="text-gray-600">Our support team is always here to assist you in your journey to find love. We are just a message away.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 bg-indigo-600 text-white">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold mb-2">5000+</div>
                        <div className="text-indigo-200">Active Profiles</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">2000+</div>
                        <div className="text-indigo-200">Happy Weddings</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">100%</div>
                        <div className="text-indigo-200">Verified Users</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">24/7</div>
                        <div className="text-indigo-200">Support</div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="CEO" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg" />
                            <h3 className="text-xl font-bold">John Doe</h3>
                            <p className="text-gray-500">Founder & CEO</p>
                        </div>
                        <div className="text-center">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="CTO" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg" />
                            <h3 className="text-xl font-bold">Jane Smith</h3>
                            <p className="text-gray-500">Head of Matchmaking</p>
                        </div>
                        <div className="text-center">
                            <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Manager" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg" />
                            <h3 className="text-xl font-bold">Mike Johnson</h3>
                            <p className="text-gray-500">Customer Relations</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
