import React from 'react'
import Delivery  from './Components/Delivery'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/utils/Core/Navbar';
import  Dashboard  from './Components/RiderDashboard/Dashboard';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Delivery />} />
          <Route path="/dashboard" element={
            <div className="flex flex-col h-screen">
              <Navbar />
              <Dashboard />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

