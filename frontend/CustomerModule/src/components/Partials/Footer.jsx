import React from 'react';
import krishi from '../../assets/krishi.svg';

const Footer = () => (
  <footer className="bg-white text-gray-700 m-14">
    {/* Upper */}
    <div className="container mx-auto px-6 py-12 lg:flex lg:justify-between lg:items-start">
      {/* Brand & Subscribe */}
      <div className="flex-1 max-w-md">
        <div className="flex items-center justify-start gap-2 mb-4">
          {/* give the logo a fixed height & auto width */}
          <img src={krishi} alt="Logo" className="h-20 w-auto" />
        </div>
        <p className="mb-6">
          We deliver fresh groceries straight to your door, offering a wide variety of
          high-quality products at unbeatable prices. Shop conveniently and sustainably, every day.
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none"
          />
          <button className="bg-green-600 text-white rounded-r-full px-6 font-medium hover:bg-green-700 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Link Sections */}
      <div className="mt-10 flex-1 flex justify-around">
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-900">About Us</a></li>
            <li><a href="#" className="hover:text-gray-900">Product</a></li>
            <li><a href="#" className="hover:text-gray-900">Location</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-900">Online Chat</a></li>
            <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-900">Facebook</a></li>
            <li><a href="#" className="hover:text-gray-900">Instagram</a></li>
            <li><a href="#" className="hover:text-gray-900">YouTube</a></li>
          </ul>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200 mx-6"></div>

    {/* Bottom */}
    <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-sm text-gray-500">
      <div className="flex space-x-4 justify-center md:justify-start mb-2 md:mb-0">
        <a href="#" className="hover:text-gray-700">Terms of Condition</a>
        <a href="#" className="hover:text-gray-700">Privacy Policy</a>
      </div>
      <div className="text-center md:text-right">
        © Copyright GreenCart 2024
      </div>
    </div>
  </footer>
);

export default Footer;
