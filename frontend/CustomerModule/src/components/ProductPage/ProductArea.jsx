import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const ProductArea = () => {
  const [products, setProducts] = useState({});
  useEffect(() => {
    axios.get('http://localhost:3000/products')
  })

  return (
    <div className='flex flex-row max-w-[25%] justify-center'>
        <div className='flex-col hidden sm:flex '>
            <div className='flex  items-center justify-center p-4 border-b-2 border-gray-200'>
              <span className='text-xl font-bold'>Product Category</span>
            </div>
            <div>
              <form className='flex flex-col p-4 justify-center'>
                <div className='flex'>
                <input type="checkbox" name="category" value="electronics" className='p-4' />
                <label className='ml-2'>Fruits</label>
                </div>
                <div className='flex'>
                <input type="checkbox" name="category" value="electronics" className='p-4' />
                <label className='ml-2'>Vegetables</label>
                </div>
                <div className='flex'>
                <input type="checkbox" name="category" value="electronics" className='p-4' />
                <label className='ml-2'>groceries</label>
                </div>
                <div className='flex'>
                <input type="checkbox" name="category" value="electronics" className='p-4' />
                <label className='ml-2'>dairy</label>
                </div>
                <div className='flex'>
                <input type="checkbox" name="category" value="electronics" className='p-4' />
                <label className='ml-2'>Beverages</label>
                </div>
                <div className='flex'>
                <input type="checkbox" name="category" value="electronics" className='p-4' />
                <label className='ml-2'>Eggs & Meat</label>
                </div>
                <label className='text-lg font-semibold mb-2'>Filter by Price:  </label>
                <input type='range'  max='1000' className='w-full mb-4' />
                
                <button type='submit' className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>Filter</button>

              </form>
            </div>
        </div>
        <div className='flex-initial  '>
            cards will be here
        </div>

    </div>
  )
}
