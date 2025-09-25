import React, { useState, useEffect } from 'react';
import useCarRentalStore from '@/store/carRentalStore'; // **แก้ไข:** เปลี่ยนมาใช้ Store ที่ถูกต้อง


const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
    <div className="text-3xl bg-blue-100 text-blue-600 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);


export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useCarRentalStore(); 
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setIsLoading(false);
        setError('Authentication token not found.');
        return;
      }

      try {
       
        const response = await fetch('/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]); 

  if (isLoading) {
    return <div className="p-8">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Users" value={stats.totalUsers} icon="👤" />
          <StatCard title="Total Bookings" value={stats.totalBookings} icon="🚗" />
          <StatCard title="Total Revenue" value={`${stats.totalRevenue.toLocaleString('en-US')} THB`} icon="💰" />
        </div>
      )}
    </div>
  );
}

