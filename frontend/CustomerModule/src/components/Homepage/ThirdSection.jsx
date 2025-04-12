import React from 'react'
import DiscoverCard from './Utilities/DiscoverCard';
import img from '../../assets/DISCOVER1.png';
import img2 from '../../assets/Discover2.png';
import img3 from '../../assets/Discover3.png';
import img4 from '../../assets/Discover4.png';

export const ThirdSection = () => {
    return (
        <div className="bg-[#efebebda] px-6">
            <div className='flex justify-evenly pt-14 text-center items-center font-[Plus-Jakarta-Sans] lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-shadow-lg'>
                Discover Krishi's Wide <br />Product Range
            </div>
            <div className='flex justify-evenly text-center items-center font-[Plus-Jakarta-Sans] lg:text-5xl md:text-4xl sm:text-3xl text-2xl '>

                <p className="text-lg font-[Plus-Jakarta-Sans] text-gray-500">
                    Explore a variety of fresh, high-quality products carefully curated to meet all your culinary needs.
                </p>
            </div>
            <div className='flex flex-row justify-center'>
                <DiscoverCard title="Farm-Fresh Vegetables" description="Bring home the goodness of nature with our handpicked, vibrant, and nutritious vegetables." imgUrl={img} />
                <DiscoverCard title="Seasonal Fresh Fruits" description="Bring home the goodness of nature with our handpicked, vibrant, and nutritious vegetables." imgUrl={img2} />
            </div>
            <div className='flex flex-row justify-center'>
                <DiscoverCard title="Premium Meat & Seafood" description="Bring home the goodness of nature with our handpicked, vibrant, and nutritious vegetables." imgUrl={img4} />
                <DiscoverCard title="Pure Dairy Essentials" description="Bring home the goodness of nature with our handpicked, vibrant, and nutritious vegetables." imgUrl={img3} />
            </div>
        </div>
    )
}
