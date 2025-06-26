import { useState } from 'react';
import { Eye, EyeOff, Package, Truck, User, Mail, Phone, Lock, Sparkles } from 'lucide-react';
import axios from 'axios';
import Socket from './utils/Socket';
import { nav } from 'framer-motion/client';
import { useNavigate } from 'react-router-dom';

const Delivery = () => {
  const [authTab, setAuthTab] = useState('login');
  const [userRole, setUserRole] = useState('rider');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup data:', formData, userRole);
  };

  const handleLogin = async(e) => {
     e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/logistics/rider/riderLogin", {
        email: formData.email,
        password: formData.password,
      });
      sessionStorage.setItem('token', res.data.token);
      console.log("Token stored in sessionStorage:", res.data.token);
      const token = res.data.token;
      Socket.auth = { token };
      Socket.connect();

     Socket.on("connect", () => {
      console.log("Socket connected with id:", Socket.id);
    });
      console.log("Login successful", res.data);
      navigate('/dashboard', { state: { loginData: res.data } });
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const switchTab = (tab) => {
    setAuthTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-20 w-60 h-60 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Animation Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-6">
          {/* Animated Delivery Scene */}
          <div className="relative w-full max-w-md h-64 overflow-hidden">
            {/* Road */}
            <div className="absolute bottom-8 w-full h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full shadow-lg">
              <div className="w-full h-1 bg-white rounded-full mt-1.5 opacity-60"></div>
            </div>
            
            {/* Animated Delivery Person */}
            <div className="absolute bottom-12 animate-bounce">
              <div className="relative">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-yellow-700" />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-4 left-8 animate-float">
              <Truck className="w-8 h-8 text-emerald-400 opacity-60" />
            </div>
            <div className="absolute top-8 right-12 animate-float-delayed">
              <Package className="w-6 h-6 text-green-400 opacity-60" />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              QuickDeliver
            </h1>
            <p className="text-gray-600 text-lg">
              Join the fastest delivery network
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            {/* Tab Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-full p-1 flex">
                <button
                  onClick={() => switchTab('login')}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    authTab === 'login'
                      ? 'bg-emerald-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => switchTab('signup')}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    authTab === 'signup'
                      ? 'bg-emerald-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {authTab === 'signup' ? (
              <div className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Choose your role</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'rider', label: 'Rider', icon: User },
                      { key: 'deliveryPartner', label: 'Partner', icon: Truck }
                    ].map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        type="button"
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 ${
                          userRole === key
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg transform scale-105'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:shadow-md'
                        }`}
                        onClick={() => setUserRole(key)}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/50"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/50"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Contact Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/50"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSignup}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-2xl font-semibold hover:from-emerald-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Create Account
                </button>

                <p className="text-center text-gray-600">
                  Already have an account?{' '}
                  <span
                    className="text-emerald-600 font-semibold cursor-pointer hover:text-emerald-700 transition-colors duration-200"
                    onClick={() => switchTab('login')}
                  >
                    Login here
                  </span>
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Login as</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'rider', label: 'Rider', icon: User },
                      { key: 'deliveryPartner', label: 'Partner', icon: Truck }
                    ].map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        type="button"
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 ${
                          userRole === key
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg transform scale-105'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:shadow-md'
                        }`}
                        onClick={() => setUserRole(key)}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/50"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-2xl font-semibold hover:from-emerald-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Login
                </button>

                <div className="text-center">
                  <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors duration-200">
                    Forgot your password?
                  </a>
                </div>

                <p className="text-center text-gray-600">
                  Don't have an account?{' '}
                  <span
                    className="text-emerald-600 font-semibold cursor-pointer hover:text-emerald-700 transition-colors duration-200"
                    onClick={() => switchTab('signup')}
                  >
                    Sign up here
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
};

export default Delivery;