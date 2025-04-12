import React from 'react';
import  Navbar from './components/Partials/Navbar';
import FirstSection from './components/Homepage/FirstSection';
import { SecondSection } from './components/Homepage/SecondSection';
import  PreSecondSection  from './components/Homepage/PreSecondSection';
import { ThirdSection } from './components/Homepage/ThirdSection';


const App = () => {
  return (
    <div className='h-screen max-w-9/10 justify-center items-center mx-auto '> 
      <Navbar/>
      <FirstSection />
      <PreSecondSection />
      <SecondSection />
      <ThirdSection />
    </div>
  )
}

export default App;
