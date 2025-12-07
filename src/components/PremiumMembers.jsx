import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const PremiumMembers = () => {
    const [sortOrder, setSortOrder] = useState('asc');

    const { data: members = [], isLoading, isError, error } = useQuery({
        queryKey: ['premium-members'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/biodatas/premium`);
            return res.data;
        }
    });

    const sortedMembers = [...members].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.age - b.age;
        } else {
            return b.age - a.age;
        }
    });

    if (isLoading) return <div className="text-center py-10">Loading premium members...</div>;
    if (isError) return <div className="text-center py-10 text-red-500">Error loading members: {error.message}</div>;

    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Members</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Meet our featured premium members who are looking for their life partners.</p>
                    
                    <div className="mt-6">
                        <label className="mr-2 font-semibold text-gray-700">Sort by Age:</label>
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
                    {sortedMembers.map(member => (
                        <div key={member._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                            <div className="relative h-64">
                                <img src={member.profileImage} alt={member.name} className="w-full h-full object-cover" />
                                <div className="absolute top-4 right-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Premium
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                        <p className="text-sm text-gray-500">{member.biodataType} (ID: {member.biodataId})</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-pink-600">{member.age} <span className="text-sm text-gray-500 font-normal">yrs</span></p>
                                    </div>
                                </div>
                                
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-gray-600">
                                        <span className="font-semibold w-24">Occupation:</span>
                                        <span>{member.occupation}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <span className="font-semibold w-24">Division:</span>
                                        <span>{member.permanentDivision}</span>
                                    </div>
                                </div>

                                <Link to={`/biodatas/${member._id}`} className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition duration-300">
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PremiumMembers;
