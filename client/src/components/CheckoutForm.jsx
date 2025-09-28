import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../stripe.css";
import useCarRentalStore from "../store/carRentalStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createRental } from "../api/user";

export default function CheckoutForm({ phoneNumber }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { token, user, rentals, startDate, endDate, clearRentals, calculateTotalPrice } = useCarRentalStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    // Validate phone number
    if (!phoneNumber || phoneNumber.trim() === '') {
      toast.error('Phone number is required. Please go back to cart and enter your phone number.');
      return;
    }

    setIsLoading(true);

    // ✅ Step 1: Trigger form validation and collect data
    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast.error(submitError.message);
      setIsLoading(false);
      return;
    }

    // ✅ Step 2: Confirm the payment with Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      toast.error(error.message);
      setIsLoading(false);
    } else {
      // ✅ Step 3: Payment succeeded! Now, save the booking to our database.
      try {
        const rentalPromises = rentals.map(car => {
          const rentalData = {
            carId: car.id,
            startDate: startDate instanceof Date ? startDate.toISOString() : startDate,
            endDate: endDate instanceof Date ? endDate.toISOString() : endDate,
            name: user.name,
            telephone: phoneNumber
          };
          console.log("Sending rental data:", rentalData); // Debug log
          return createRental(token, rentalData);
        });
        
        await Promise.all(rentalPromises);

        toast.success("Payment and booking successful!");
        clearRentals();
        navigate('/user/history');

      } catch (apiError) {
        console.error("API Error after payment:", apiError);
        toast.error("Payment was successful, but there was an error with your booking. Please contact support.");
        setIsLoading(false);
      }
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
      {/* Display Phone Number */}
      <div className="mb-6 p-3 bg-gray-50 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <span className="text-sm text-gray-600">{phoneNumber}</span>
      </div>

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="stripe-button mt-4">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
    </form>
  );
}

