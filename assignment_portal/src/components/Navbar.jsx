import React, { useContext, useState } from "react";
import { BookOpen, User, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { UserInfo } from "./UseAuth";

const Navbar = () => {
    const [isopen, setOpen] = useState(false);
    const navigate =useNavigate()
    const {logout,user} =useContext(UserInfo)     

    return (
        <nav className="bg-white shadow-md sticky z-50 border-b border-gray-200 top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between  items-center h-16">
                    <div className="flex space-x-2">
                        <BookOpen className="text-blue-500 h-8 w-8" />
                        <span className="text-xl font-bold text-gray-700">
                            Assignment Portal
                        </span>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-8">
                        <span  className="font-semibold text-blue-500">
                            Dashboard
                        </span>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                                <User className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-400">{user?.name|| 'guest'}</span>
                                <span className="text-blue-400 px-2 py-1 bg-blue-100 rounded-full text-xs font-medium">
                                    {user?.role}
                                </span>
                            </div>
                            <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={()=>{logout();navigate('/');}}
                                className="flex hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                            >
                                <LogOut />
                                <span className="text-gray-500">Logout</span>
                            </Button>
                        </div>
                    </div>

                    <div className="md:hidden ">
                        <button 
                            onClick={() => setOpen(!isopen)}
                            className="p-2 transition-transform duration-200 hover:scale-110"
                        >
                            {isopen ? 
                                <X className="text-black h-6 w-6" /> : 
                                <Menu className="text-black h-6 w-6" />
                            }
                        </button>
                    </div>
                </div>

                {/* Mobile Menu with Transition */}
                <div className={`
                    md:hidden overflow-hidden transition-all duration-300 ease-in-out
                    ${isopen ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}
                `}>
                    <div className="border-t border-gray-200 bg-white space-y-4 pt-4">
                        <Link 
                            to="/" 
                            className="block px-3 py-2 text-blue-500 font-bold transition-colors duration-200 hover:bg-blue-50 rounded"
                        >
                            Dashboard
                        </Link>
                        <div className="flex items-center space-x-1 px-3">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-400">{user?.name ||"guest"}</span>
                            <span className="text-blue-400 px-2 py-1 bg-blue-100 rounded-full text-xs font-medium">
                                {user?.role ||'guest'}
                            </span>
                        </div>
                        <div className="flex justify-center px-16 sm:px-30">
                            <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={()=>{logout();
                                    navigate('/');}}
                                className="flex justify-center w-full text-center hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                            >
                                <LogOut />
                                <span className="text-gray-500">Logout</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;