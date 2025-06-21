import React from 'react';
import image from '../../assets/image.png'

const PreSecondSection = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row justify-between items-start gap-12 px-10 py-20 bg-white">

            {/* Heading & Description */}
            <div className="flex-1 space-y-6 text-left">
                <h2 className="text-5xl font-bold font-[Plus-Jakarta-Sans] font-stretch-200% text-gray-800 leading-tight">
                    Transforming Everyday <br /> Shopping with Quality
                </h2>
                <p className="text-lg font-[Plus-Jakarta-Sans] text-gray-700">
                    At Krishi, we are committed to delivering the finest, freshest ingredients straight to your table. Our mission is simple: to make premium grocery shopping accessible and enjoyable for everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center text-left w-full py-6">
                    <div className='flex-initial flex flex-col items-start sm:items-center justify-center border-b sm:border-b-0 sm:border-r-2 border-gray-400 pr-4 pb-4 sm:pb-0'>
                        <span className='font-[Plus-Jakarta-Sans] text-4xl font-semibold'>15+</span>
                        <span className='font-[Plus-Jakarta-Sans] text-gray-500 text-md'>Years of Excellence</span>
                    </div>

                    <div className='flex-initial flex flex-col items-start sm:items-center justify-center border-b sm:border-b-0 sm:border-r-2 border-gray-400 pr-4 pb-4 sm:pb-0'>
                        <span className='font-[Plus-Jakarta-Sans] text-4xl font-semibold'>150+</span>
                        <span className='font-[Plus-Jakarta-Sans] text-gray-500 text-md'>Curated Products</span>
                    </div>

                    <div className='flex-initial flex flex-col items-start sm:items-center justify-center pr-4'>
                        <span className='font-[Plus-Jakarta-Sans] text-4xl font-semibold'>60+</span>
                        <span className='font-[Plus-Jakarta-Sans] text-gray-500 text-md'>Exclusive Branches</span>
                    </div>
                </div>

                <button className="btn rounded-full border-2 py-2 px-6 shadow-md hover:shadow-lg transition-all duration-300">
                    Discover More
                </button>
            </div>
            <div className="flex-1 space-y-6">
                <img src={image} className='flex-initial' />
            </div>
        </div>
    )
}

export default PreSecondSection;
