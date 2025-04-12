import React from 'react';

const DiscoverCard = ({ title, description, imgUrl }) => {
    return (
        <div className='flex     flex-row w-1/2 items-center gap-4 sm:gap-6 pl-6 m-3 pb-0 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
            <div className='flex-initial space-y-4'>
                <h3 className='text-gray-800 text-lg sm:text-xl font-semibold font-[Plus-Jakarta-Sans]'>
                    {title}
                </h3>
                <p className='text-sm sm:text-base text-gray-500 mt-1 font-[Plus-Jakarta-Sans]'>
                    {description}
                </p>
                <button className='mt-2 rounded-full border-2 py-2 px-5 shadow-md hover:shadow-lg transition-all duration-300'>
                    Shop Now
                </button>
            </div>
            <div className='pb-0 pt-30 '>
                <img src={imgUrl} alt={title} className='w-full h-full  ' />
            </div>
        </div>
    );
};

export default DiscoverCard;
