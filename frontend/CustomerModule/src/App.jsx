import React from 'react';
import  Navbar from './components/Partials/Navbar';
import FirstSection from './components/Homepage/FirstSection';
import { SecondSection } from './components/Homepage/SecondSection';
import  PreSecondSection  from './components/Homepage/PreSecondSection';
import { ThirdSection } from './components/Homepage/ThirdSection';
import FourthSection from './components/Homepage/FourthSection';
import FifthSection from './components/Homepage/FifthSection';
import { SixthSection } from './components/Homepage/SixthSection';
import Footer from './components/Partials/Footer';


const App = () => {
  return (
    <div className='h-screen max-w-9/10 justify-center items-center mx-auto '> 
      <Navbar/>
      <FirstSection />
      <PreSecondSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection/>
      <SixthSection />
      <Footer />
    </div>
  )
}

export default App;
