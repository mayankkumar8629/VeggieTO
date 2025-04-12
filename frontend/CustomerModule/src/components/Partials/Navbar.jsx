import React from 'react';
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import logo from '../../assets/krishi.svg';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  return (
    <>
    <div className="flex justify-around items-center ">
        <div className="flex-intial grow-3 w-12 md:w-10 sm:w-8"> <img className='h-auto w-full' src={logo} /> </div>
        <div className=" hidden sm:flex items-center grow-7 justify-start space-x-5 font-[Plus-Jakarta-Sans] text-lg">
            <a className='flex-initial ' href="#">Home</a>
            <a className='flex-initial ' href="">About us</a>
            <a className="flex-initial " href="#">Products</a>
            <a className='flex-initial ' href="#">Contact Us</a>
        </div>
        <div className="hidden sm:flex items-center grow-3 text-right space-x-2 font-[Plus-Jakarta-Sans] text-lg"> 
            <button className=" rounded-full border-2 px-3">Login</button>
            <button className=" rounded-full border-2 px-3">Signup</button>
        </div>
        <div className="sm:hidden">
      <button onClick = {toggleDrawer}>
      {drawerOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </button>
    </div>
    </div>
   
    </>
  )
}

export default Navbar;

