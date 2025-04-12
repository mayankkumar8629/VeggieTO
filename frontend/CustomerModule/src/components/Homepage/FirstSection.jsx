import React from 'react';
import DeliveryCard from './Utilities/DeliveryCard';
import grocery from '../../assets/grocery.png';
import img from '..//../assets/arrow.png';
import Fresh from './Utilities/Fresh';

const FirstSection = () => {
    return (
        <div className="bg-[#efebebda]">
            <div className='flex justify-evenly pt-14 text-center items-center font-[Plus-Jakarta-Sans] lg:text-6xl md:text-4xl sm:text-3xl text-2xl text-shadow-lg'>
                Get Products Right from <br />Farm with Krishi
            </div>
            <div className="flex justify-center">
                <div className="flex-initial "><button className="rounded-full border-2 py-2 px-5 shadow-md hover:shadow-lg transition-all duration-300">Shop Now</button></div>
            </div>
            <div className="flex justify-center">
                <div className="flex-initial flex-col items-center gap-4 mt-5">
                    <div className="flex-initial  "><img src={img} className='flex-initial' /></div>
                    <div className="flex-initial "><DeliveryCard /></div>
                </div>
                <div className="flex-initial  "><img src={grocery} className='flex-initial place-content-end' /></div>
                <div className="flex-initial  "><Fresh /></div>
            </div>

        </div>
    )
}

export default FirstSection;