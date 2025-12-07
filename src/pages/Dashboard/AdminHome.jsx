import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUsers, FaMale, FaFemale, FaCrown, FaDollarSign } from "react-icons/fa";

const StatCard = ({ title, value, icon: Icon, colorClass, bgClass, textClass }) => (
    <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${colorClass} flex items-center justify-between transition-transform hover:scale-105`}>
        <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${bgClass} ${textClass}`}>
            <Icon className="text-2xl" />
        </div>
    </div>
);

const AdminHome = () => {
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/admin-stats', { withCredentials: true });
            return res.data;
        }
    });

    const data = [
        { name: 'Total Biodata', value: stats.totalBiodata || 0 },
        { name: 'Male Biodata', value: stats.maleBiodata || 0 },
        { name: 'Female Biodata', value: stats.femaleBiodata || 0 },
        { name: 'Premium Biodata', value: stats.premiumBiodata || 0 },
        { name: 'Total Revenue', value: stats.totalRevenue || 0 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
                <p className="text-gray-500 mt-2">Overview of your platform's performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    title="Total Biodata" 
                    value={stats.totalBiodata} 
                    icon={FaUsers} 
                    colorClass="border-blue-500"
                    bgClass="bg-blue-100"
                    textClass="text-blue-600"
                />
                <StatCard 
                    title="Male Biodata" 
                    value={stats.maleBiodata} 
                    icon={FaMale} 
                    colorClass="border-green-500"
                    bgClass="bg-green-100"
                    textClass="text-green-600"
                />
                <StatCard 
                    title="Female Biodata" 
                    value={stats.femaleBiodata} 
                    icon={FaFemale} 
                    colorClass="border-pink-500"
                    bgClass="bg-pink-100"
                    textClass="text-pink-600"
                />
                <StatCard 
                    title="Premium Biodata" 
                    value={stats.premiumBiodata} 
                    icon={FaCrown} 
                    colorClass="border-yellow-500"
                    bgClass="bg-yellow-100"
                    textClass="text-yellow-600"
                />
                <StatCard 
                    title="Total Revenue" 
                    value={`$${stats.totalRevenue}`} 
                    icon={FaDollarSign} 
                    colorClass="border-purple-500"
                    bgClass="bg-purple-100"
                    textClass="text-purple-600"
                />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Data Distribution</h3>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
