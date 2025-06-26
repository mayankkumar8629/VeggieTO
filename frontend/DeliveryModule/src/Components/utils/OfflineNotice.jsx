// components/OfflineNotice.js
import React from 'react';
import { Power, WifiOff } from 'lucide-react';

const OfflineNotice = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-center p-8">
      <div className="bg-red-100 p-6 rounded-full shadow-lg mb-6">
        <WifiOff className="w-12 h-12 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">You're Offline</h2>
      <p className="text-gray-600 mb-4 max-w-md">
        You are currently marked as <strong>Offline</strong>. Please switch to <strong>Online</strong> to access your delivery dashboard.
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white font-semibold shadow">
        <Power className="w-4 h-4" />
        Offline
      </div>
    </div>
  );
};

export default OfflineNotice;
