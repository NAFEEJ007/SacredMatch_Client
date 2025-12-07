import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaSearch, FaUser, FaEnvelope, FaCrown, FaCheck, FaUserShield } from "react-icons/fa";

const ManageUsers = () => {
    const [search, setSearch] = useState('');
    
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/users?search=${search}`, { withCredentials: true });
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to make ${user.name} an admin?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Admin!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:5000/users/admin/${user._id}`, {}, { withCredentials: true })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Success!',
                                `${user.name} is now an Admin.`,
                                'success'
                            )
                        }
                    })
            }
        })
    };

    const handleMakePremium = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to make ${user.name} a premium member?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Premium!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:5000/users/premium/${user._id}`, {}, { withCredentials: true })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Success!',
                                `${user.name} is now a Premium Member.`,
                                'success'
                            )
                        }
                    })
            }
        })
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Manage Users</h2>
                    <p className="text-gray-500 mt-2">View and manage all registered users.</p>
                </div>
                <div className="relative w-full md:w-1/3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search by username" 
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-12 text-gray-500">No users found</td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                                <FaUser />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <FaEnvelope className="mr-2 text-gray-400" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                                user.role === 'admin' ? 'bg-red-100 text-red-800' :
                                                user.role === 'premium' ? 'bg-purple-100 text-purple-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {user.role === 'premium' && <FaCrown className="mr-1 text-xs" />}
                                                {user.role || 'Normal'}
                                            </span>
                                            {user.premiumStatus === 'pending' && (
                                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Requested
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        {user.role !== 'admin' && (
                                            <button 
                                                onClick={() => handleMakeAdmin(user)}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                            >
                                                <FaUserShield className="mr-1" /> Make Admin
                                            </button>
                                        )}
                                        {user.role !== 'premium' && user.role !== 'admin' && (
                                            <button 
                                                onClick={() => handleMakePremium(user)}
                                                className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                                                    user.premiumStatus === 'pending' 
                                                        ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 animate-pulse' 
                                                        : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                                                }`}
                                            >
                                                {user.premiumStatus === 'pending' ? (
                                                    <><FaCheck className="mr-1" /> Approve Premium</>
                                                ) : (
                                                    <><FaCrown className="mr-1" /> Make Premium</>
                                                )}
                                            </button>
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

export default ManageUsers;
