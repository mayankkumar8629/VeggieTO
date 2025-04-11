import React from 'react';
import icon from '../../../assets/icon.png';

 const Fresh = () => {
  return (
    <div className='flex flex-col items-center gap-4 max-w-md mx-auto bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-4 px-6 font-[Plus-Jakarta-Sans]'>
    <div className='flex-initial'><img src={icon} className='h-20' /></div>
    <div className='text-black-800 text-base sm:text-lg font-medium leading-tight'> 100% Fresh </div>
    <div className='text-gray-600 text-base sm:text-lg font-small leading-tight'> Quality and Organic Products </div>
    </div>
  )
}

export default Fresh;
