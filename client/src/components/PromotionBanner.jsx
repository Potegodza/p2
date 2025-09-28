import React from 'react';

const PromotionBanner = ({ rentalDays, originalPrice, discountedPrice, freeDays, savings }) => {
  if (rentalDays < 3) {
    return null; // Don't show banner if less than 3 days
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">🎉</span>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-green-800 mb-1">
            🎯 Promotion Applied!
          </h3>
          <p className="text-sm text-green-700">
            Rent {rentalDays} days, get {freeDays} day{freeDays > 1 ? 's' : ''} FREE!
          </p>
          <div className="flex items-center space-x-4 mt-2">
            <div className="text-sm">
              <span className="text-gray-600">Original Price: </span>
              <span className="line-through text-red-500">฿{originalPrice.toLocaleString()}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">You Pay: </span>
              <span className="text-green-600 font-bold">฿{discountedPrice.toLocaleString()}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">You Save: </span>
              <span className="text-green-600 font-bold">฿{savings.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;





