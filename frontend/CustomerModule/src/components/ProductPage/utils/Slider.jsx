import { useState } from 'react';

export const Slider = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(900);

  const min = 0;
  const max = 1000;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 10);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 10);
    setMaxValue(value);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <label className="block mb-2 font-semibold">Price Range</label>
      <div className="relative h-6">
        {/* Background Track */}
        <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded-full transform -translate-y-1/2"></div>

        {/* Active Range */}
        <div
          className="absolute top-1/2 h-1 bg-blue-500 rounded-full transform -translate-y-1/2 transition-all duration-300 ease-in-out"
          style={{
            left: `${(minValue / max) * 100}%`,
            width: `${((maxValue - minValue) / max) * 100}%`,
          }}
        ></div>

        {/* Min Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent slider-thumb"
          style={{ zIndex: 3 }}
        />

        {/* Max Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent slider-thumb"
          style={{ zIndex: 2 }}
        />
      </div>

      {/* Tailwind-driven styling via global CSS */}
      <style jsx global>{`
        input[type='range'].slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 1.25rem; /* 20px */
          width: 1.25rem;
          background-color: #3b82f6; /* Tailwind blue-500 */
          border-radius: 9999px;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        input[type='range'].slider-thumb:hover::-webkit-slider-thumb,
        input[type='range'].slider-thumb:focus::-webkit-slider-thumb {
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.7);
        }

        input[type='range'].slider-thumb::-moz-range-thumb {
          height: 1.25rem;
          width: 1.25rem;
          background-color: #3b82f6;
          border-radius: 9999px;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        input[type='range'].slider-thumb:hover::-moz-range-thumb,
        input[type='range'].slider-thumb:focus::-moz-range-thumb {
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.7);
        }

        input[type='range'].slider-thumb::-webkit-slider-runnable-track {
          background: transparent;
          height: 1px;
        }

        input[type='range'].slider-thumb::-moz-range-track {
          background: transparent;
          height: 1px;
        }
      `}</style>

      <div className="flex justify-between mt-2">
        <span>₹{minValue}</span>
        <span>₹{maxValue}</span>
      </div>
    </div>
  );
};
