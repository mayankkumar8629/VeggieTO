import React, { useState } from 'react';
import Card from './Card';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const Carousel = ({ cards }) => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 3; // how many cards to show at once

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setStartIndex((prev) => Math.min(prev + 1, cards.length - visibleCount));
    };

    const visibleCards = cards.slice(startIndex, startIndex + visibleCount);

    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-6 overflow-hidden">
                {visibleCards.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                    className={`btn p-2 rounded-full border-gray-400 border ${
                        startIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600 hover:text-white'
                    }`}
                >
                    <FaArrowLeft />
                </button>
                <button
                    onClick={handleNext}
                    disabled={startIndex >= cards.length - visibleCount}
                    className={`btn p-2 rounded-full border-gray-400 border ${
                        startIndex >= cards.length - visibleCount
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-green-600 hover:text-white'
                    }`}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
