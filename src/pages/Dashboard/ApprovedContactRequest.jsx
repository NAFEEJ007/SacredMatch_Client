import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCheck, FaUser, FaEnvelope, FaIdCard, FaClock } from "react-icons/fa";

const ApprovedContactRequest = () => {
    const { data: requests = [], refetch } = useQuery({
        queryKey: ['contact-requests-admin'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/contact-requests', { withCredentials: true });
            return res.data;
        }
    });

    const handleApprove = (request) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Approve contact request for ${request.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:5000/contact-requests/${request._id}`, {}, { withCredentials: true })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Approved!',
                                'Contact request has been approved.',
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
                    <h2 className="text-3xl font-bold text-gray-800">Contact Requests</h2>
                    <p className="text-gray-500 mt-2">Review and approve contact information requests.</p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-sm">
                    Total Requests: {requests.length}
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Biodata ID</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-12 text-gray-500">No contact requests</td>
                            </tr>
                        ) : (
                            requests.map(request => (
                                <tr key={request._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                                <FaUser />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{request.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <FaEnvelope className="mr-2 text-gray-400" />
                                            {request.selfEmail}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <FaIdCard className="mr-2 text-gray-400" />
                                            {request.biodataId}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {request.status === 'pending' ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                                <FaClock className="mr-1" /> Pending
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                                <FaCheck className="mr-1" /> Approved
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {request.status === 'pending' ? (
                                            <button 
                                                onClick={() => handleApprove(request)}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                            >
                                                <FaCheck className="mr-1" /> Approve
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

export default ApprovedContactRequest;
