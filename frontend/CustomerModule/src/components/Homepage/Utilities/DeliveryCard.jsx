import React from "react";
import { TbTruckDelivery } from "react-icons/tb";

const DeliveryCard = () => {
  return (
    <div
      className="flex items-center 
                    gap-2 xs:gap-3 sm:gap-4 md:gap-4 lg:gap-4
                    max-w-full lg:max-w-lg md:max-w-md sm:max-w-sm xs:max-w-xs 
                    mx-auto bg-white shadow-lg hover:shadow-xl 
                    transition-all duration-300 rounded-xl 
                    py-2 xs:py-3 sm:py-4 md:py-4 lg:py-4
                    px-3 xs:px-4 sm:px-6 md:px-6 lg:px-6
                    font-[Plus-Jakarta-Sans]"
    >
      {/* Icon */}
      <div
        className="text-green-600 
                      text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl
                      flex-shrink-0"
      >
        <TbTruckDelivery />
      </div>

      {/* Text Content */}
      <div
        className="text-gray-800 
                      text-xs xs:text-sm sm:text-base md:text-base lg:text-lg
                      font-medium leading-tight min-w-0 flex-1"
      >
        <div className="font-semibold">Door To Door Delivery</div>
        <div
          className="hidden sm:block 
                text-xs sm:text-sm md:text-sm lg:text-sm
                text-gray-500 mt-0.5"
        >
          Get Products Right at Your Doorstep
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;
