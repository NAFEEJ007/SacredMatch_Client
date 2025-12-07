import { useContext, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BiodataDetails = () => {
    const biodata = useLoaderData();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const viewedBiodatas = JSON.parse(localStorage.getItem('viewedBiodatas')) || [];
        
        if (!viewedBiodatas.includes(biodata._id)) {
            axios.patch(`${import.meta.env.VITE_API_URL}/biodatas/view/${biodata._id}`);
            viewedBiodatas.push(biodata._id);
            localStorage.setItem('viewedBiodatas', JSON.stringify(viewedBiodatas));
        }
    }, [biodata._id]);

    // Check if user is premium (You might want to fetch this from your user collection)
    const { data: isPremiumUser } = useQuery({
        queryKey: ['isPremium', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/premium/${user?.email}`, { withCredentials: true });
            return res.data.premium;
        }
    });

    // Fetch similar biodatas
    const { data: similarBiodatas } = useQuery({
        queryKey: ['similarBiodatas', biodata.biodataType],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/biodatas?type=${biodata.biodataType}&limit=3`);
            return res.data.result.filter(b => b._id !== biodata._id);
        }
    });

    // Fetch contact requests
    const { data: contactRequests } = useQuery({
        queryKey: ['contactRequests', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/contact-requests?email=${user?.email}`, { withCredentials: true });
            return res.data;
        }
    });

    const requestForThisBiodata = contactRequests?.find(req => req.biodataId === biodata.biodataId);

    const handleAddToFavourites = () => {
        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please login to add to favourites!',
            })
            return;
        }
        
        if (user.email === biodata.contactEmail) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You cannot add your own biodata to favourites!',
            })
            return;
        }

        const favouriteData = {
            biodataId: biodata.biodataId,
            permanentAddress: biodata.permanentDivision,
            occupation: biodata.occupation,
            name: biodata.name,
            email: user.email
        }
        
        axios.post(`${import.meta.env.VITE_API_URL}/favourites`, favouriteData, { withCredentials: true })
            .then(res => {
                if(res.data.insertedId){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Added to favourites',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3">
                        <img className="w-full h-full object-cover" src={biodata.profileImage} alt={biodata.name} />
                    </div>
                    <div className="p-8 md:w-2/3">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{biodata.biodataType}</div>
                        <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{biodata.name}</h1>
                        
                        <div className="mt-4 space-y-2 text-gray-600">
                            <p><span className="font-semibold">ID:</span> {biodata.biodataId}</p>
                            <p>
                                <span className="font-semibold">Age:</span> {biodata.age} | 
                                <span className="font-semibold ml-2">Height:</span> {biodata.height} | 
                                <span className="font-semibold ml-2">Weight:</span> {biodata.weight}
                            </p>
                            <p><span className="font-semibold">Occupation:</span> {biodata.occupation}</p>
                            <p><span className="font-semibold">Marital Status:</span> {biodata.maritalStatus}</p>
                            <p><span className="font-semibold">Permanent Division:</span> {biodata.permanentDivision}</p>
                            <p><span className="font-semibold">Present Division:</span> {biodata.presentDivision}</p>
                            <p><span className="font-semibold">Race:</span> {biodata.race}</p>
                            <p><span className="font-semibold">Date of Birth:</span> {biodata.dateOfBirth}</p>
                            <p><span className="font-semibold">Father's Name:</span> {biodata.fathersName}</p>
                            <p><span className="font-semibold">Mother's Name:</span> {biodata.mothersName}</p>
                            <p><span className="font-semibold">Expected Partner Age:</span> {biodata.expectedPartnerAge}</p>
                            <p><span className="font-semibold">Expected Partner Height:</span> {biodata.expectedPartnerHeight}</p>
                            <p><span className="font-semibold">Expected Partner Weight:</span> {biodata.expectedPartnerWeight}</p>
                        </div>

                        {isPremiumUser || (requestForThisBiodata?.status === 'approved') ? (
                            <div className="mt-6 border-t pt-4">
                                <h3 className="text-lg font-semibold">Contact Information</h3>
                                <p className="text-gray-600">Email: {biodata.contactEmail}</p>
                                <p className="text-gray-600">Phone: {biodata.mobileNumber}</p>
                            </div>
                        ) : (
                            <div className="mt-6">
                                {user?.email === biodata.contactEmail ? (
                                    <p className="text-red-500 font-semibold">This is your own biodata.</p>
                                ) : requestForThisBiodata ? (
                                    <p className="text-yellow-600 font-semibold">Contact Request Pending</p>
                                ) : (
                                    <Link to={`/checkout/${biodata.biodataId}`} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">Request Contact Information</Link>
                                )}
                            </div>
                        )}

                        <div className="mt-6">
                            {user?.email === biodata.contactEmail ? (
                                <button disabled className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">Add to Favourites</button>
                            ) : (
                                <button onClick={handleAddToFavourites} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300">Add to Favourites</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Biodatas */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Similar Biodatas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {similarBiodatas?.map(item => (
                        <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={item.profileImage} alt="Profile" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-sm text-gray-600">Age: {item.age}</p>
                                <Link to={`/biodatas/${item._id}`} className="text-blue-600 hover:underline mt-2 block">View Profile</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BiodataDetails;
