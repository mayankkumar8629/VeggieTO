import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Partials/Navbar";
import FirstSection from "./components/Homepage/FirstSection";
import PreSecondSection from "./components/Homepage/PreSecondSection";
import SecondSection from "./components/Homepage/SecondSection";
import ThirdSection from "./components/Homepage/ThirdSection";
import FourthSection from "./components/Homepage/FourthSection";
import FifthSection from "./components/Homepage/FifthSection";
import SixthSection from "./components/Homepage/SixthSection";
import Footer from "./components/Partials/Footer";
import "./App.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ProductArea } from "./components/ProductPage/ProductArea";
import { Cart } from "./components/Carts/Cart";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import { Profile } from "./components/ProfilePage/Profile";
import Order from "./components/OrderPage/Order";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
          <Route
            path="/cart"
            element={
              <div className="h-screen max-w-[90%] justify-center items-center mx-auto">
                <Navbar />
                <Cart />
                <Footer />
              </div>
            }
          />
          <Route
            path="/orderSummary"
            element={
              <div className="h-screen max-w-[90%] justify-center items-center mx-auto">
                <Navbar />
                <OrderSummary />
                <Footer />
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div className="h-screen max-w-[90%] justify-center items-center mx-auto">
                <Navbar />
                <Profile />
                <Footer />
              </div>
            }
          />
          <Route
            path="/orders"
            element={
              <div className="h-screen max-w-[90%] justify-center items-center mx-auto">
                <Navbar />
                <Order />
                <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
