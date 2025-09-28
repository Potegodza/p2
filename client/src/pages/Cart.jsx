import React from 'react';
import useCarRentalStore from '../store/carRentalStore';
import { useNavigate } from 'react-router-dom';
import { numberFormat } from '../utils/number';
import { toast } from 'react-toastify';
import PromotionBanner from '../components/PromotionBanner';

const Cart = () => {
  const navigate = useNavigate();
  const {
    user,
    rentals,
    removeCarFromRental,
    startDate,
    endDate,
    setRentalDates,
    calculateTotalPrice,
    getTotalDailyPrice,
  } = useCarRentalStore();

  const [localStartDate, setLocalStartDate] = React.useState(startDate || '');
  const [localEndDate, setLocalEndDate] = React.useState(endDate || '');
  const [phoneNumber, setPhoneNumber] = React.useState(user?.telephone || '');
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [days, setDays] = React.useState(0);
  
  // 🎯 PROMOTION CALCULATION
  const calculatePromotion = () => {
    if (days < 3) return null;
    
    const originalPrice = totalPrice;
    const promotionGroups = Math.floor(days / 3);
    const freeDays = promotionGroups;
    const paidDays = days - freeDays;
    const discountedPrice = (totalPrice / days) * paidDays;
    const savings = originalPrice - discountedPrice;
    
    return {
      applied: true,
      freeDays,
      originalPrice,
      discountedPrice,
      savings
    };
  };
  
  const promotion = calculatePromotion();

  React.useEffect(() => {
    if (localStartDate && localEndDate) {
      if (new Date(localStartDate) > new Date(localEndDate)) {
        toast.error("วันที่เริ่มเช่าต้องมาก่อนวันที่คืนรถ");
        setRentalDates(null, null);
      } else {
        setRentalDates(localStartDate, localEndDate);
      }
    }
  }, [localStartDate, localEndDate, setRentalDates]);

  React.useEffect(() => {
    const total = calculateTotalPrice();
    setTotalPrice(total);
    if (startDate && endDate && new Date(startDate) <= new Date(endDate)) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDays(diffDays);
    } else {
      setDays(0);
    }
  }, [startDate, endDate, rentals, calculateTotalPrice]);

  // ✅ UPDATED: This function now navigates to the payment page
  const handleProceedToPayment = () => {
    if (!user) {
      toast.error("กรุณาเข้าสู่ระบบก่อนทำการเช่า");
      return navigate('/login');
    }
    if (rentals.length === 0 || !startDate || !endDate || totalPrice <= 0) {
      return toast.warn("กรุณากรอกข้อมูลการเช่าให้ครบถ้วน");
    }
    if (!phoneNumber || phoneNumber.trim() === '') {
      return toast.warn("กรุณาใส่เบอร์โทรศัพท์");
    }
    // Navigate to the payment page, passing the total price and phone number in the state
    navigate('/user/payment', { state: { totalPrice: totalPrice, phoneNumber: phoneNumber } });
  };

  if (rentals.length === 0) {
    return (
      <div className="container mx-auto mt-10 text-center py-20">
        <h1 className="text-3xl font-bold text-brand-dark">Your Rental Cart is Empty</h1>
        <p className="text-gray-500 mt-2 mb-6">Looks like you haven't selected any cars to rent yet.</p>
        <button onClick={() => navigate('/shop')} className="bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-md hover:bg-yellow-500 transition-colors">
          Browse Cars
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col lg:flex-row shadow-lg my-10 border rounded-lg overflow-hidden">
        {/* Rental List */}
        <div className="w-full lg:w-3/4 bg-white px-6 md:px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl text-brand-dark">Rental Summary</h1>
            <h2 className="font-semibold text-2xl">{rentals.length} Car(s)</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Car Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-3/5">Price Per Day</h3>
          </div>
          {rentals.map((car) => (
            <div key={car.id} className="flex items-center hover:bg-gray-50 -mx-8 px-6 py-5">
              <div className="flex w-2/5">
                <div className="w-20">
                  <img className="h-24 w-full object-cover rounded" src={car.images[0]?.url || '/car-placeholder.svg'} alt={car.brand} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{`${car.brand} ${car.model}`}</span>
                  <span className="text-gray-500 text-xs">Lic: {car.licensePlate}</span>
                  <button onClick={() => removeCarFromRental(car.id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs w-fit">
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex justify-center w-3/5">
                <span className="text-center font-semibold text-sm">{numberFormat(car.pricePerDay)}฿</span>
              </div>
            </div>
          ))}
          <button onClick={() => navigate('/shop')} className="flex font-semibold text-indigo-600 text-sm mt-10">
            ← Back to Shop
          </button>
        </div>

        {/* Summary Box */}
        <div id="summary" className="w-full lg:w-1/4 px-8 py-10 bg-gray-50">
          <h1 className="font-semibold text-2xl border-b pb-8">Booking Info</h1>
          <div className="mt-8">
            <label className="font-medium inline-block mb-3 text-sm uppercase">Start Date</label>
            <input type="date" value={localStartDate} onChange={e => setLocalStartDate(e.target.value)} className="p-2 text-sm w-full border rounded" />
          </div>
          <div className="mt-4">
            <label className="font-medium inline-block mb-3 text-sm uppercase">End Date</label>
            <input type="date" value={localEndDate} onChange={e => setLocalEndDate(e.target.value)} className="p-2 text-sm w-full border rounded" />
          </div>
          
          {/* 🎯 PROMOTION BANNER */}
          {promotion && (
            <div className="mt-4">
              <PromotionBanner
                rentalDays={days}
                originalPrice={promotion.originalPrice}
                discountedPrice={promotion.discountedPrice}
                freeDays={promotion.freeDays}
                savings={promotion.savings}
              />
            </div>
          )}
          <div className="mt-4">
            <label className="font-medium inline-block mb-3 text-sm uppercase">Phone Number</label>
            <input 
              type="tel" 
              value={phoneNumber} 
              onChange={e => setPhoneNumber(e.target.value)} 
              placeholder="Enter your phone number"
              className="p-2 text-sm w-full border rounded focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold" 
            />
          </div>
          <div className="border-t mt-8">
            <div className="flex justify-between py-4 text-sm">
              <span>Daily Total</span>
              <span>{numberFormat(getTotalDailyPrice())}฿</span>
            </div>
            <div className="flex justify-between py-4 text-sm">
              <span>Rental Days</span>
              <span>{days} Day(s)</span>
            </div>
            
            {/* 🎯 PROMOTION PRICE BREAKDOWN */}
            {promotion ? (
              <>
                <div className="flex justify-between py-2 text-sm text-gray-600">
                  <span>Original Price</span>
                  <span className="line-through">{numberFormat(promotion.originalPrice)}฿</span>
                </div>
                <div className="flex justify-between py-2 text-sm text-green-600">
                  <span>Promotion Discount</span>
                  <span>-{numberFormat(promotion.savings)}฿</span>
                </div>
                <div className="flex font-semibold justify-between py-4 text-lg uppercase border-t">
                  <span>Total Price</span>
                  <span className="text-green-600">{numberFormat(promotion.discountedPrice)}฿</span>
                </div>
              </>
            ) : (
              <div className="flex font-semibold justify-between py-6 text-lg uppercase">
                <span>Total Price</span>
                <span>{numberFormat(totalPrice)}฿</span>
              </div>
            )}
            <button onClick={handleProceedToPayment} className="bg-brand-dark text-white font-bold hover:bg-gray-800 py-3 text-sm uppercase w-full rounded-md">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

