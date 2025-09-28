// client/src/api/car.jsx

import axios from "axios";

export const createCar = async (token, form) => {
  return axios.post("http://localhost:5001/api/car", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCar = async (count = 20) => {
  return axios.get("http://localhost:5001/api/cars/" + count);
};

export const readCar = async (token, id) => {
  return axios.get("http://localhost:5001/api/car/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCar = async (token, id) => {
  return axios.delete("http://localhost:5001/api/car/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCar = async (token, id, form) => {
  return axios.put("http://localhost:5001/api/car/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  return axios.post(
    "http://localhost:5001/api/images",
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
    "http://localhost:5001/api/removeimages",
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
  return axios.post("http://localhost:5001/api/search/filters", arg);
};

export const listCarBy = async (sort, order, limit) => {
  return axios.post("http://localhost:5001/api/carby", {
    sort,
    order,
    limit,
  });
};

export const changeCarStatus = async (token, id, status) => {
  return axios.put(`http://localhost:5001/api/car/${id}/status`, 
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};