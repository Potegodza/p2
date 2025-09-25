import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../stripe.css";
import useCarRentalStore from "../store/carRentalStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createRental } from "../api/user";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const stripePromise = loadStripe("pk_test_51SADW1FbsCq9ERXq29ezSHWHEOjSrAJReZ1A5johDbG53OoUdIx1A9Gr8HUhH8nBc0ivyhMuBr07x4GSmiOnS3Bx00lDWFPQm1");

  const { token, user, rentals, startDate, endDate, clearRentals } = useCarRentalStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
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
            startDate,
            endDate,
            name: user.name,
            telephone: user.telephone
          };
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
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="stripe-button mt-4">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
    </form>
  );
}

