// client/src/api/car.jsx

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const createCar = async (token, form) => {
  return axios.post(`${API_URL}/api/car`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCar = async (count = 20) => {
  return axios.get(`${API_URL}/api/cars/` + count);
};

export const readCar = async (token, id) => {
  return axios.get(`${API_URL}/api/car/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCar = async (token, id) => {
  return axios.delete(`${API_URL}/api/car/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCar = async (token, id, form) => {
  return axios.put(`${API_URL}/api/car/` + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  return axios.post(
    `${API_URL}/api/images`,
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  return axios.post(
    `${API_URL}/api/removeimages`,
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchFilters = async (arg) => {
  return axios.post(`${API_URL}/api/search/filters`, arg);
};

export const listCarBy = async (sort, order, limit) => {
  return axios.post(`${API_URL}/api/carby`, {
    sort,
    order,
    limit,
  });
};

export const changeCarStatus = async (token, id, status) => {
  return axios.put(`${API_URL}/api/car/${id}/status`, 
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};