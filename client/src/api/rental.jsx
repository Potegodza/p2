import axios from "axios";

export const createRental = async (token, rentalData) => {
  return axios.post("http://localhost:5001/api/user/rental", rentalData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRentals = async (token) => {
  return axios.get("http://localhost:5001/api/user/rentals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRentalsAdmin = async (token) => {
  return axios.get("http://localhost:5001/api/admin/rentals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeRentalStatus = async (token, rentalId, status) => {
  return axios.put(
    "http://localhost:5001/api/admin/rental-status",
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
