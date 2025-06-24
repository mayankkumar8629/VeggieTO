import React from 'react';
import { useNavigate } from 'react-router-dom';

const DiscoverCard = ({ title, description, imgUrl }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/products');
  };

  return (
    <div
      className="
        flex flex-col md:flex-row 
        w-full md:w-1/2 
        items-center gap-4 sm:gap-6 
        p-4 sm:p-6 
        bg-white rounded-3xl shadow-md hover:shadow-lg 
        transition-all duration-300
        m-3
      "
    >
      {/* Image first */}
      <div className="w-full md:w-1/2">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-auto object-cover rounded-2xl"
        />
      </div>

      {/* Text content below on small, beside on md+ */}
      <div className="flex-initial space-y-4 w-full md:w-1/2">
        <h3 className="text-gray-800 text-lg sm:text-xl font-semibold font-[Plus-Jakarta-Sans]">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-500 mt-1 font-[Plus-Jakarta-Sans]">
          {description}
        </p>
        <button
          className="mt-2 btn rounded-full border-2 py-2 px-5 shadow-md hover:shadow-lg transition-all duration-300"
          onClick={handleClick}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default DiscoverCard;
