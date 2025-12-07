import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

const SuccessStory = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const queryClient = useQueryClient();

    const { data: stories = [], isLoading } = useQuery({
        queryKey: ['success-stories'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/success-stories');
            return res.data;
        }
    });

    const mutation = useMutation({
        mutationFn: async (newStory) => {
            const res = await axios.post('http://localhost:5000/success-stories', newStory, { withCredentials: true });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['success-stories']);
            reset();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Story Submitted Successfully',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-purple-700">Success Stories</h2>
            
            {/* Submission Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-12 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-4 text-center">Share Your Success Story</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Self Biodata ID</label>
                            <input 
                                type="number" 
                                {...register("selfBiodataId", { required: true })} 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                            {errors.selfBiodataId && <span className="text-red-500 text-sm">Required</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Partner Biodata ID</label>
                            <input 
                                type="number" 
                                {...register("partnerBiodataId", { required: true })} 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                            {errors.partnerBiodataId && <span className="text-red-500 text-sm">Required</span>}
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Couple Image Link</label>
                        <input 
                            type="url" 
                            {...register("imageLink", { required: true })} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.imageLink && <span className="text-red-500 text-sm">Required</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Marriage Date</label>
                        <input 
                            type="date" 
                            {...register("marriageDate", { required: true })} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                        {errors.marriageDate && <span className="text-red-500 text-sm">Required</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Review Star (1-5)</label>
                        <select {...register("reviewStar", { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Success Story Review</label>
                        <textarea 
                            {...register("successStoryReview", { required: true })} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            rows="4"
                        ></textarea>
                        {errors.successStoryReview && <span className="text-red-500 text-sm">Required</span>}
                    </div>

                    <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-200">
                        Submit Story
                    </button>
                </form>
            </div>

            {/* Stories Grid */}
            {isLoading ? (
                <div className="text-center">Loading stories...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map(story => (
                        <div key={story._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={story.imageLink} alt="Couple" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-500">Married on: {new Date(story.marriageDate).toLocaleDateString()}</span>
                                    <div className="flex text-yellow-400">
                                        {[...Array(parseInt(story.reviewStar))].map((_, i) => <FaStar key={i} />)}
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">{story.successStoryReview}</p>
                                <div className="text-xs text-gray-400">
                                    Biodata IDs: {story.selfBiodataId} & {story.partnerBiodataId}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SuccessStory;
