import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaHeart, FaImage, FaCalendarAlt, FaStar } from "react-icons/fa";

const GotMarried = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        const storyData = {
            selfBiodataId: parseInt(data.selfBiodataId),
            partnerBiodataId: parseInt(data.partnerBiodataId),
            coupleImage: data.coupleImage,
            successStory: data.successStory,
            marriageDate: data.marriageDate,
            rating: parseInt(data.rating),
            userName: user?.displayName
        }

        axios.post('http://localhost:5000/success-stories', storyData, { withCredentials: true })
            .then(res => {
                if (res.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Success Story Submitted!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-indigo-600 px-8 py-6 text-white text-center">
                    <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                        <FaHeart className="text-3xl text-white" />
                    </div>
                    <h2 className="text-3xl font-bold">Share Your Success Story</h2>
                    <p className="mt-2 text-indigo-100">Inspire others with your journey of finding love.</p>
                </div>
                
                <div className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Self Biodata ID</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">#</span>
                                    </div>
                                    <input 
                                        type="number" 
                                        {...register("selfBiodataId", { required: true })} 
                                        placeholder="Your Biodata ID" 
                                        className="pl-7 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Biodata ID</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">#</span>
                                    </div>
                                    <input 
                                        type="number" 
                                        {...register("partnerBiodataId", { required: true })} 
                                        placeholder="Partner Biodata ID" 
                                        className="pl-7 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Couple Image Link</label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaImage className="text-gray-400" />
                                </div>
                                <input 
                                    type="text" 
                                    {...register("coupleImage", { required: true })} 
                                    placeholder="https://example.com/image.jpg" 
                                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5" 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Marriage Date</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendarAlt className="text-gray-400" />
                                    </div>
                                    <input 
                                        type="date" 
                                        {...register("marriageDate", { required: true })} 
                                        className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaStar className="text-yellow-400" />
                                    </div>
                                    <select 
                                        {...register("rating", { required: true })} 
                                        className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5"
                                    >
                                        <option value="5">5 Stars - Excellent</option>
                                        <option value="4">4 Stars - Very Good</option>
                                        <option value="3">3 Stars - Good</option>
                                        <option value="2">2 Stars - Fair</option>
                                        <option value="1">1 Star - Poor</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Success Story Review</label>
                            <textarea 
                                {...register("successStory", { required: true })} 
                                placeholder="Share your feelings and experience..." 
                                rows="4"
                                className="block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-3" 
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Submit Success Story
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GotMarried;