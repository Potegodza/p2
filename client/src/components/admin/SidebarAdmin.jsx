import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCog,
  SquareChartGantt,
  ShoppingBasket,
  ListOrdered,
  LogOut,
  Car,
  ReceiptText,
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
    <div
      className="bg-gray-800 w-64 text-gray-100 
    flex flex-col h-screen"
    >
      <div
        className="h-16 bg-gray-900 flex items-center
      justify-center text-xl font-bold"
      >
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to={'/admin'}
          end
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
          }
        >
          <LayoutDashboard className="mr-2" />
          Dashboard
        </NavLink>
        <NavLink
          to={'/admin/manage'}
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
          }
        >
          <UserCog className="mr-2" />
          จัดการผู้ใช้
        </NavLink>

        <NavLink
          to={'/admin/cars'}
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
          }
        >
          <Car className="mr-2" />
          จัดการรถยนต์
        </NavLink>

        <NavLink
          to={'/admin/rentals'}
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
          }
        >
          <ReceiptText className="mr-2" />
          จัดการการเช่า
        </NavLink>
      </nav>

      <div>
        <button
          onClick={handleLogout}
          className="w-full text-left text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
        >
          <LogOut className="mr-2" />
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;
