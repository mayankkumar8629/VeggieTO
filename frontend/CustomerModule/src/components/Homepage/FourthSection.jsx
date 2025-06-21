import React from 'react';
import { AiOutlineSafety } from 'react-icons/ai';
import { FaBasketShopping } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import {  MdOutlinePersonPin } from 'react-icons/md';

const FourthSection = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row justify-between items-start gap-12 px-10 py-20 bg-white">

            {/* Heading & Description */}
            <div className="flex-1 space-y-6 justify-between ">
                <h2 className="text-5xl py-4 font-bold font-[Plus-Jakarta-Sans] text-gray-800 leading-tight">
                    Explore Krishi's Cutting Edge Features
                </h2>
                <div className="flex flex-col  items-start  py-6">
                                <div className='flex items-center gap-4 max-w-md   hover:shadow-xl transition-all duration-300 rounded-xl py-4  font-[Plus-Jakarta-Sans]'>
                                    <div className='text-green-600 bg-green-200 rounded-full p-2 text-4xl'>
                                    <AiOutlineSafety />
                                    </div>
                                    <div className='text-gray-800 text-base sm:text-lg font-medium leading-tight'>
                                        Safe & Secure Checkout <br />
                                        <span className="text-sm text-gray-500">We prioritize your safety. Enjoy a quick, hassle-free, and secure checkout process, ensuring every purchase gives you total peace of mind.</span>
                                    </div>
                                   
                                </div>
                                <div className='flex items-center gap-4 max-w-md   hover:shadow-xl transition-all duration-300 rounded-xl py-4  font-[Plus-Jakarta-Sans]'>
                                    <div className='text-green-600 bg-green-200 rounded-full p-2 text-4xl'>
                                    <MdOutlinePersonPin />
                                    </div>
                                    <div className='text-gray-800 text-base sm:text-lg font-medium leading-tight'>
                                    Tailored Recommendations <br />
                                        <span className="text-sm text-gray-500">Get product suggestions customized to match your taste and shopping habits. Your experience is personalized, helping you discover products you’ll love.</span>
                                    </div>
                                </div>
                              
                </div>
            </div>
            <div className="flex-1 space-y-6">
            <p className="text-lg font-[Plus-Jakarta-Sans] text-gray-700">
            Krishi delivers innovation right to your fingertips with a suite of advanced features designed to elevate your shopping experience. Discover what makes Krishi unique and enjoy a seamless, effortless approach to grocery shopping.
        </p>
        <button className="btn rounded-full border-2 py-2 px-6 shadow-md hover:shadow-lg transition-all duration-300">
          Read More
        </button>
                <div className="flex flex-col  items-start  text-left w-full py-6">
                                <div className='flex items-center gap-4 max-w-md   hover:shadow-xl transition-all duration-300 rounded-xl py-4  font-[Plus-Jakarta-Sans]'>
                                    <div className='text-green-600 bg-green-200 rounded-full p-2 text-4xl'>
                                    <FiSearch />
                                    </div>
                                    <div className='text-gray-800 text-base sm:text-lg font-medium leading-tight'>
                                    Intelligent Product Search <br />
                                        <span className="text-sm text-gray-500">Easily find exactly what you’re looking for with our advanced search tool. It quickly learns your preferences and makes product discovery smooth and efficient.</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-4 max-w-md   hover:shadow-xl transition-all duration-300 rounded-xl py-4  font-[Plus-Jakarta-Sans]'>
                                    <div className='text-green-600 bg-green-200 rounded-full p-2 text-4xl'>
                                    <FaBasketShopping />
                                    </div>
                                    <div className='text-gray-800 text-base sm:text-lg font-medium leading-tight'>
                                    Convenient Virtual Cart<br />
                                        <span className="text-sm text-gray-500">Simplify your shopping with a virtual cart that remembers your selected items. Easily manage, organize, and review your cart before finalizing your purchase.</span>
                                    </div>
                                </div>
                              
                </div>
            </div>
        </div>
    )
}

export default FourthSection;

