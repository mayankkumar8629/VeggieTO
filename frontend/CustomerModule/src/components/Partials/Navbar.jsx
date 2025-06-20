import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/krishi.svg";
import login from "../../assets/login.png";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import axios from "axios"; // Required for sending requests
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import ProfileMenu from "./utils/ProfileMenu";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [userRole, setUserRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const loggedIn = sessionStorage.getItem("token") ? true : false;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", dialogOpen);
  }, [dialogOpen]);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const signupDialog = () => {
    setAuthTab("signup");
    setDialogOpen(true);
  };
  const loginDialog = () => {
    setAuthTab("login");
    setDialogOpen(true);
  };

  const switchTab = (tab) => {
    setShowPassword(false);
    setFormData({ name: "", email: "", phone: "", password: "" });
    setAuthTab(tab);
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
      // Send login request
      const res = await axios.post(`http://localhost:3000/api/login`, {
        email: formData.email,
        password: formData.password,
        role: userRole,
      });
      console.log("Login successful", res.data);
      setDialogOpen(false);
      sessionStorage.setItem("token", res.data.token);
      console.log(sessionStorage.getItem("token"));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send signup request
      const res = await axios.post(`http://localhost:3000/api/signup`, {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.phone,
        password: formData.password,
        role: userRole,
      });
      const loginRes = await axios.post(`http://localhost:3000/api/login`, {
        email: formData.email,
        password: formData.password,
        role: userRole,
      });
      setDialogOpen(false);
      sessionStorage.setItem("token", loginRes.data.token);
      console.log("Signup successful", res.data);
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <>
      <div className="flex justify-around items-center px-2 shadow-md bg-white">
        <div className="flex-intial grow-3 w-12 md:w-10 sm:w-8">
          <img className="h-auto w-full" src={logo} alt="Logo" />
        </div>
        <div className="hidden sm:flex items-center grow-7 justify-start space-x-5 font-[Plus-Jakarta-Sans] text-lg">
          <Link to="/">Home</Link>
          <a href="#">About us</a>
          <Link to="/products">Products</Link>
          <a href="#">Contact Us</a>
        </div>
        {!loggedIn ? (
          <div className="hidden sm:flex items-center grow-3 justify-end px-4 space-x-2 font-[Plus-Jakarta-Sans] text-lg">
            <button
              className="rounded-full border-2 px-3 hover:bg-gray-100 transition"
              onClick={loginDialog}
            >
              Login
            </button>
            <button
              className="rounded-full border-2 px-3 hover:bg-gray-100 transition"
              onClick={signupDialog}
            >
              Signup
            </button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center grow-3 justify-end px-4 font-[Plus-Jakarta-Sans] text-lg">
            <ProfileMenu />
          </div>
        )}
        <div className="sm:hidden">
          <button onClick={toggleDrawer}>
            {drawerOpen ? (
              <AiOutlineClose size={30} />
            ) : (
              <AiOutlineMenu size={30} />
            )}
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-4 p-4 bg-white shadow-md">
          <a href="#">Home</a>
          <a href="#">About us</a>
          <Link to="/products">Products</Link>
          <a href="#">Contact Us</a>
          <button
            onClick={toggleDialog}
            className="border rounded-full px-4 py-1"
          >
            Login / Signup
          </button>
        </div>
      )}

      {dialogOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30 flex items-center justify-center px-4">
          <div className="relative bg-white w-full max-w-3xl rounded-xl shadow-xl flex flex-col md:flex-row overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setDialogOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>

            <div className="hidden md:flex flex-col items-center justify-end flex-initial">
              <img
                src={login}
                alt="Dialog"
                className="w-full h-96 object-contain"
              />
            </div>

            <div className="flex-1 ml-0 md:ml-4 p-8 flex items-center justify-center">
              {authTab === "signup" ? (
                <form
                  className="flex flex-col items-center w-full"
                  onSubmit={handleSignup}
                >
                  <div className="flex justify-between mb-6">
                    {["customer", "vendor", "admin"].map((role) => (
                      <button
                        key={role}
                        type="button"
                        className={`px-3 py-2 mx-2 rounded-full border ${
                          userRole === role
                            ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                            : "bg-white text-gray-700 border-gray-300"
                        }`}
                        onClick={() => setUserRole(role)}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 rounded-full px-4 py-2 mb-4 w-full"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 rounded-full px-4 py-2 mb-4 w-full"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Contact Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 rounded-full px-4 py-2 mb-4 w-full"
                    required
                  />
                  <div className="relative w-full mb-4">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="border-2 border-gray-300 rounded-full px-4 py-2 w-full"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 focus:outline-none"
                    >
                      {showPassword ? (
                        <BiSolidHide className="text-xl" />
                      ) : (
                        <BiSolidShow className="text-xl" />
                      )}
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#4CAF50] text-white rounded-full px-4 py-2 mb-4 w-64"
                  >
                    Create Account
                  </button>
                  <p className="text-gray-500 mb-4">
                    Already have an account?{" "}
                    <span
                      className="text-[#4CAF50] cursor-pointer"
                      onClick={() => switchTab("login")}
                    >
                      Login
                    </span>
                  </p>
                </form>
              ) : (
                <form
                  className="flex flex-col items-center w-full"
                  onSubmit={handleLogin}
                >
                  <div className="flex justify-center mb-6">
                    {["customer", "vendor", "admin"].map((role) => (
                      <button
                        key={role}
                        type="button"
                        className={`px-4 py-2 mx-2 rounded-full border ${
                          userRole === role
                            ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                            : "bg-white text-gray-700 border-gray-300"
                        }`}
                        onClick={() => setUserRole(role)}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </button>
                    ))}
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 rounded-full px-4 py-2 mb-4 w-full"
                    required
                  />
                  <div className="relative w-full mb-4">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="border-2 border-gray-300 rounded-full px-4 py-2 w-full"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 focus:outline-none"
                    >
                      {showPassword ? (
                        <BiSolidHide className="text-xl" />
                      ) : (
                        <BiSolidShow className="text-xl" />
                      )}
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#4CAF50] text-white rounded-full px-4 py-2 mb-4 w-64"
                  >
                    Login
                  </button>
                  <p className="text-gray-500 mb-4">
                    Don't have an account?{" "}
                    <span
                      className="text-[#4CAF50] cursor-pointer"
                      onClick={() => switchTab("signup")}
                    >
                      Signup
                    </span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
