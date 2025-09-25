import axios from "axios";

/**
 * Creates a new rental record for the logged-in user.
 * This is typically called after a successful payment or booking confirmation.
 * @param {string} token - The user's authentication token.
 * @param {object} rentalData - The details of the rental (carId, startDate, endDate, etc.).
 * @returns {Promise} Axios promise object.
 */
export const createRental = async (token, rentalData) => {
  return axios.post("http://localhost:5001/api/user/rental", rentalData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Fetches the rental history for the logged-in user.
 * @param {string} token - The user's authentication token.
 * @returns {Promise} Axios promise object.
 */
export const getRentalHistory = async (token) => {
  // This endpoint fetches all rentals for the current user.
  return axios.get("http://localhost:5001/api/user/rentals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

