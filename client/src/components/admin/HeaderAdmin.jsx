import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, User, Menu } from 'lucide-react';
import useCarRentalStore from '../../store/carRentalStore';

const HeaderAdmin = () => {
    const { user } = useCarRentalStore();

    return (
        <motion.header 
            className='bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Left side - Search */}
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                    />
                </div>
            </div>

            {/* Right side - Notifications & User */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <motion.button
                    className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        3
                    </span>
                </motion.button>

                {/* User Profile */}
                <motion.div
                    className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm">
                        <p className="font-medium text-gray-900">
                            {user?.name || 'Admin User'}
                        </p>
                        <p className="text-gray-500 text-xs">
                            {user?.email || 'admin@carrental.com'}
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.header>
    );
};

export default HeaderAdmin;