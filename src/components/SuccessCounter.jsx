import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CountUp from 'react-countup';

const SuccessCounter = () => {
    const { data: stats = {} } = useQuery({
        queryKey: ['public-stats'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/public-stats`);
            return res.data;
        }
    });

    const counters = [
        { label: "Total Biodata", value: stats.totalBiodata || 0 },
        { label: "Girls Biodata", value: stats.femaleBiodata || 0 },
        { label: "Boys Biodata", value: stats.maleBiodata || 0 },
        { label: "Marriages Completed", value: stats.marriageCompleted || 0 },
    ];

    return (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {counters.map((counter, index) => (
                        <div key={index} className="p-4">
                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                <CountUp end={counter.value} duration={2.5} />
                            </div>
                            <p className="text-lg md:text-xl opacity-90">{counter.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessCounter;
