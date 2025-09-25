import axios from 'axios';

/**
 * Creates a Stripe Payment Intent by sending the total price to the server.
 * @param {string} token The user's authentication token.
 * @param {object} payload An object containing the totalPrice (e.g., { totalPrice: 1500 }).
 * @returns {Promise} Axios promise object.
 */
export const createPaymentIntent = async (token, payload) => {
    // ✅ This is the corrected endpoint URL (removed "/user")
    return await axios.post('http://localhost:5001/api/create-payment-intent', payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

