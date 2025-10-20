import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  // State to store form data (name, email, passWord)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passWord: "",
  });
  const navigate =useNavigate()


  // State to toggle passWord visibility
  const [showpassWord, setShowpassWord] = useState(false);

  // Function to handle input changes
  const handleInputChange = (e) => {
    // Get the name and value from the input field that was changed
    const { name, value } = e.target;
    
    // Update the formData state with the new value
    setFormData((prev) => ({ 
      ...prev,  // Keep all existing data
      [name]: value  // Update only the field that changed
    }));
  };

  // Function to handle form submission
  const handleRegister = async(e) => {
    // Prevent page refresh when    form is submitted
    e.preventDefault();

    try {
      const res =await axios.post('http://localhost:5000/api/auth/register',formData)

    toast.success(res.data.message ||"registration successFull")
    setFormData({ name: "",
    email: "",
    passWord: ""

    })
    navigate('/')

      
    } catch (error) {

      console.error('error:',error.message)
       toast.error(error.response?.data?.message ||"Registration failed ")
    }
    



  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>

        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          
          {/* Name Input Field */}
          <div className="mb-4 relative">
            <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Input Field */}
          <div className="mb-4 relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* passWord Input Field */}
          <div className="mb-6 relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type={showpassWord ? "text" : "password"}
              name="passWord"
              value={formData.passWord}
              onChange={handleInputChange}
              placeholder="passWord"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {/* Toggle passWord Visibility Button */}
            {showpassWord ? (
              <EyeOff
                className="absolute right-3 top-2.5 text-gray-400 w-5 h-5 cursor-pointer"
                onClick={() => setShowpassWord(false)}
              />
            ) : (
              <Eye
                className="absolute right-3 top-2.5 text-gray-400 w-5 h-5 cursor-pointer"
                onClick={() => setShowpassWord(true)}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;