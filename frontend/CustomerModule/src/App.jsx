import React from 'react';
import  Navbar from './components/Partials/Navbar';
import FirstSection from './components/Homepage/FirstSection';


const App = () => {
  return (
    <div className='h-screen max-w-9/10 justify-center items-center mx-auto '> 
      <Navbar/>
      <FirstSection />
    </div>
  )
}

export default App;
