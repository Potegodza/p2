import React, { useState, useEffect } from 'react';
import useCarRentalStore from '../../store/carRentalStore';
import { getRentalHistory } from '../../api/user';
import { toast } from 'react-toastify';
import { numberFormat } from '../../utils/number';
import { dateFormat } from '../../utils/dateformat';
import { Calendar, Car, Phone, User, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const RentalHistory = () => {
  const { token, user } = useCarRentalStore();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchRentalHistory();
    }
  }, [token]);

  const fetchRentalHistory = async () => {
    try {
      setLoading(true);
      const response = await getRentalHistory(token);
      setRentals(response.data);
    } catch (error) {
      console.error('Failed to fetch rental history:', error);
      toast.error('Failed to load rental history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Pending':
        return 'Pending';
      case 'Active':
        return 'Active';
      case 'Completed':
        return 'Completed';
      case 'Cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-dark mb-2">Rental History</h1>
          <p className="text-gray-600">View all your car rental history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-brand-dark">
                  {rentals.filter(r => r.status === 'Pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-brand-dark">
                  {rentals.filter(r => r.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-brand-dark">
                  {rentals.filter(r => r.status === 'Completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-brand-dark">
                  {rentals.filter(r => r.status === 'Cancelled').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rental List */}
        {rentals.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Rentals Yet</h3>
            <p className="text-gray-500 mb-6">You don't have any car rentals yet</p>
            <a 
              href="/shop" 
              className="bg-brand-gold text-brand-dark font-bold py-3 px-6 rounded-md hover:bg-yellow-500 transition-colors"
            >
              Start Renting
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {rentals.map((rental) => (
              <div key={rental.id} className="bg-white rounded-lg shadow-md border overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Car Info */}
                    <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                      <div className="w-20 h-20 flex-shrink-0">
                        <img
                          src={rental.car.images?.[0]?.url || '/car-placeholder.svg'}
                          alt={`${rental.car.brand} ${rental.car.model}`}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/car-placeholder.svg';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-brand-dark">
                          {rental.car.brand} {rental.car.model}
                        </h3>
            <p className="text-sm text-gray-600 mb-2">
              License: {rental.car.licensePlate}
            </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{dateFormat(rental.startDate)} - {dateFormat(rental.endDate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status and Price */}
                    <div className="flex flex-col lg:items-end space-y-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(rental.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(rental.status)}`}>
                          {getStatusText(rental.status)}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-brand-dark">
                          {numberFormat(rental.totalPrice)} THB
                        </p>
                        <p className="text-sm text-gray-500">Total Price</p>
                      </div>
                    </div>
                  </div>

                  {/* Rental Details */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Renter:</span>
                        <span className="text-sm font-medium">{user?.name || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Phone:</span>
                        <span className="text-sm font-medium">{rental.phoneNumber || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Booked:</span>
                        <span className="text-sm font-medium">{dateFormat(rental.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalHistory;


