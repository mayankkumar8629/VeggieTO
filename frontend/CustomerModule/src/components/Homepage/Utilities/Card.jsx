import React from 'react';

const Card = ({ name, rating, review }) => {
    return (
        <div className="flex flex-col items-center gap-4 lg:w-[400px] md:w-[300px] xs:w-full mx-auto bg-[#efebebda] shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-6 px-6 font-[Plus-Jakarta-Sans]">
            {/* Placeholder image */}
            <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold">
                {name.charAt(0).toUpperCase()}
            </div>

            {/* Name */}
            <div className="text-gray-800 text-lg font-semibold">{name}</div>

            {/* Rating */}
            <div className="text-yellow-500 text-sm">⭐ {rating} / 5</div>

            {/* Review */}
            <div className="text-gray-500 text-sm text-center">{review}</div>
        </div>
    );
};

export default Card;
