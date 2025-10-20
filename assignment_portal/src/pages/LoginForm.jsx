import React, { useContext, useState } from "react";
import { BookOpen, Mail, Lock, Eye } from "lucide-react";
import Label from "../components/Label";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { UserInfo } from "../components/UseAuth";
import axios from 'axios'
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  
  // State for form data - only email and passWord
  const [formData, setFormData] = useState({ 
    email: "", 
    passWord: "" 
  });
  
  const { login } = useContext(UserInfo);
  
  const [showVisibility, setVisibility] = useState(false);

  // Function to handle input changes
  const handleInput = (e) => {
    // Update only the field that was changed
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // Function to handle form submission
  const handleUser = async(e) => {
    // Prevent page refresh
    e.preventDefault();
   try {
    
     const res =await axios.post('http://localhost:5000/api/auth/login',formData)

    console.log(res.data);
    const userd ={
      name:res.data.name,
      email:res.data.email,
      role:res.data.role,
      token:res.data.token
    }
    login(userd)

    if(userd.role==='teacher'){
      navigate('teacher/DashBoard')
    }else if(userd.role==='student'){
      navigate('stundent/Dashboard')
    }
    
    } catch (error){
    if(error.response){

      toast.error(error.response.data.message)
    }else{
      toast.error("something error")
    }
   }
    
  };

  return (
    <div className="min-h-screen flex justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500 rounded-full p-2">
              <BookOpen className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-black font-bold text-3xl mb-4">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        
        {/* Login Form */}
        <form className="p-8 bg-white shadow-md" onSubmit={handleUser}>
          
          {/* Email Input Field */}
          <Label htmlFor="email" className="text-sm mb-2">
            Email Address
          </Label>
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              className="w-full px-10"
              type="email"
              id="email"
              onChange={handleInput}
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* passWord Input Field */}
          <Label htmlFor="passWord" className="text-sm mb-2">
            passWord
          </Label>
          <div className="relative mb-6">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              className="w-full px-10"
              type={showVisibility ? "text" : "password"}
              name="passWord"
              value={formData.passWord}
              onChange={handleInput}
              id="passWord"
              placeholder="Enter your passWord"
              required
            />
            {/* Toggle passWord Visibility */}
            <Eye
              onClick={() => setVisibility(!showVisibility)}
              className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 hover:cursor-pointer"
              role="button"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mb-4">
            Login
          </Button>

          {/* Registration Link */}
          <div className="flex justify-center gap-2">
            <p className="text-gray-500 text-sm text-center">
              Don't have an account?
            </p>
            <Link to="/register" className="text-blue-600">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;