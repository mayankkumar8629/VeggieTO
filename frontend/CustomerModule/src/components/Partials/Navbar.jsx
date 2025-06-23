import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { Eye, EyeOff, Leaf, Lock, Mail, Phone, Shield, Store, User, Users, X } from "lucide-react";
import logo from "../../assets/krishi.svg";
import { Link } from "react-router-dom";
import ProfileMenu from "./utils/ProfileMenu";
import SearchBar from "./utils/SearchBar";
import axios from "axios";

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
      {/* Navbar */}
      <div className="flex justify-around items-start p-3.5 shadow-md bg-white">
        <img className="w-12 h-auto md:w-10 sm:w-8" src={logo} alt="Logo" />

        <div className="hidden sm:flex items-center space-x-5 text-lg">
          <Link to="/">Home</Link>
          <a href="#">About us</a>
          <Link to="/products">Products</Link>
          <a href="#">Contact Us</a>
        </div>

        <div className="hidden sm:flex items-center w-full max-w-md">
          <SearchBar />
        </div>

        {!loggedIn ? (
          <div className="hidden sm:flex items-center space-x-2 text-lg">
            <button className="btn border rounded-full px-3" onClick={loginDialog}>
              Login
            </button>
            <button className="btn border rounded-full px-3" onClick={signupDialog}>
              Signup
            </button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center">
            <ProfileMenu />
          </div>
        )}

        <div className="sm:hidden">
          <button onClick={toggleDrawer}>
            {drawerOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-4 p-4 bg-white shadow-md">
          <a href="#">Home</a>
          <a href="#">About us</a>
          <Link to="/products">Products</Link>
          <a href="#">Contact Us</a>
          <button onClick={loginDialog} className="border rounded-full px-4 py-1">
            Login / Signup
          </button>
        </div>
      )}

      {/* Dialog Modal */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDialogOpen(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Close */}
            <button
              onClick={() => setDialogOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Left - Branding */}
              <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-50 to-emerald-50 p-8 items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Leaf className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Welcome to Krishi</h3>
                  <p className="text-gray-600">Your trusted partner in sustainable agriculture</p>
                </div>
              </div>

              {/* Right - Form */}
              <div className="lg:w-1/2 p-8">
                {/* Tabs */}
                <div className="flex justify-center mb-8">
                  <div className="bg-gray-100 rounded-full p-1 flex">
                    {["login", "signup"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => switchTab(tab)}
                        className={`px-6 py-3 rounded-full text-sm font-semibold ${
                          authTab === tab
                            ? "bg-green-500 text-white shadow-lg"
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        {tab === "login" ? "Login" : "Sign Up"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Role Selection */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700">Select Role</label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {Object.keys(roleIcons).map((role) => {
                      const Icon = roleIcons[role];
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setUserRole(role)}
                          className={`p-3 rounded-2xl border-2 flex flex-col items-center space-y-1 ${
                            userRole === role
                              ? "bg-green-500 text-white border-green-500 shadow-md scale-105"
                              : "bg-white text-gray-700 border-gray-200 hover:border-green-300"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs capitalize">{role}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={authTab === "signup" ? handleSignup : handleLogin} className="space-y-5">
                  {authTab === "signup" && (
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50"
                        required
                      />
                    </div>
                  )}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50"
                      required
                    />
                  </div>
                  {authTab === "signup" && (
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Contact Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50"
                        required
                      />
                    </div>
                  )}
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {authTab === "signup" ? "Create Account" : "Login"}
                  </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                  {authTab === "signup" ? (
                    <>
                      Already have an account?{" "}
                      <span
                        className="text-green-600 font-semibold cursor-pointer hover:text-green-700"
                        onClick={() => switchTab("login")}
                      >
                        Login
                      </span>
                    </>
                  ) : (
                    <>
                      Don’t have an account?{" "}
                      <span
                        className="text-green-600 font-semibold cursor-pointer hover:text-green-700"
                        onClick={() => switchTab("signup")}
                      >
                        Sign up
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
