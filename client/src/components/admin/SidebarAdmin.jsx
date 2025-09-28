import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  UserCog,
  SquareChartGantt,
  ShoppingBasket,
  ListOrdered,
  LogOut,
  Car,
  ReceiptText,
  BarChart3,
  FileText,
  Settings,
  TrendingUp,
} from 'lucide-react';
import useCarRentalStore from '../../store/carRentalStore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SidebarAdmin = () => {
  const logout = useCarRentalStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('ออกจากระบบสำเร็จ');
    navigate('/login');
  };

  return (
    <motion.div
      className="bg-gray-800 w-64 text-gray-100 flex flex-col h-screen shadow-lg"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-16 bg-gray-900 flex items-center justify-center text-xl font-bold border-b border-gray-700"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CR</span>
          </div>
          <span>Admin Panel</span>
        </div>
      </motion.div>

      <motion.nav 
        className="flex-1 px-4 py-4 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <NavLink
            to={'/admin'}
            end
            className={({ isActive }) =>
              isActive
                ? 'bg-blue-600 rounded-lg text-white px-4 py-3 flex items-center shadow-md'
                : 'text-gray-300 px-4 py-3 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition-colors'
            }
          >
            <LayoutDashboard className="mr-3 w-5 h-5" />
            Dashboard
          </NavLink>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <NavLink
            to={'/admin/manage'}
            className={({ isActive }) =>
              isActive
                ? 'bg-blue-600 rounded-lg text-white px-4 py-3 flex items-center shadow-md'
                : 'text-gray-300 px-4 py-3 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition-colors'
            }
          >
            <UserCog className="mr-3 w-5 h-5" />
            จัดการผู้ใช้
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <NavLink
            to={'/admin/cars'}
            className={({ isActive }) =>
              isActive
                ? 'bg-blue-600 rounded-lg text-white px-4 py-3 flex items-center shadow-md'
                : 'text-gray-300 px-4 py-3 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition-colors'
            }
          >
            <Car className="mr-3 w-5 h-5" />
            จัดการรถยนต์
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <NavLink
            to={'/admin/rentals'}
            className={({ isActive }) =>
              isActive
                ? 'bg-blue-600 rounded-lg text-white px-4 py-3 flex items-center shadow-md'
                : 'text-gray-300 px-4 py-3 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition-colors'
            }
          >
            <ReceiptText className="mr-3 w-5 h-5" />
            จัดการการเช่า
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <NavLink
            to={'/admin/analytics'}
            className={({ isActive }) =>
              isActive
                ? 'bg-blue-600 rounded-lg text-white px-4 py-3 flex items-center shadow-md'
                : 'text-gray-300 px-4 py-3 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition-colors'
            }
          >
            <BarChart3 className="mr-3 w-5 h-5" />
            Analytics
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <NavLink
            to={'/admin/reports'}
            className={({ isActive }) =>
              isActive
                ? 'bg-blue-600 rounded-lg text-white px-4 py-3 flex items-center shadow-md'
                : 'text-gray-300 px-4 py-3 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition-colors'
            }
          >
            <FileText className="mr-3 w-5 h-5" />
            Reports
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <NavLink
            to={'/admin/settings'}
            className={({ isActive }) =>
              isActive
                ? 'bg-blue-600 rounded-lg text-white px-4 py-3 flex items-center shadow-md'
                : 'text-gray-300 px-4 py-3 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition-colors'
            }
          >
            <Settings className="mr-3 w-5 h-5" />
            Settings
          </NavLink>
        </motion.div>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <motion.button
          onClick={handleLogout}
          className="w-full text-left text-gray-300 px-4 py-3 hover:bg-red-600 hover:text-white rounded-lg flex items-center transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="mr-3 w-5 h-5" />
          ออกจากระบบ
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SidebarAdmin;
