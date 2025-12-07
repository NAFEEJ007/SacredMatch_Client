import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCheck, FaCrown, FaUser, FaEnvelope, FaIdCard } from "react-icons/fa";

const ApprovedPremium = () => {
    const { data: requests = [], refetch } = useQuery({
        queryKey: ['premium-requests'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/premium-approval-requests`, { withCredentials: true });
            return res.data;
        }
    });

    const handleMakePremium = (biodata) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to make ${biodata.name} a premium member?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Premium!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`${import.meta.env.VITE_API_URL}/premium-approval-requests/${biodata._id}`, {}, { withCredentials: true })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Success!',
                                `${biodata.name} is now a Premium Member.`,
                                'success'
                            )
                        }
                    })
            }
        })
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Premium Members</h2>
                    <p className="text-gray-500 mt-2">Manage premium membership requests and status.</p>
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold text-sm">
                    Total Members: {requests.length}
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Biodata ID</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Make Premium</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-12 text-gray-500">No records found</td>
                            </tr>
                        ) : (
                            requests.map(biodata => (
                                <tr key={biodata._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                                <FaUser />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{biodata.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <FaEnvelope className="mr-2 text-gray-400" />
                                            {biodata.contactEmail}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <FaIdCard className="mr-2 text-gray-400" />
                                            {biodata.biodataId}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {!biodata.isPremium ? (
                                            <button 
                                                onClick={() => handleMakePremium(biodata)}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                            >
                                                <FaCrown className="mr-1" /> Make Premium
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">Approved</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovedPremium;
