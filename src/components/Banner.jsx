import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            title: "Find Your Perfect Match",
            subtitle: "Join thousands of happy couples who found love on SacredMatch. Your journey to a beautiful future starts here."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            title: "Start Your Journey Today",
            subtitle: "Connect with compatible partners and build a relationship that lasts a lifetime."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            title: "Trusted Matrimony Service",
            subtitle: "We prioritize your privacy and security while you search for your soulmate."
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 2000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative bg-gray-900 h-[600px] overflow-hidden">
            {slides.map((slide, index) => (
                <div 
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="absolute inset-0">
                        <img 
                            src={slide.image} 
                            alt={slide.title} 
                            className="w-full h-full object-cover opacity-40"
                        />
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                                {slide.title.split(' ').map((word, i) => (
                                    i === slide.title.split(' ').length - 1 || i === slide.title.split(' ').length - 2 ? 
                                    <span key={i} className="text-pink-500"> {word}</span> : 
                                    <span key={i}> {word}</span>
                                ))}
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                {slide.subtitle}
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link to="/biodatas" className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition duration-300 transform hover:scale-105">
                                    Browse Biodatas
                                </Link>
                                <Link to="/register" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition duration-300">
                                    Register Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Slider Indicators */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-pink-600 w-8' : 'bg-gray-400 hover:bg-white'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
