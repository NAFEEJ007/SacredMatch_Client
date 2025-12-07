import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PremiumCheckoutForm from "./PremiumCheckoutForm";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Contact = () => {
    const { user } = useContext(AuthContext);

    const { data: isPremium } = useQuery({
        queryKey: ['isPremium', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/users/premium/${user?.email}`, { withCredentials: true });
            return res.data.premium;
        }
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-indigo-600 text-white py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-lg max-w-2xl mx-auto">We are here to help you find your perfect match. Reach out to us for any queries or support.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
                    <p className="text-gray-600">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    
                    <div className="flex items-start space-x-4">
                        <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                            <FaEnvelope className="text-xl" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Email</h3>
                            <p className="text-gray-600">support@matrimony.com</p>
                            <p className="text-gray-600">info@matrimony.com</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                            <FaPhone className="text-xl" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Phone</h3>
                            <p className="text-gray-600">+1 (555) 123-4567</p>
                            <p className="text-gray-600">+1 (555) 987-6543</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                            <FaMapMarkerAlt className="text-xl" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Office</h3>
                            <p className="text-gray-600">123 Matrimony Lane, Love City</p>
                            <p className="text-gray-600">New York, NY 10012</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form (Visual Only) */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold mb-6">Send Message</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input type="text" className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-500" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input type="email" className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-500" placeholder="Your Email" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Message</label>
                            <textarea className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-500 h-32" placeholder="Your Message"></textarea>
                        </div>
                        <button type="button" className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition duration-300">Send Message</button>
                    </form>
                </div>
            </div>

            {/* Premium Membership Section */}
            {isPremium ? (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 py-12 text-white text-center">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-4">You are a Premium Member!</h2>
                        <p className="text-xl">Enjoy all the exclusive benefits of your premium membership.</p>
                    </div>
                </div>
            ) : user && (
                <div className="bg-gray-100 py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Upgrade to Premium</h2>
                            <p className="text-gray-600">Unlock exclusive features like viewing contact information and priority support.</p>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-600 p-8 text-white flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold mb-4">Premium Benefits</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center"><span className="mr-2">✓</span> View Contact Details</li>
                                        <li className="flex items-center"><span className="mr-2">✓</span> Priority Customer Support</li>
                                        <li className="flex items-center"><span className="mr-2">✓</span> Profile Highlight</li>
                                        <li className="flex items-center"><span className="mr-2">✓</span> Verified Badge</li>
                                    </ul>
                                    <div className="mt-8">
                                        <span className="text-4xl font-bold">$100</span>
                                        <span className="text-indigo-200">/lifetime</span>
                                    </div>
                                </div>
                                <div className="md:w-1/2 p-8">
                                    <Elements stripe={stripePromise}>
                                        <PremiumCheckoutForm />
                                    </Elements>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;
