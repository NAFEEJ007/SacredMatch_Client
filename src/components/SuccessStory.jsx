import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const SuccessStory = () => {
    const [sortOrder, setSortOrder] = useState('desc');

    const { data: stories = [] } = useQuery({
        queryKey: ['success-stories-home'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/success-stories`);
            return res.data;
        }
    });

    const sortedStories = [...stories].sort((a, b) => {
        const dateA = new Date(a.marriageDate);
        const dateB = new Date(b.marriageDate);
        if (sortOrder === 'asc') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });

    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Read about the happy couples who found their soulmates on SacredMatch.</p>
                    
                    <div className="mt-6">
                        <label className="mr-2 font-semibold text-gray-700">Sort by Marriage Date:</label>
                        <select 
                            value={sortOrder} 
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedStories.map(story => (
                        <div key={story._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                            <div className="h-64 overflow-hidden">
                                <img src={story.coupleImage || story.imageLink} alt="Couple" className="w-full h-full object-cover transform hover:scale-110 transition duration-500" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        Married: {new Date(story.marriageDate).toLocaleDateString()}
                                    </span>
                                    <div className="flex text-yellow-400">
                                        {[...Array(Math.max(0, parseInt(story.rating || story.reviewStar || 0)))].map((_, i) => <FaStar key={i} />)}
                                    </div>
                                </div>
                                <p className="text-gray-700 italic mb-4 line-clamp-4">"{story.successStoryText || story.successStory || story.successStoryReview}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessStory;
