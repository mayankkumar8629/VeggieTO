
import { FaTrash } from 'react-icons/fa' // Delete icon
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai' // Quantity counter icons

export const CartCard = ({ name, category, price, quantity, onDelete, onIncrement, onDecrement }) => {
  return (
    <div className='flex flex-row p-4 border-b border-gray-200'>
      {/* Product Image */}
      <div className='w-24 h-24 mr-4 flex-shrink-0'>
        <img src="https://picsum.photos/400" alt={name} className='w-full h-full object-cover rounded' />
      </div>

      {/* Product Details */}
      <div className='flex flex-col justify-between flex-grow'>
        {/* Top Row: Name and Delete Icon */}
        <div className='flex justify-between items-center'>
          <div className='font-semibold text-lg'>{name}</div>
          <button onClick={onDelete} className='text-red-500 hover:text-red-700'>
            <FaTrash />
          </button>
        </div>

        {/* Size and Color */}
        <div className='flex space-x-4 mt-1 text-sm text-gray-600'>
          <div>{category}</div>
        </div>

        {/* Bottom Row: Price and Quantity Counter */}
        <div className='flex justify-between items-center mt-2'>
          <div className='text-lg font-semibold'>₹{price.toFixed(2)}</div>
          <div className='flex items-center space-x-2'>
            <button onClick={onDecrement} className='border rounded-full px-2 py-1 hover:bg-gray-200'>
              <AiOutlineMinus />
            </button>
            <span>{quantity}</span>
            <button onClick={onIncrement} className='border rounded-full px-2 py-1 hover:bg-gray-200'>
              <AiOutlinePlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
