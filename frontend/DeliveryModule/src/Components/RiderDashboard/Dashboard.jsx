import React, { useState } from 'react'
import { MapPin, Clock, DollarSign, Package, CheckCircle, User, Phone } from 'lucide-react'

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      customerName: "Sarah Johnson",
      customerPhone: "+1 234-567-8901",
      pickup: {
        address: "Green Harvest Market, 123 Main St",
        time: "12:30 PM"
      },
      delivery: {
        address: "456 Oak Avenue, Apt 2B",
        time: "1:15 PM"
      },
      distance: "2.5 km",
      earnings: "$8.50",
      items: ["2x Organic Tomatoes", "1x Fresh Lettuce", "3x Bell Peppers"],
      orderValue: "$24.99"
    },
    {
      id: 2,
      customerName: "Mike Chen",
      customerPhone: "+1 234-567-8902",
      pickup: {
        address: "Farm Fresh Store, 789 Green St",
        time: "1:00 PM"
      },
      delivery: {
        address: "321 Pine Road, Unit 5",
        time: "1:45 PM"
      },
      distance: "3.2 km",
      earnings: "$12.00",
      items: ["1x Organic Carrots", "2x Broccoli", "1x Spinach Bundle"],
      orderValue: "$31.50"
    },
    {
      id: 3,
      customerName: "Emma Williams",
      customerPhone: "+1 234-567-8903",
      pickup: {
        address: "Veggie Paradise, 555 Garden Ave",
        time: "1:30 PM"
      },
      delivery: {
        address: "789 Maple Street, Floor 3",
        time: "2:10 PM"
      },
      distance: "1.8 km",
      earnings: "$6.75",
      items: ["4x Apples", "2x Bananas", "1x Orange Juice"],
      orderValue: "$18.25"
    },
    {
      id: 4,
      customerName: "David Brown",
      customerPhone: "+1 234-567-8904",
      pickup: {
        address: "Organic Oasis, 222 Health Blvd",
        time: "2:00 PM"
      },
      delivery: {
        address: "147 Cedar Lane, House 12",
        time: "2:40 PM"
      },
      distance: "4.1 km",
      earnings: "$15.25",
      items: ["1x Kale Bundle", "3x Avocados", "2x Sweet Potatoes"],
      orderValue: "$42.80"
    },
    {
      id: 5,
      customerName: "Lisa Anderson",
      customerPhone: "+1 234-567-8905",
      pickup: {
        address: "Fresh Fields Market, 888 Bloom St",
        time: "2:15 PM"
      },
      delivery: {
        address: "963 Birch Court, Apt 7A",
        time: "2:55 PM"
      },
      distance: "2.9 km",
      earnings: "$9.50",
      items: ["1x Cucumber", "2x Zucchini", "1x Herb Mix"],
      orderValue: "$26.75"
    }
  ])

  const acceptDelivery = (deliveryId) => {
    setDeliveries(deliveries.filter(delivery => delivery.id !== deliveryId))
    // Here you would typically make an API call to accept the delivery
    console.log(`Accepted delivery ${deliveryId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Available Deliveries
          </h1>
          <p className="text-gray-600 text-lg">
            {deliveries.length} delivery{deliveries.length !== 1 ? 's' : ''} waiting for pickup
          </p>
        </div>

        {/* Delivery Cards Grid */}
        {deliveries.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-emerald-100 hover:border-emerald-200 transform hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{delivery.customerName}</h3>
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          <Phone className="w-3 h-3" />
                          <span>{delivery.customerPhone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>{delivery.earnings}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{delivery.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Pickup & Delivery Info */}
                <div className="p-6 space-y-4">
                  {/* Pickup */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-blue-600 text-sm mb-1">PICKUP</p>
                      <p className="text-gray-800 text-sm font-medium">{delivery.pickup.address}</p>
                      <div className="flex items-center gap-1 text-gray-600 text-xs mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{delivery.pickup.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-600 text-sm mb-1">DELIVERY</p>
                      <p className="text-gray-800 text-sm font-medium">{delivery.delivery.address}</p>
                      <div className="flex items-center gap-1 text-gray-600 text-xs mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{delivery.delivery.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="font-semibold text-gray-700 text-sm mb-2">Order Items:</p>
                    <ul className="space-y-1">
                      {delivery.items.map((item, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-700 font-semibold text-sm mt-3">
                      Order Value: <span className="text-emerald-600">{delivery.orderValue}</span>
                    </p>
                  </div>
                </div>

                {/* Accept Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => acceptDelivery(delivery.id)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Accept Delivery
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Available Deliveries</h3>
            <p className="text-gray-500 text-lg">All deliveries have been accepted. Check back later for new orders!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard;