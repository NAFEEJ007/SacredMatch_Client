import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const EditBiodata = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();

    const { data: biodata } = useQuery({
        queryKey: ['biodata', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/biodatas/email/${user?.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (biodata) {
            reset(biodata);
        }
    }, [biodata, reset]);

    const onSubmit = data => {
        const biodataInfo = {
            ...data,
            contactEmail: user?.email,
            age: parseInt(data.age),
            height: parseFloat(data.height),
            weight: parseFloat(data.weight),
            expectedPartnerAge: parseInt(data.expectedPartnerAge),
            expectedPartnerHeight: parseFloat(data.expectedPartnerHeight),
            expectedPartnerWeight: parseFloat(data.expectedPartnerWeight),
            email: user?.email // Link biodata to user email
        }

        axios.post('http://localhost:5000/biodatas', biodataInfo, { withCredentials: true })
            .then(res => {
                if (res.data.insertedId || res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Biodata saved successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    const divisions = ["Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];
    const occupations = ["Student", "Job", "House wife"];
    const weights = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
    const heights = [4.5, 5.0, 5.2, 5.4, 5.6, 5.8, 6.0, 6.2];

    const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2.5";
    const selectClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2.5";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Edit Biodata</h2>
                <p className="text-gray-500 mt-2">Update your profile information to find your perfect match.</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block"><span className={labelClasses}>Biodata Type</span></label>
                        <select {...register("biodataType", { required: true })} className={selectClasses}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Name</span></label>
                        <input type="text" {...register("name", { required: true })} placeholder="Your Full Name" className={inputClasses} />
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Profile Image Link</span></label>
                        <input type="text" {...register("profileImage")} placeholder="https://example.com/image.jpg" className={inputClasses} />
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Date of Birth</span></label>
                        <input type="date" {...register("dateOfBirth", { required: true })} className={inputClasses} />
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Height</span></label>
                        <select {...register("height", { required: true })} className={selectClasses}>
                            {heights.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Weight</span></label>
                        <select {...register("weight", { required: true })} className={selectClasses}>
                            {weights.map(w => <option key={w} value={w}>{w} kg</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Age</span></label>
                        <input type="number" {...register("age", { required: true })} placeholder="Age" className={inputClasses} />
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Occupation</span></label>
                        <select {...register("occupation", { required: true })} className={selectClasses}>
                            {occupations.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Marital Status</span></label>
                        <select {...register("maritalStatus", { required: true })} className={selectClasses}>
                            <option value="Unmarried">Unmarried</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Separated">Separated</option>
                        </select>
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Skin Color</span></label>
                        <select {...register("race", { required: true })} className={selectClasses}>
                            <option value="Fair">Fair</option>
                            <option value="Brown">Brown</option>
                            <option value="Black">Black</option>
                            <option value="White">White</option>
                        </select>
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Father's Name</span></label>
                        <input type="text" {...register("fathersName", { required: true })} placeholder="Father's Name" className={inputClasses} />
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Mother's Name</span></label>
                        <input type="text" {...register("mothersName", { required: true })} placeholder="Mother's Name" className={inputClasses} />
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Permanent Division</span></label>
                        <select {...register("permanentDivision", { required: true })} className={selectClasses}>
                            {divisions.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Present Division</span></label>
                        <select {...register("presentDivision", { required: true })} className={selectClasses}>
                            {divisions.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Expected Partner Age</span></label>
                        <input type="number" {...register("expectedPartnerAge", { required: true })} placeholder="Expected Partner Age" className={inputClasses} />
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Expected Partner Height</span></label>
                        <select {...register("expectedPartnerHeight", { required: true })} className={selectClasses}>
                            {heights.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block"><span className={labelClasses}>Expected Partner Weight</span></label>
                        <select {...register("expectedPartnerWeight", { required: true })} className={selectClasses}>
                            {weights.map(w => <option key={w} value={w}>{w} kg</option>)}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block"><span className={labelClasses}>Contact Email</span></label>
                        <input type="email" value={user?.email} readOnly className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm sm:text-sm border p-2.5" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block"><span className={labelClasses}>Mobile Number</span></label>
                        <input type="tel" {...register("mobileNumber", { required: true })} placeholder="Mobile Number" className={inputClasses} />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button type="submit" className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                        Save And Publish Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBiodata;
