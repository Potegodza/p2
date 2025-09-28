import axios from "axios";
import { mockApiResponse, mockAdminStats } from "../utils/mockApi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
const API_BASE_URL = `${API_URL}/api`;

/**
 * Fetches admin dashboard statistics
 * @param {string} token - Admin authentication token
 * @returns {Promise} Axios promise object
 */
export const getAdminStats = async (token) => {
  try {
    return await axios.get(`${API_BASE_URL}/admin/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.warn("API Error, using mock data:", error.message);
    // Return mock data if API fails
    return mockApiResponse(mockAdminStats);
  }
};

/**
 * Fetches all users for admin management
 * @param {string} token - Admin authentication token
 * @returns {Promise} Axios promise object
 */
export const getUsers = async (token) => {
  return axios.get(`${API_BASE_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

/**
 * Fetches all rentals for admin management
 * @param {string} token - Admin authentication token
 * @returns {Promise} Axios promise object
 */
export const getRentals = async (token) => {
  return axios.get(`${API_BASE_URL}/admin/rentals`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

/**
 * Updates rental status
 * @param {string} token - Admin authentication token
 * @param {string} rentalId - Rental ID
 * @param {string} status - New status
 * @returns {Promise} Axios promise object
 */
export const updateRentalStatus = async (token, rentalId, status) => {
  return axios.put(`${API_BASE_URL}/admin/rental-status`, {
    rentalId,
    status
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

/**
 * Deletes a user
 * @param {string} token - Admin authentication token
 * @param {string} userId - User ID to delete
 * @returns {Promise} Axios promise object
 */
export const deleteUser = async (token, userId) => {
  return axios.delete(`${API_BASE_URL}/admin/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

/**
 * Gets list of all users (alias for getUsers)
 * @param {string} token - Admin authentication token
 * @returns {Promise} Axios promise object
 */
export const getListAllUsers = async (token) => {
  return getUsers(token);
};

/**
 * Changes user status (enable/disable)
 * @param {string} token - Admin authentication token
 * @param {object} userData - User data with id and enabled status
 * @returns {Promise} Axios promise object
 */
export const changeUserStatus = async (token, userData) => {
  return axios.put(`${API_BASE_URL}/admin/user-status`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

/**
 * Changes user role
 * @param {string} token - Admin authentication token
 * @param {object} userData - User data with id and role
 * @returns {Promise} Axios promise object
 */
export const changeUserRole = async (token, userData) => {
  return axios.put(`${API_BASE_URL}/admin/user-role`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

/**
 * Fetches analytics data for admin dashboard
 * @param {string} token - Admin authentication token
 * @param {string} timeRange - Time range for analytics (7d, 30d, 90d, 1y)
 * @returns {Promise} Axios promise object
 */
export const getAnalyticsData = async (token, timeRange = '30d') => {
  return axios.get(`${API_BASE_URL}/admin/analytics?timeRange=${timeRange}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

/**
 * Fetches chart data for analytics
 * @param {string} token - Admin authentication token
 * @param {string} timeRange - Time range for chart data
 * @returns {Promise} Axios promise object
 */
export const getChartData = async (token, timeRange = '30d') => {
  return axios.get(`${API_BASE_URL}/admin/chart-data?timeRange=${timeRange}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

/**
 * Fetches top performing cars data
 * @param {string} token - Admin authentication token
 * @param {string} timeRange - Time range for data
 * @returns {Promise} Axios promise object
 */
export const getTopPerformingCars = async (token, timeRange = '30d') => {
  // Since the API endpoint doesn't exist, always return mock data
  console.log("Top cars API endpoint not implemented, using mock data");
  const mockCarsData = [
    { model: 'Toyota Camry', bookings: 22, revenue: 44000, rating: 4.8 },
    { model: 'Honda Civic', bookings: 18, revenue: 32400, rating: 4.7 },
    { model: 'BMW 3 Series', bookings: 15, revenue: 45000, rating: 4.9 },
    { model: 'Mercedes C-Class', bookings: 13, revenue: 45500, rating: 4.6 },
    { model: 'Audi A4', bookings: 11, revenue: 30800, rating: 4.8 },
    { model: 'Nissan Altima', bookings: 10, revenue: 16000, rating: 4.5 }
  ];
  return mockApiResponse(mockCarsData);
};