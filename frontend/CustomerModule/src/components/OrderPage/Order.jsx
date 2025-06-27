import React, { useState, useEffect } from 'react';
import {
  Package,
  Calendar,
  CreditCard,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Filter,
  ArrowDownAZ,
  ArrowUpAZ,
  Star,
  MapPin,
  Phone,
  Mail,
  ShoppingBag
} from 'lucide-react';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      const response = await fetch("http://localhost:3000/api/customer/order/getAllOrders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (response.ok && data) {
        setOrders(data.orders || []);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortOrders = () => {
    let filtered = [...orders];

    if (minPrice) filtered = filtered.filter(o => o.totalPrice >= parseFloat(minPrice));
    if (maxPrice) filtered = filtered.filter(o => o.totalPrice <= parseFloat(maxPrice));

    switch (sortOption) {
      case 'priceLowToHigh':
        filtered.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
      case 'priceHighToLow':
        filtered.sort((a, b) => b.totalPrice - a.totalPrice);
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return filtered;
  };

  const getStatusStyles = (status) => {
    const styles = {
      pending: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200',
      confirmed: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200',
      delivered: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200',
      cancelled: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200',
      refunded: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border border-purple-200'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleString('en-IN');

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(price);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Your Orders</h2>
          <p className="text-gray-600">Please wait while we fetch your order history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 flex flex-col items-center justify-center text-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const visibleOrders = filterAndSortOrders();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Orders</h1>
              <p className="text-purple-100">Track and manage all your purchases</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <Filter className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Min Price"
                    className="border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/70"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Max Price"
                    className="border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/70"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="lg:ml-auto">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/70 font-medium"
              >
                <option value="newest">🕒 Newest First</option>
                <option value="oldest">📅 Oldest First</option>
                <option value="priceLowToHigh">💰 Price Low to High</option>
                <option value="priceHighToLow">💎 Price High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {visibleOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-700 mb-3">No Orders Found</h2>
              <p className="text-gray-500">No orders match your current filters. Try adjusting your search criteria.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            {visibleOrders.map((order, index) => (
              <div
                key={order._id}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full text-white">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </h2>
                        <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4" /> 
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                        {formatPrice(order.totalPrice)}
                      </div>
                      <p className="text-sm text-gray-500 flex items-center justify-end gap-1 mt-1">
                        <CreditCard className="w-4 h-4" /> 
                        {order.razorpayOrderId.slice(-6)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full font-semibold ${getStatusStyles(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-4 p-4 bg-gray-50/70 rounded-2xl border border-gray-100 hover:bg-gray-100/70 transition-colors duration-200">
                        <div className="relative group">
                          <img
                            src={item.itemId?.image || item.itemId?.imageUrl || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop&crop=center'}
                            alt={item.itemId?.name || 'Product'}
                            className="w-20 h-20 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-200"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop&crop=center';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors duration-200"></div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg mb-1">
                            {item.itemId?.name || 'Unknown Item'}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-gray-500">
                              {formatPrice(item.itemId?.price)} each
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-800">
                            {formatPrice((item.itemId?.price || 0) * item.quantity)}
                          </div>
                          <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-gray-600">4.5</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="bg-gray-50/70 p-6 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-600">
                      <p>Payment ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{order.razorpayOrderId}</span></p>
                    </div>
                    
                    <div className="flex gap-3">
                      {order.status === 'confirmed' && (
                        <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
                          <Truck className="w-4 h-4 inline mr-2" />
                          Track Order
                        </button>
                      )}
                      {order.status === 'pending' && (
                        <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
                          <XCircle className="w-4 h-4 inline mr-2" />
                          Cancel
                        </button>
                      )}
                      <button className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-400 transform hover:scale-105 transition-all duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'pending':
      return <Clock className="w-4 h-4" />;
    case 'confirmed':
      return <CheckCircle className="w-4 h-4" />;
    case 'delivered':
      return <Truck className="w-4 h-4" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4" />;
    case 'refunded':
      return <RefreshCw className="w-4 h-4" />;
    default:
      return <Package className="w-4 h-4" />;
  }
};

export default Order;