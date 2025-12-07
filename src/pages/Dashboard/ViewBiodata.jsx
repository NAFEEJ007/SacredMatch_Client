import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBirthdayCake, FaBriefcase, FaRulerVertical, FaWeight, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCrown } from "react-icons/fa";

const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
        <div className="p-2 bg-indigo-100 rounded-full text-indigo-600 mr-3">
            <Icon />
        </div>
        <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
            <p className="font-medium text-gray-800">{value}</p>
        </div>
    </div>
);

const ViewBiodata = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: biodata, isLoading } = useQuery({
        queryKey: ['biodata', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/biodatas/email/${user?.email}`);
            return res.data;
        }
    });

    const handleMakePremium = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to make your biodata premium? It will cost $100.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed to payment!'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/checkout/${biodata.biodataId}?type=premium`);
            }
        })
    }

    if (isLoading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );
    if (!biodata) return (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-md p-8">
            <p className="text-xl text-gray-600 mb-4">You haven't created a biodata yet.</p>
            <a href="/dashboard/edit-biodata" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Create Biodata</a>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="bg-indigo-600 h-32 relative">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <img 
                        src={biodata.profileImage} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" 
                    />
                </div>
            </div>
            
            <div className="pt-20 pb-8 px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800">{biodata.name}</h2>
                <p className="text-gray-500 mt-1">{biodata.occupation}</p>
                
                <div className="mt-6 flex justify-center space-x-4">
                    {biodata.isPremium || biodata.premiumRequestStatus === 'approved' ? (
                        <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold text-sm">
                            <FaCrown className="mr-2" /> Premium
                        </span>
                    ) : biodata.premiumRequestStatus === 'pending' ? (
                        <span className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold text-sm">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-yellow-800 mr-2"></div> Request Pending
                        </span>
                    ) : (
                        <button onClick={handleMakePremium} className="inline-flex items-center px-6 py-2 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            <FaCrown className="mr-2" /> Request Premium
                        </button>
                    )}
                </div>
            </div>

            <div className="px-8 pb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <InfoItem icon={FaUser} label="Biodata Type" value={biodata.biodataType} />
                    <InfoItem icon={FaBirthdayCake} label="Date of Birth" value={biodata.dateOfBirth} />
                    <InfoItem icon={FaUser} label="Age" value={`${biodata.age} Years`} />
                    <InfoItem icon={FaUser} label="Race" value={biodata.race} />
                    <InfoItem icon={FaRulerVertical} label="Height" value={`${biodata.height} ft`} />
                    <InfoItem icon={FaWeight} label="Weight" value={`${biodata.weight} kg`} />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Family & Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <InfoItem icon={FaUser} label="Father's Name" value={biodata.fathersName} />
                    <InfoItem icon={FaUser} label="Mother's Name" value={biodata.mothersName} />
                    <InfoItem icon={FaMapMarkerAlt} label="Permanent Division" value={biodata.permanentDivision} />
                    <InfoItem icon={FaMapMarkerAlt} label="Present Division" value={biodata.presentDivision} />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Partner Preference</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <InfoItem icon={FaUser} label="Expected Age" value={`${biodata.expectedPartnerAge} Years`} />
                    <InfoItem icon={FaRulerVertical} label="Expected Height" value={`${biodata.expectedPartnerHeight} ft`} />
                    <InfoItem icon={FaWeight} label="Expected Weight" value={`${biodata.expectedPartnerWeight} kg`} />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem icon={FaEnvelope} label="Email" value={biodata.contactEmail} />
                    <InfoItem icon={FaPhone} label="Mobile" value={biodata.mobileNumber} />
                </div>
            </div>
        </div>
    );
};

export default ViewBiodata;
