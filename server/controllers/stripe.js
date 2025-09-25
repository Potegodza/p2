const stripe = require('stripe')(process.env.STRIPE_SK);

// This function creates a Stripe Payment Intent
exports.createPaymentIntent = async (req, res) => {
    try {
        // We will get the total price from the client-side request body
        const { totalPrice } = req.body;

        // Basic validation
        if (!totalPrice || totalPrice <= 0) {
            return res.status(400).json({ error: 'A valid total price is required.' });
        }
        
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            // Stripe expects the amount in the smallest currency unit (e.g., satang for THB)
            amount: Math.round(totalPrice * 100), 
            currency: 'thb', // You can change this to your desired currency
            automatic_payment_methods: {
                enabled: true,
            },
        });

        // Send the clientSecret back to the client
        res.send({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (err) {
        console.error("Error creating payment intent:", err);
        res.status(500).json({ error: { message: err.message } });
    }
};

