import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const createRental = async (token, rentalData) => {
  return axios.post(`${API_URL}/api/user/rental`, rentalData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRentals = async (token) => {
  return axios.get(`${API_URL}/api/user/rentals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRentalsAdmin = async (token) => {
  return axios.get(`${API_URL}/api/admin/rentals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeRentalStatus = async (token, rentalId, status) => {
  return axios.put(
    `${API_URL}/api/admin/rental-status`,
    {
      rentalId: rentalId,
      rentalStatus: status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
