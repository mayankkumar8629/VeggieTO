import { Minus, Plus, Trash2 } from "lucide-react";

const CartCard = ({ name, category, price, quantity, onIncrement, onDecrement, onDelete }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{category}</p>
        <p className="font-bold text-green-600 text-lg">₹{price}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          <button
            onClick={onDecrement}
            className="p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
          >
            <Minus size={16} className="text-gray-600" />
          </button>
          <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={onIncrement}
            className="p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
        </div>
        
        <button
          onClick={onDelete}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  </div>
);


export default CartCard;