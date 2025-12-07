import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaHeart, FaEye, FaVenusMars, FaTrashAlt } from "react-icons/fa";

const AdminSuccessStory = () => {
    const queryClient = useQueryClient();
    const { data: stories = [], refetch } = useQuery({
        queryKey: ['success-stories-admin'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/success-stories');
            return res.data;
        }
    });

    const handleViewStory = (story) => {
        Swal.fire({
            title: 'Success Story',
            html: `
                <div class="text-left">
                    <div class="flex items-center justify-center mb-4">
                        <img src="${story.coupleImage}" alt="Couple" class="w-full max-h-64 object-cover rounded-lg shadow-md" />
                    </div>
                    <p class="mb-2"><strong class="text-indigo-600">Marriage Date:</strong> ${story.marriageDate}</p>
                    <p class="text-gray-700"><strong>Review:</strong> ${story.successStory}</p>
                </div>
            `,
            width: 600,
            confirmButtonText: 'Close',
            confirmButtonColor: '#4f46e5',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    };

    const handleDeleteStory = (story) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/success-stories/${story._id}`, {
                    withCredentials: true
                })
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        queryClient.invalidateQueries(['success-stories-home']);
                        queryClient.invalidateQueries(['success-stories']);
                        Swal.fire(
                            'Deleted!',
                            'Success story has been deleted.',
                            'success'
                        )
                    }
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire(
                        'Error!',
                        `Failed to delete the success story. ${error.response?.data?.message || error.message}`,
                        'error'
                    )
                })
            }
        })
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Success Stories</h2>
                    <p className="text-gray-500 mt-2">Celebrate the couples who found love.</p>
                </div>
                <div className="p-3 bg-pink-100 rounded-full text-pink-600">
                    <FaHeart className="text-2xl" />
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Male Biodata ID</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Female Biodata ID</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {stories.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-12 text-gray-500">No success stories yet</td>
                            </tr>
                        ) : (
                            stories.map(story => (
                                <tr key={story._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm font-medium text-gray-900">
                                            <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs">
                                                #{story.selfBiodataId}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm font-medium text-gray-900">
                                            <span className="bg-pink-100 text-pink-800 py-1 px-3 rounded-full text-xs">
                                                #{story.partnerBiodataId}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => handleViewStory(story)}
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors mr-2"
                                        >
                                            <FaEye className="mr-1.5" /> View Story
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteStory(story)}
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                        >
                                            <FaTrashAlt className="mr-1.5" /> Delete
                                        </button>
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

export default AdminSuccessStory;
