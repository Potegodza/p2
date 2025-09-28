import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useCarRentalStore from "../../store/carRentalStore";
import CheckoutForm from "../../components/CheckoutForm"; // ✅ Path นี้ถูกต้อง
import { createPaymentIntent } from "../../api/stripe";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useCarRentalStore((s) => s.token);
  const [clientSecret, setClientSecret] = useState("");
  
  // Get total price and phone number from the navigation state sent from Cart.jsx
  const totalPrice = location.state?.totalPrice;
  const phoneNumber = location.state?.phoneNumber;

  useEffect(() => {
    // Redirect back to cart if there's no price to pay
    if (!totalPrice || totalPrice <= 0) {
      toast.error("Invalid payment amount. Please try again from the cart.");
      navigate('/cart');
      return;
    }

    if (token) {
      // Request a client secret from the server
      createPaymentIntent(token, { totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Failed to create payment intent:", err);
          toast.error("Could not connect to the payment service.");
        });
    }
  }, [token, totalPrice, navigate]);

  const appearance = { theme: "stripe" };
  const loader = "auto";

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-brand-dark mb-2">Secure Payment</h1>
        <p className="text-center text-gray-500 mb-8">Complete your booking by providing your payment details.</p>
        
        {clientSecret ? (
          <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
            <CheckoutForm phoneNumber={phoneNumber} />
          </Elements>
        ) : (
          <p className="text-center">Loading payment form...</p>
        )}
      </div>
    </div>
  );
};

export default Payment;

