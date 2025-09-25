// src/components/MainNav.jsx

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import useCarRentalStore from '../store/carRentalStore';
import { Car, LogOut, UserPlus, LogIn } from 'lucide-react'; // Import ไอคอนเพิ่ม

const MainNav = () => {
  const { user, logout, rentals } = useCarRentalStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-[#2C3E50] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* ส่วนของโลโก้ */}
          <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold">
            <Car size={28} className="text-[#E6B325]" />
            <span>CAR RENTAL</span>
          </Link>

          {/* ส่วนของลิงก์เมนู */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => isActive ? "text-[#E6B325] font-semibold" : "text-gray-300 hover:text-white transition-colors"}
            >
              Home
            </NavLink>
            <NavLink 
              to="/shop"
              className={({ isActive }) => isActive ? "text-[#E6B325] font-semibold" : "text-gray-300 hover:text-white transition-colors"}
            >
              Cars
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) => 
                (isActive ? "text-[#E6B325] font-semibold" : "text-gray-300 hover:text-white transition-colors") + " relative"
              }
            >
              Rental Cart
              {rentals && rentals.length > 0 && (
                <span className="absolute -top-1 -right-3 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                  {rentals.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* ส่วนของปุ่มเข้าสู่ระบบ / สมัครสมาชิก */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-300">Welcome, {user.email}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              // ✅ แก้ไขส่วนนี้ให้มี 2 ปุ่ม
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <button className="text-gray-300 hover:text-white font-semibold transition-colors flex items-center gap-2">
                    <LogIn size={16} />
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-[#E6B325] text-[#2C3E50] font-bold py-2 px-5 rounded-md hover:bg-yellow-500 transition-colors flex items-center gap-2">
                     <UserPlus size={16} />
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default MainNav;