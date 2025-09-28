import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import Layout from '../layouts/Layout';
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutUser from '../layouts/LayoutUser';

// Guards
import ProtectRouteUser from './ProtectRouteUser';
import ProtectRouteAdmin from './ProtectRouteAdmin';

// General Pages
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageCars from '../pages/admin/Cars'; 
import EditCar from '../pages/admin/EditCar';
import ManageRentals from '../pages/admin/ManageRentals';
import Analytics from '../pages/admin/Analytics';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings';


// User Pages
import UserDashboard from '../pages/user/HomeUser';
import RentalHistory from '../pages/user/RentalHistory';
import Payment from '../pages/user/Payment';

// Logo Showcase
import LogoShowcase from '../components/LogoShowcase';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'shop', element: <Shop /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'cart', element: <Cart /> },
            { path: 'logo-showcase', element: <LogoShowcase /> },
        ]
    },
    {
        path: '/admin',
        element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'manage', element: <ManageUsers /> },
            { path: 'cars', element: <ManageCars /> },
            { path: 'cars/:id', element: <EditCar /> },
            { path: 'rentals', element: <ManageRentals /> },
            { path: 'analytics', element: <Analytics /> },
            { path: 'reports', element: <Reports /> },
            { path: 'settings', element: <Settings /> },
        ]
    },
    {
        path: '/user',
        element: <ProtectRouteUser element={<LayoutUser />} />,
        children: [
            { index: true, element: <UserDashboard /> },
            { path: 'history', element: <RentalHistory /> },
            { path: 'payment', element: <Payment /> },
        ]
    }
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;

