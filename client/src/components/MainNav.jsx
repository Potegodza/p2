// src/components/MainNav.jsx

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import useCarRentalStore from '../store/carRentalStore';
import { Car, LogOut, UserPlus, LogIn } from 'lucide-react'; // Import ไอคอนเพิ่ม
import { motion } from 'framer-motion';
import Logo from './Logo';

const MainNav = () => {
  const { user, logout, rentals } = useCarRentalStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.nav 
      className="bg-[#2C3E50] shadow-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* ส่วนของโลโก้ */}
          <Link to="/" className="text-white">
            <Logo size="default" showText={true} />
          </Link>

          {/* ส่วนของลิงก์เมนู */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => isActive ? "text-[#E6B325] font-semibold" : "text-gray-300 hover:text-white transition-colors"}
              >
                Home
              </NavLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <NavLink 
                to="/shop"
                className={({ isActive }) => isActive ? "text-[#E6B325] font-semibold" : "text-gray-300 hover:text-white transition-colors"}
              >
                Cars
              </NavLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <NavLink
                to="/cart"
                className={({ isActive }) => 
                  (isActive ? "text-[#E6B325] font-semibold" : "text-gray-300 hover:text-white transition-colors") + " relative"
                }
              >
                Rental Cart
                {rentals && rentals.length > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-3 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {rentals.length}
                  </motion.span>
                )}
              </NavLink>
            </motion.div>
          </motion.div>

          {/* ส่วนของปุ่มเข้าสู่ระบบ / สมัครสมาชิก */}
          <motion.div 
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {user ? (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <NavLink 
                    to="/user/history"
                    className={({ isActive }) => isActive ? "text-[#E6B325] font-semibold" : "text-gray-300 hover:text-white transition-colors"}
                  >
                    History
                  </NavLink>
                </motion.div>
                <motion.span 
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Welcome, {user.email}
                </motion.span>
                <motion.button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              // ✅ แก้ไขส่วนนี้ให้มี 2 ปุ่ม
              <div className="flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login">
                    <button className="text-gray-300 hover:text-white font-semibold transition-colors flex items-center gap-2">
                      <LogIn size={16} />
                      Login
                    </button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/register">
                    <button className="bg-[#E6B325] text-[#2C3E50] font-bold py-2 px-5 rounded-md hover:bg-yellow-500 transition-colors flex items-center gap-2">
                       <UserPlus size={16} />
                      Register
                    </button>
                  </Link>
                </motion.div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </motion.nav>
  );
};

export default MainNav;