import React from 'react';
import TickCard from './Utilities/TickCard';

export const SecondSection = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 px-6 py-10">
            {/* Text Content */}


            {/* Tick Cards */}
            <div className="flex-1 space-y-6">
                <TickCard
                    title="Unmatched Freshness"
                    description="We source only the freshest, highest-quality ingredients for your kitchen. At FreshMart, freshness is not just a goal—it’s our promise to elevate every meal you make."
                />
                <TickCard
                    title="Tailored Shopping Experience"
                    description="Enjoy a shopping journey designed just for you. From personalized product recommendations to flexible shopping lists, FreshMart ensures you find exactly what you need effortlessly."
                />
                <TickCard
                    title="Exceptional Customer Support"
                    description="Our dedicated team is here to ensure a smooth and seamless shopping experience. From user-friendly navigation to responsive support, we make your satisfaction our top priority."
                />
            </div>
            <div className="flex-1 space-y-5 flex-col">
                <h2 className="text-4xl font-bold font-[Plus-Jakarta-Sans] text-gray-800 font-stretch-ultra-expanded">
                    Why Choose Us? <br />Elevate Your <br />Shopping Experience

                </h2>
                <p className="text-lg  font-[Plus-Jakarta-Sans] text-gray-700">
                    Curious why GreenCart stands out as the go-to choice for premium groceries? Our dedication to quality, convenience, and freshness transforms every shopping trip into a delightful and satisfying experience. Discover how GreenCart makes your culinary journey exceptional, every step of the way.
                </p>
            <div className="flex-1 space-y-5">
                <div className="flex-initial "><button className="rounded-full border-2 py-2 px-5 shadow-md hover:shadow-lg transition-all duration-300">Learn More</button></div>
            </div>
            </div>
        </div>
    );
};
