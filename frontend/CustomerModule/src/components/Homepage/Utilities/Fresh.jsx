import React from "react";
import icon from "../../../assets/icon.png";

const Fresh = () => {
  return (
    <div
      className="flex flex-col items-center 
                    gap-2 xs:gap-3 sm:gap-4 md:gap-4 lg:gap-4
                    max-w-full lg:max-w-md md:max-w-sm sm:max-w-xs xs:max-w-[200px]
                    mx-auto bg-white shadow-lg hover:shadow-xl 
                    transition-all duration-300 rounded-xl 
                    py-2 xs:py-3 sm:py-4 md:py-4 lg:py-4
                    px-3 xs:px-4 sm:px-6 md:px-6 lg:px-6
                    font-[Plus-Jakarta-Sans] text-center"
    >
      {/* Icon */}
      <div className="flex-initial">
        <img
          src={icon}
          className="h-12 xs:h-14 sm:h-16 md:h-18 lg:h-20 
                        w-auto object-contain"
          alt="Fresh products icon"
        />
      </div>

      {/* Main Title */}
      <div
        className="text-black-800 
                      text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl
                      font-medium leading-tight"
      >
        100% Fresh
      </div>

      {/* Subtitle */}
      <div
        className="hidden sm:block 
                text-gray-600 
                text-xs sm:text-sm md:text-base lg:text-lg
                font-normal leading-tight"
      >
        Quality and Organic Products
      </div>
    </div>
  );
};

export default Fresh;
