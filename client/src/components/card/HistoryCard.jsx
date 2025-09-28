import React, { useState, useEffect } from "react";
import useCarRentalStore from "../../store/carRentalStore";
import { getRentalHistory } from "../../api/user";
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";
import { Link } from "react-router-dom";

const HistoryCard = () => {
  const token = useCarRentalStore((state) => state.token);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      handleGetRentals(token);
    }
  }, [token]);

  const handleGetRentals = async (token) => {
    try {
      setLoading(true);
      const response = await getRentalHistory(token);
      setRentals(response.data);
    } catch (error) {
      console.error('Failed to fetch rental history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-200 text-yellow-800";
      case "Active": return "bg-blue-200 text-blue-800";
      case "Completed": return "bg-green-200 text-green-800";
      case "Cancelled": return "bg-red-200 text-red-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (rentals.length === 0) {
    return (
        <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">No Rental History Found</h2>
            <p className="text-gray-500 mb-6">You haven't rented any cars yet.</p>
            <Link to="/shop" className="bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-md hover:bg-yellow-500 transition-colors">
                Rent a Car Now
            </Link>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-dark">Rental History</h1>
      {/* Rental History Display */}
      {rentals?.map((rental) => (
        <div key={rental.id} className="bg-white p-6 rounded-lg shadow-md border hover:shadow-xl transition-shadow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Rental Date</p>
              <p className="font-bold text-lg text-brand-dark">{dateFormat(rental.createdAt)}</p>
            </div>
            <div className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(rental.status)}`}>
              {rental.status}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
              <img 
                src={rental.car.images?.[0]?.url || '/car-placeholder.svg'} 
                alt={`${rental.car.brand} ${rental.car.model}`}
                className="w-full md:w-48 h-32 object-cover rounded-md"
                onError={(e) => {
                  e.target.src = '/car-placeholder.svg';
                }}
              />
              <div className="flex-grow">
                  <h3 className="text-xl font-bold text-brand-dark">{rental.car.brand} {rental.car.model}</h3>
                  <p className="text-gray-600">License Plate: {rental.car.licensePlate}</p>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                      <div>
                          <p className="font-semibold">Start Date:</p>
                          <p>{dateFormat(rental.startDate)}</p>
                      </div>
                       <div>
                          <p className="font-semibold">End Date:</p>
                          <p>{dateFormat(rental.endDate)}</p>
                      </div>
                  </div>
              </div>
              <div className="text-left md:text-right mt-4 md:mt-0">
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="text-2xl font-bold text-brand-dark">{numberFormat(rental.totalPrice)} THB</p>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryCard;

