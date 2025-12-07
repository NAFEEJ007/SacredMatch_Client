import { FaUserPlus, FaSearch, FaComments, FaRing } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaUserPlus className="text-4xl text-white" />,
            title: "Create Profile",
            description: "Register for free & create your profile with your details and preferences.",
            color: "bg-blue-500"
        },
        {
            icon: <FaSearch className="text-4xl text-white" />,
            title: "Search Partner",
            description: "Search for your perfect match using our advanced search filters.",
            color: "bg-pink-500"
        },
        {
            icon: <FaComments className="text-4xl text-white" />,
            title: "Connect",
            description: "Send interest & connect with members you like. Start a conversation.",
            color: "bg-purple-500"
        },
        {
            icon: <FaRing className="text-4xl text-white" />,
            title: "Get Married",
            description: "Find your soulmate and get married. Start your happy journey.",
            color: "bg-red-500"
        }
    ];

    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Finding your life partner is simple and easy with SacredMatch. Follow these 4 simple steps.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center group">
                            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition duration-300 ${step.color}`}>
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-600 px-4">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
