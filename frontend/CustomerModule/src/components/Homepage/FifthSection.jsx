import React from 'react';
import Carousel from './Utilities/Carousel';

const cardData= [
    {
        image: 'https://via.placeholder.com/100',
        name: 'Apple',
        rating: 4.5,
        review: 'Fresh and crispy!',
    },
    {
        image: 'https://via.placeholder.com/100',
        name: 'Banana',
        rating: 4.0,
        review: 'Sweet and ripe.',
    },
    {
        image: 'https://via.placeholder.com/100',
        name: 'Carrot',
        rating: 4.2,
        review: 'Crunchy and healthy.',
    },
    {
        image: 'https://via.placeholder.com/100',
        name: 'Tomato',
        rating: 4.3,
        review: 'Juicy and red.',
    },
    {
        image: 'https://via.placeholder.com/100',
        name: 'Potato',
        rating: 4.1,
        review: 'Perfect for fries!',
    },
];

const FifthSection = () => {
    return (
        <div className="flex flex-col gap-y-6 flex-1">
    <div className='flex justify-evenly pt-14 text-center items-center font-[Plus-Jakarta-Sans] lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-shadow-lg'>
        Customers Speak, Krishi Listens
    </div>
    <div className='flex justify-evenly text-center items-center font-[Plus-Jakarta-Sans] lg:text-5xl md:text-4xl sm:text-3xl text-2xl'>
        <p className="text-lg font-[Plus-Jakarta-Sans] px-14 text-gray-500">
            Discover what our loyal customers have to say about their Krishi experience. Explore testimonials that highlight their satisfaction and showcase why Krishi is their go-to choice for convenient grocery shopping.
        </p>
    </div>
    <Carousel cards={cardData} />
</div>

    );
};

export default FifthSection;
