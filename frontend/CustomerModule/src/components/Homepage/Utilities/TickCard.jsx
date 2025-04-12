import React from 'react';
import { TiTick } from "react-icons/ti";

const TickCard = ({title, description}) => {
    return (
        <div>
            <div className='flex items-center gap-4 max-w-md mx-auto bg-[#efebebda] shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-4 px-6 font-[Plus-Jakarta-Sans]'>
                <div className='text-white bg-green-600 rounded-full text-4xl'>
                    <TiTick />
                </div>
                <div className='text-gray-800 text-base sm:text-lg font-medium leading-tight'>
                    {title} <br />
                    <span className="text-sm text-gray-500">{description}</span>
                </div>
            </div>
        </div>
    )
}

export default TickCard;
