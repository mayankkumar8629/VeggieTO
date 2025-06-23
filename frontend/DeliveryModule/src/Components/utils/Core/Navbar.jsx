import React, { useState } from 'react'
import { Bell, User, LogOut, Settings, BadgeCheck, Power } from 'lucide-react'

export const Navbar = () => {
  // Mock data for demonstration - replace with your actual navigation logic
  const loginData = { name: 'John Rider', email: 'john.rider@veggieto.com' }
  const [activeTab, setActiveTab] = useState('available')
  const [isOnline, setIsOnline] = useState(true)

  const handleLogout = () => {
    // Replace with your actual logout logic
    console.log('Logging out...')
    // sessionStorage.removeItem('token')
    // navigate('/')
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline)
  }

  return (
    <nav className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 group-hover:bg-white/30 transition-all duration-300">
                <BadgeCheck className="w-7 h-7 lg:w-8 lg:h-8 text-yellow-300 group-hover:text-yellow-200 transition-colors" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-black text-white tracking-tight">
                  VeggieTO <span className="text-yellow-200 font-bold">Rider</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Center Section - Status Tabs */}
          <div className="hidden md:flex items-center">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-1 shadow-inner">
              <div className="flex space-x-1">
                {[
                  { id: 'available', label: 'Available', color: 'text-emerald-700' },
                  { id: 'ongoing', label: 'Ongoing', color: 'text-blue-700' },
                  { id: 'completed', label: 'Completed', color: 'text-gray-700' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-white text-emerald-600 shadow-md transform scale-105'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            
            {/* Online/Offline Toggle */}
            <div className="flex items-center gap-2">
              <span className={`hidden sm:block text-sm font-medium ${isOnline ? 'text-white' : 'text-white/70'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <button
                onClick={toggleOnlineStatus}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  isOnline ? 'bg-green-400 shadow-lg shadow-green-400/30' : 'bg-gray-400'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                    isOnline ? 'translate-x-7' : 'translate-x-1'
                  }`}
                >
                  <Power className={`w-3 h-3 m-1.5 ${isOnline ? 'text-green-500' : 'text-gray-400'}`} />
                </span>
              </button>
            </div>

            {/* Notification Button */}
            <button className="relative p-2 rounded-xl bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-all duration-300 group">
              <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover:text-yellow-200 transition-colors" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </span>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-400 rounded-full animate-ping"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="flex items-center gap-2 p-2 rounded-xl bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-all duration-300 cursor-pointer"
              >
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-white text-sm font-semibold truncate max-w-24">
                    {loginData?.name || 'Rider'}
                  </p>
                  <p className="text-white/70 text-xs">
                    {isOnline ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </label>
              <div tabIndex={0} className="dropdown-content z-[1] mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{loginData?.name || 'John Rider'}</h3>
                  <p className="text-white/80 text-sm">{loginData?.email || 'john.rider@veggieto.com'}</p>
                  <div className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    isOnline ? 'bg-green-400/30 text-white' : 'bg-gray-400/30 text-white/70'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-300' : 'bg-gray-300'}`}></div>
                    {isOnline ? 'Online' : 'Offline'}
                  </div>
                </div>
                
                {/* Rider Details */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 font-medium">Rider ID</p>
                      <p className="text-gray-800 font-semibold">#VR001234</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Vehicle</p>
                      <p className="text-gray-800 font-semibold">Bike</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Rating</p>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★★★★★</span>
                        <span className="text-gray-800 font-semibold">4.8</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Deliveries</p>
                      <p className="text-gray-800 font-semibold">247</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Phone</p>
                      <p className="text-gray-800 font-semibold">+1 234-567-8900</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Zone</p>
                      <p className="text-gray-800 font-semibold">Downtown</p>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
                  <button className="btn btn-sm btn-outline text-emerald-600 border-emerald-600 hover:bg-emerald-50">
                    <Settings className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Status Tabs */}
        <div className="md:hidden pb-3">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-1">
            <div className="flex space-x-1">
              {[
                { id: 'available', label: 'Available' },
                { id: 'ongoing', label: 'Ongoing' },
                { id: 'completed', label: 'Completed' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-emerald-600 shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}