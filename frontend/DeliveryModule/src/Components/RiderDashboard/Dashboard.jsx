// 📦 Dashboard.js (Optimized with Socket Integration - Simplified)
import React, { useEffect, useState, useMemo } from 'react';
import { MapPin, Clock, DollarSign, Package, CheckCircle, User, Phone, Truck, Star, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Socket from '../utils/Socket'; 

const Dashboard = ({ activeTab }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingDeliveries, setProcessingDeliveries] = useState(new Set());
  const navigate = useNavigate();

  // Memoized API endpoint getter
  const apiEndpoint = useMemo(() => {
    const baseUrl = 'http://localhost:3000/api/logistics/rider';
    switch (activeTab) {
      case 'pending': return `${baseUrl}/pendingDeliveries`;
      case 'ongoing': return `${baseUrl}/ongoingDeliveries`;
      case 'completed': return `${baseUrl}/completedDeliveries`;
      default: return `${baseUrl}/pendingDeliveries`;
    }
  }, [activeTab]);

  // Check authentication
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
  }, [navigate]);

  // Fetch deliveries function
  const fetchDeliveries = async () => {
    if (!apiEndpoint) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(apiEndpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const fetchedDeliveries = response.data?.deliveries || [];
      console.log('Fetched deliveries:', fetchedDeliveries);
      setDeliveries(fetchedDeliveries);
    } catch (err) {
      console.error('Fetch deliveries error:', err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch deliveries";
      setError(errorMessage);
      setDeliveries([]);
      
      // If auth error, redirect to login
      if (err.response?.status === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  // Socket connection and event handlers
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    // Connect socket if not connected
    if (!Socket.connected) {
      Socket.connect();
    }

    // Handle new delivery
    const handleNewDelivery = (newDelivery) => {
      console.log('New delivery received:', newDelivery);
      
      // Only add to pending deliveries if we're on pending tab
        setDeliveries(prev => {
          // Check if delivery already exists to prevent duplicates
          const exists = prev.some(d => d._id === newDelivery.deliveryId);
          if (!exists) {
            return [newDelivery, ...prev];
          }
          return prev;
        });
    };

    // Handle delivery updates
    const handleDeliveryUpdate = (updatedDelivery) => {
      console.log('Delivery updated:', updatedDelivery);
      
      setDeliveries(prev => {
        const updatedDeliveries = prev.map(delivery => 
          delivery._id === updatedDelivery._id ? { ...delivery, ...updatedDelivery } : delivery
        );
        
        // Remove delivery if it no longer belongs to current tab
        return updatedDeliveries.filter(delivery => {
          switch (activeTab) {
            case 'pending':
              return delivery.status === 'pending';
            case 'ongoing':
              return ['assigned', 'picked-up'].includes(delivery.status);
            case 'completed':
              return delivery.status === 'completed';
            default:
              return true;
          }
        });
      });
    };

    // Register socket event listeners
    Socket.on('new_delivery', handleNewDelivery);
    Socket.on('delivery_updated', handleDeliveryUpdate);

    // Cleanup function
    return () => {
      Socket.off('new_delivery', handleNewDelivery);
      Socket.off('delivery_updated', handleDeliveryUpdate);
    };
  }, [activeTab]);

  // Fetch deliveries when tab changes
  useEffect(() => {
    if (activeTab) {
      fetchDeliveries();
    }
  }, [activeTab, apiEndpoint]);

  // API call function with loading state
  const performDeliveryAction = async (deliveryId, action, endpoint) => {
    if (processingDeliveries.has(deliveryId)) return;

    setProcessingDeliveries(prev => new Set(prev).add(deliveryId));
    
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/api/logistics/rider/${endpoint}`,
        { deliveryId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update deliveries based on action
      if (action === 'accept' || action === 'complete') {
        setDeliveries(prev => prev.filter(d => d._id !== deliveryId));
      } else if (action === 'pickup') {
        // Refresh deliveries after pickup to get updated status
        fetchDeliveries();
      }
      
    } catch (err) {
      console.error(`${action} error:`, err);
      const errorMessage = err.response?.data?.message || `Failed to ${action} delivery`;
      setError(errorMessage);
      
      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setProcessingDeliveries(prev => {
        const newSet = new Set(prev);
        newSet.delete(deliveryId);
        return newSet;
      });
    }
  };

  // Individual action handlers
  const acceptDelivery = (deliveryId) => {
    performDeliveryAction(deliveryId, 'accept', 'acceptDelivery');
  };

  const pickupDelivery = (deliveryId) => {
    performDeliveryAction(deliveryId, 'pickup', 'pickupDelivery');
  };

  const completeDelivery = (deliveryId) => {
    performDeliveryAction(deliveryId, 'complete', 'completeDelivery');
  };

  // Date formatter
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Render action buttons with loading states
  const renderActionButtons = (delivery) => {
    const isProcessing = processingDeliveries.has(delivery._id);
    
    const buttonClasses = "w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
    
    if (delivery.status === 'pending') {
      return (
        <div className="p-6 pt-0">
          <button
            onClick={() => acceptDelivery(delivery._id)}
            disabled={isProcessing}
            className={`${buttonClasses} bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Accept Delivery
              </>
            )}
          </button>
        </div>
      );
    }
    
    if (delivery.status === 'assigned') {
      return (
        <div className="p-6 pt-0">
          <button
            onClick={() => pickupDelivery(delivery._id)}
            disabled={isProcessing}
            className={`${buttonClasses} bg-yellow-500 hover:bg-yellow-600 text-white`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <Truck className="w-5 h-5" />
                Picked Up
              </>
            )}
          </button>
        </div>
      );
    }
    
    if (delivery.status === 'picked-up') {
      return (
        <div className="p-6 pt-0">
          <button
            onClick={() => completeDelivery(delivery._id)}
            disabled={isProcessing}
            className={`${buttonClasses} bg-blue-500 hover:bg-blue-600 text-white`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Delivered
              </>
            )}
          </button>
        </div>
      );
    }
    
    return null;
  };

  // Delivery card renderer
  const renderDeliveryCard = (delivery) => {
    const isCompleted = activeTab === 'completed';
    const isOngoing = activeTab === 'ongoing';

    return (
      <div
        key={delivery._id}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-emerald-100 hover:border-emerald-200 transform hover:-translate-y-1"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${
                isCompleted 
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                  : isOngoing 
                    ? 'bg-gradient-to-br from-blue-400 to-cyan-500' 
                    : 'bg-gradient-to-br from-emerald-400 to-teal-500'
              } rounded-full flex items-center justify-center`}>
                {isCompleted ? (
                  <Star className="w-6 h-6 text-white" />
                ) : isOngoing ? (
                  <Truck className="w-6 h-6 text-white" />
                ) : (
                  <Package className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Order #{delivery.order}</h3>
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                  <Phone className="w-3 h-3" />
                  <span>{delivery.contactNumber}</span>
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
              delivery.status === 'completed' 
                ? 'text-green-600 bg-green-50' 
                : delivery.status === 'ongoing' || ['assigned', 'picked-up'].includes(delivery.status)
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-orange-600 bg-orange-50'
            }`}>
              {delivery.status}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Created: {formatDate(delivery.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-purple-600 text-sm mb-1">ORDER ID</p>
              <p className="text-gray-800 text-sm font-medium">{delivery.order}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-blue-600 text-sm mb-1">CUSTOMER</p>
              <p className="text-gray-800 text-sm font-medium">User ID: {delivery.user}</p>
              <div className="flex items-center gap-1 text-gray-600 text-xs mt-1">
                <Phone className="w-3 h-3" />
                <span>{delivery.contactNumber}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-700 text-sm mb-2">Delivery Details:</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Status:</span>
                <span className={`text-sm font-semibold capitalize ${
                  delivery.status === 'completed' 
                    ? 'text-green-600' 
                    : ['assigned', 'picked-up'].includes(delivery.status)
                      ? 'text-blue-600' 
                      : 'text-orange-600'
                }`}>
                  {delivery.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Created:</span>
                <span className="text-gray-800 text-sm">{formatDate(delivery.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Delivery ID:</span>
                <span className="text-gray-800 text-sm font-mono text-xs">{delivery._id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {renderActionButtons(delivery)}
      </div>
    );
  };

  // Socket connection status indicator
  const SocketStatus = () => (
    <div className="flex items-center gap-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${Socket.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className={Socket.connected ? 'text-green-600' : 'text-red-600'}>
        {Socket.connected ? 'Live Updates' : 'Offline'}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Deliveries
            </h1>
            <SocketStatus />
          </div>
          
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            <span className="ml-3 text-gray-600">Loading deliveries...</span>
          </div>
        ) : deliveries.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Deliveries</h3>
            <p className="text-gray-500 text-lg">
              {activeTab === 'pending' ? 'Waiting for new orders...' : 'Check back later!'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliveries.map(renderDeliveryCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;