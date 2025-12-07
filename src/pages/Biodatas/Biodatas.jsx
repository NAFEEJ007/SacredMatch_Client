import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaHeart, FaShareAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Biodatas = () => {
    const { user } = useContext(AuthContext);
    // Form State
    const [type, setType] = useState("");
    const [division, setDivision] = useState("");
    const [ageMin, setAgeMin] = useState(0);
    const [ageMax, setAgeMax] = useState(100);
    const [searchId, setSearchId] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [race, setRace] = useState("");
    const [heightMin, setHeightMin] = useState(0);
    const [heightMax, setHeightMax] = useState(10);
    const [isAdvanced, setIsAdvanced] = useState(false);

    // Query State
    const [filters, setFilters] = useState({
        type: "",
        division: "",
        ageMin: 0,
        ageMax: 100,
        biodataId: "",
        maritalStatus: "",
        race: "",
        heightMin: 0,
        heightMax: 10
    });
    
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;

    const { data, isLoading } = useQuery({
        queryKey: ['biodatas', filters, currentPage],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/biodatas?page=${currentPage}&limit=${itemsPerPage}&type=${filters.type}&division=${filters.division}&ageMin=${filters.ageMin}&ageMax=${filters.ageMax}&biodataId=${filters.biodataId}&maritalStatus=${filters.maritalStatus}&race=${filters.race}&heightMin=${filters.heightMin}&heightMax=${filters.heightMax}`);
            return res.data;
        }
    });

    const handleFilter = (e) => {
        e.preventDefault();
        setFilters({
            type,
            division,
            ageMin,
            ageMax,
            biodataId: "",
            maritalStatus,
            race,
            heightMin,
            heightMax
        });
        setSearchId("");
        setCurrentPage(0);
    }

    const handleIdSearch = (e) => {
        e.preventDefault();
        setFilters({
            type: "",
            division: "",
            ageMin: "",
            ageMax: "",
            biodataId: searchId,
            maritalStatus: "",
            race: "",
            heightMin: "",
            heightMax: ""
        });
        setCurrentPage(0);
    }

    const handleAddToFavourites = (biodata) => {
        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please login to add to favourites!',
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

    const handleShare = (id) => {
        navigator.clipboard.writeText(`${window.location.origin}/biodatas/${id}`);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Link copied to clipboard',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const divisions = ["Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filter Section */}
                <div className="w-full md:w-1/4 space-y-6">
                    {/* Search by ID */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Search by ID</h2>
                        <form onSubmit={handleIdSearch}>
                            <div className="mb-4">
                                <input 
                                    type="text" 
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="...101"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">Search</button>
                        </form>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button 
                                onClick={() => setIsAdvanced(!isAdvanced)}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                {isAdvanced ? "Normal Filter" : "Advanced Filter"}
                            </button>
                        </div>
                        <form onSubmit={handleFilter}>
                            {/* Normal Filters */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Biodata Type</label>
                                <select 
                                    className="w-full border rounded px-3 py-2"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">All</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Marital Status</label>
                                <select 
                                    className="w-full border rounded px-3 py-2"
                                    value={maritalStatus}
                                    onChange={(e) => setMaritalStatus(e.target.value)}
                                >
                                    <option value="">All</option>
                                    <option value="Unmarried">Unmarried</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                    <option value="Separated">Separated</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Division</label>
                                <select 
                                    className="w-full border rounded px-3 py-2"
                                    value={division}
                                    onChange={(e) => setDivision(e.target.value)}
                                >
                                    <option value="">All</option>
                                    {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Age Range</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="number" 
                                        className="w-1/2 border rounded px-2 py-1" 
                                        placeholder="Min"
                                        value={ageMin}
                                        onChange={(e) => setAgeMin(e.target.value)}
                                    />
                                    <input 
                                        type="number" 
                                        className="w-1/2 border rounded px-2 py-1" 
                                        placeholder="Max"
                                        value={ageMax}
                                        onChange={(e) => setAgeMax(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Advanced Filters */}
                            {isAdvanced && (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Skin Color</label>
                                        <select 
                                            className="w-full border rounded px-3 py-2"
                                            value={race}
                                            onChange={(e) => setRace(e.target.value)}
                                        >
                                            <option value="">All</option>
                                            <option value="Fair">Fair</option>
                                            <option value="Brown">Brown</option>
                                            <option value="Black">Black</option>
                                            <option value="White">White</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Height Range (ft)</label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="number" 
                                                step="0.1"
                                                className="w-1/2 border rounded px-2 py-1" 
                                                placeholder="Min"
                                                value={heightMin}
                                                onChange={(e) => setHeightMin(e.target.value)}
                                            />
                                            <input 
                                                type="number" 
                                                step="0.1"
                                                className="w-1/2 border rounded px-2 py-1" 
                                                placeholder="Max"
                                                value={heightMax}
                                                onChange={(e) => setHeightMax(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4">Apply Filters</button>
                        </form>
                    </div>
                </div>

                {/* Biodatas List */}
                <div className="w-full md:w-3/4">
                    <h2 className="text-2xl font-bold mb-6">Biodatas</h2>
                    {isLoading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <>
                            {data?.result?.length === 0 ? (
                                <div className="text-center text-gray-500 mt-10 text-xl">
                                    {filters.biodataId ? "Biodata not found with this id" : "No biodata found"}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {data?.result?.map(biodata => (
                                        <div key={biodata._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">
                                            <div className="relative">
                                                <img src={biodata.profileImage} alt="Profile" className="w-full h-56 object-cover" />
                                                <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                                                    <FaEye className="text-gray-600" /> {biodata.viewCount || 0}
                                                </div>
                                            </div>
                                            
                                            <div className="p-4 flex-grow">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className={`text-xs font-semibold px-2 py-1 rounded ${biodata.biodataType === 'Male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                                                        {biodata.biodataType}
                                                    </span>
                                                    <span className="text-xs text-gray-500 font-mono">ID: {biodata.biodataId}</span>
                                                </div>
                                                
                                                <h3 className="text-lg font-bold mb-1 text-gray-800">{biodata.name}</h3>
                                                
                                                <div className="space-y-1 text-sm text-gray-600 mb-4">
                                                    <div className="flex justify-between">
                                                        <span>Age:</span>
                                                        <span className="font-medium">{biodata.age} yrs</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Division:</span>
                                                        <span className="font-medium">{biodata.permanentDivision}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Occupation:</span>
                                                        <span className="font-medium">{biodata.occupation}</span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                                                    <div className="flex gap-3">
                                                        <button 
                                                            onClick={() => handleAddToFavourites(biodata)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                                            title="Add to Favourites"
                                                        >
                                                            <FaHeart size={20} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleShare(biodata._id)}
                                                            className="text-gray-400 hover:text-blue-500 transition-colors"
                                                            title="Share Link"
                                                        >
                                                            <FaShareAlt size={20} />
                                                        </button>
                                                    </div>
                                                    <Link 
                                                        to={`/biodatas/${biodata._id}`} 
                                                        className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold py-2 px-4 rounded transition duration-300"
                                                    >
                                                        View Profile
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {/* Pagination */}
                            {data?.result?.length > 0 && (
                                <div className="mt-8 flex justify-center space-x-2">
                                    {[...Array(Math.ceil((data?.total || 0) / itemsPerPage)).keys()].map(page => (
                                        <button 
                                            key={page} 
                                            className={`px-4 py-2 border rounded ${currentPage === page ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Biodatas;
