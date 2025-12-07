import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaUser, FaIdCard, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const MyFavourites = () => {
    const { user } = useContext(AuthContext);

    const { data: favourites, isLoading, refetch } = useQuery({
        queryKey: ['favourites', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/favourites?email=${user?.email}`, { withCredentials: true });
            return res.data;
        }
    });

    const handleDelete = (id) => {
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
                axios.delete(`${import.meta.env.VITE_API_URL}/favourites/${id}`, { withCredentials: true })
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    if (isLoading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">My Favourites Biodata</h2>
                    <p className="text-gray-500 mt-2">A collection of profiles you have shortlisted.</p>
                </div>
                <div className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full font-semibold text-sm">
                    Total Favourites: {favourites?.length || 0}
                </div>
            </div>

            {favourites?.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">No favourites added yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Biodata ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Permanent Address</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Occupation</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {favourites?.map(item => (
                                <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                                                <FaUser />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <FaIdCard className="mr-2 text-gray-400" />
                                            {item.biodataId}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                            {item.permanentAddress}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <FaBriefcase className="mr-2 text-gray-400" />
                                            {item.occupation}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => handleDelete(item._id)} 
                                            className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-full transition-colors duration-200"
                                            title="Remove from Favourites"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyFavourites;
