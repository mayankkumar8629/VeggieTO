import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";

const DeliveryCard = () => {
  return (
    <div className='flex items-center gap-4 max-w-md mx-auto bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-4 px-6 font-[Plus-Jakarta-Sans]'>
      <div className='text-green-600 text-4xl'>
        <TbTruckDelivery />
      </div>
      <div className='text-gray-800 text-base sm:text-lg font-medium leading-tight'>
        Door To Door Delivery <br />
        <span className="text-sm text-gray-500">Get Products Right at Your Doorstep</span>
      </div>
    </div>
  );
}

export default DeliveryCard;
