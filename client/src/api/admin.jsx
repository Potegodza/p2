import axios from "axios";

export const getRentalsAdmin = async (token) => {
  return axios.get("http://localhost:5001/api/admin/rentals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeRentalStatus = async (token, rentalId, rentalStatus) => { // 1. เปลี่ยนชื่อตัวแปรเพื่อความชัดเจน (ทางเลือก)
  return axios.put(
    "http://localhost:5001/api/admin/rental-status",
    {
      rentalId,
      rentalStatus, // 2. ✅ แก้ไข Key ตรงนี้ให้เป็น "rentalStatus"
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getListAllUsers = async (token) => {
  return axios.get("http://localhost:5001/api/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserStatus = async (token, value) => {
  return axios.post("http://localhost:5001/api/admin/change-status", value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserRole = async (token, value) => {
  return axios.post("http://localhost:5001/api/admin/change-role", value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

