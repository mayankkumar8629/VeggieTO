import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Partials/Navbar';
import FirstSection from './components/Homepage/FirstSection';
import PreSecondSection from './components/Homepage/PreSecondSection';
import SecondSection from './components/Homepage/SecondSection';
import ThirdSection from './components/Homepage/ThirdSection';
import FourthSection from './components/Homepage/FourthSection';
import FifthSection from './components/Homepage/FifthSection';
import SixthSection from './components/Homepage/SixthSection';
import Footer from './components/Partials/Footer';
import './App.css';
import './index.css';
import { ProductArea } from './components/ProductPage/ProductArea';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="h-screen max-w-[90%] justify-center items-center mx-auto">
              <Navbar />
              <FirstSection />
              <PreSecondSection />
              <SecondSection />
              <ThirdSection />
              <FourthSection />
              <FifthSection />
              <SixthSection />
              <Footer />
            </div>
          } 
        />
         <Route 
          path="/products" 
          element={
            <div className="h-screen max-w-[90%] justify-center items-center mx-auto">
              <Navbar />
              <ProductArea />
              <Footer />
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;