import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import {
  Eye,
  EyeOff,
  Leaf,
  Lock,
  Mail,
  Phone,
  Shield,
  Store,
  User,
  Users,
  X,
  Bell,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "./utils/ProfileMenu";
import { Link } from "react-router-dom";
import SearchBar from "./utils/SearchBar";
import krishi from '../../assets/krishi.svg';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemRedux } from "../../store/cartSlice";

const roleIcons = {
  customer: Users,
  vendor: Store,
  admin: Shield,
};

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [userRole, setUserRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState(2); // Mock notifications count
  const cartItems = useSelector((state) =>state.cart.cartItems);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const loggedIn = sessionStorage.getItem("token") ? true : false;

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", dialogOpen);
  }, [dialogOpen]);



  useEffect(()=>{
    const fetchCartItems = async () => {
    const response = await axios.get(
        "http://localhost:3000/api/customer/cart/getCart",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const cartData = response.data.cart.items;
      const itemCount = cartData.reduce((total, item) => total +item.quantity, 0);
      dispatch(setCartItemRedux(itemCount));
    }
    fetchCartItems();
  });

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const loginDialog = () => {
    setAuthTab("login");
    setDialogOpen(true);
  };
  const signupDialog = () => {
    setAuthTab("signup");
    setDialogOpen(true);
  };

  const switchTab = (tab) => {
    setAuthTab(tab);
    setShowPassword(false);
    setFormData({ name: "", email: "", phone: "", password: "" });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const axios = (await import("axios")).default;
      const res = await axios.post("http://localhost:3000/api/login", {
        email: formData.email,
        password: formData.password,
        role: userRole,
      });
      sessionStorage.setItem("token", res.data.token);
      setDialogOpen(false);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const axios = (await import("axios")).default;
      await axios.post("http://localhost:3000/api/signup", {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.phone,
        password: formData.password,
        role: userRole,
      });
      const res = await axios.post("http://localhost:3000/api/login", {
        email: formData.email,
        password: formData.password,
        role: userRole,
      });
      sessionStorage.setItem("token", res.data.token);
      setDialogOpen(false);
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <>
      {/* Enhanced Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <img src={krishi} alt="Krishi Logo" className="h-15 w-full justify-center" />
            </motion.div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "#" },
                { name: "Products", href: "/products" },
                { name: "Contact", href: "#" },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className="relative text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </motion.a>
              ))}
            </div>

            {/* Search Bar - Desktop */}
            <SearchBar className="hidden md:block w-1/3" />

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {loggedIn ? (
                <>
                  {/* Notification Bell */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative cursor-pointer"
                  >
                    <div className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                      <Bell className="w-6 h-6 text-gray-600 hover:text-green-600" />
                    </div>
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {notifications}
                      </span>
                    )}
                  </motion.div>

                  {/* Shopping Cart */}
                  <Link to="/cart">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative cursor-pointer"
                    >
                      <div className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                        <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-green-600" />
                      </div>
                      {cartItems > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {cartItems}
                        </span>
                      )}
                    </motion.div>
                  </Link>

                  {/* Profile Menu */}
                  <div className="hidden md:block">
                    <ProfileMenu />
                  </div>
                </>
              ) : (
                /* Auth Buttons - Desktop */
                <div className="hidden md:flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={loginDialog}
                    className="px-6 py-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-300"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={signupDialog}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                  >
                    Sign Up
                  </motion.button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleDrawer}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                {drawerOpen ? (
                  <AiOutlineClose size={24} />
                ) : (
                  <AiOutlineMenu size={24} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-gray-100 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:border-green-500 transition-all duration-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "About", href: "#" },
                  { name: "Products", href: "/products" },
                  { name: "Contact", href: "#" },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Mobile Icons */}
              {loggedIn && (
                <div className="flex items-center justify-center space-x-6 py-4">
                  <div className="relative">
                    <Bell className="w-6 h-6 text-gray-600" />
                    {notifications > 0 && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-gray-600" />
                    {cartItems > 0 && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                        {cartItems}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Auth Buttons */}
              {!loggedIn && (
                <div className="space-y-3 pt-4">
                  <button
                    onClick={loginDialog}
                    className="w-full py-3 text-green-600 hover:text-green-700 font-semibold border border-green-200 rounded-full hover:bg-green-50 transition-all duration-300"
                  >
                    Login
                  </button>
                  <button
                    onClick={signupDialog}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Dialog Modal */}
      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setDialogOpen(false)}
            ></motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDialogOpen(false)}
                className="absolute top-6 right-6 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="flex flex-col lg:flex-row">
                {/* Left - Enhanced Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8 items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10"></div>
                  <div className="text-center space-y-6 relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                    >
                      <Leaf className="w-16 h-16 text-white" />
                    </motion.div>
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                    >
                      Welcome to Krishi
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-600 text-lg"
                    >
                      Your trusted partner in sustainable agriculture
                    </motion.p>
                  </div>
                </div>

                {/* Right - Enhanced Form */}
                <div className="lg:w-1/2 p-8">
                  {/* Enhanced Tabs */}
                  <div className="flex justify-center mb-8">
                    <div className="bg-gray-100 rounded-2xl p-1 flex">
                      {["login", "signup"].map((tab) => (
                        <motion.button
                          key={tab}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => switchTab(tab)}
                          className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                            authTab === tab
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105"
                              : "text-gray-600 hover:text-green-600"
                          }`}
                        >
                          {tab === "login" ? "Login" : "Sign Up"}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Role Selection */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Select Role
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.keys(roleIcons).map((role) => {
                        const Icon = roleIcons[role];
                        return (
                          <motion.button
                            key={role}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setUserRole(role)}
                            className={`p-4 rounded-2xl border-2 flex flex-col items-center space-y-2 transition-all duration-300 ${
                              userRole === role
                                ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white border-green-500 shadow-lg scale-105"
                                : "bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:shadow-md"
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                            <span className="text-sm font-medium capitalize">
                              {role}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Enhanced Form */}
                  <div className="space-y-5">
                    {authTab === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                      >
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          required
                        />
                      </motion.div>
                    )}

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                        required
                      />
                    </div>

                    {authTab === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                      >
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Contact Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          required
                        />
                      </motion.div>
                    )}

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                        required
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors duration-300"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>

                    <motion.button
                      type="button"
                      onClick={
                        authTab === "signup" ? handleSignup : handleLogin
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {authTab === "signup" ? "Create Account" : "Login"}
                    </motion.button>
                  </div>

                  <p className="text-center text-gray-600 mt-6">
                    {authTab === "signup" ? (
                      <>
                        Already have an account?{" "}
                        <span
                          className="text-green-600 font-semibold cursor-pointer hover:text-green-700 transition-colors duration-300"
                          onClick={() => switchTab("login")}
                        >
                          Login
                        </span>
                      </>
                    ) : (
                      <>
                        Don't have an account?{" "}
                        <span
                          className="text-green-600 font-semibold cursor-pointer hover:text-green-700 transition-colors duration-300"
                          onClick={() => switchTab("signup")}
                        >
                          Sign up
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
