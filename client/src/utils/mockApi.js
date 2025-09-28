// Mock API service for development and fallback
export const mockAdminStats = {
  totalUsers: 1240,
  totalBookings: 89,
  totalRevenue: 125000,
  activeRentals: 12,
  pendingApprovals: 5,
  completedRentals: 67,
  totalCars: 45
};

export const mockAnalyticsData = {
  revenue: {
    current: 125000,
    previous: 98000,
    change: 27.6
  },
  users: {
    current: 1240,
    previous: 980,
    change: 26.5
  },
  bookings: {
    current: 89,
    previous: 67,
    change: 32.8
  },
  cars: {
    current: 45,
    previous: 42,
    change: 7.1
  },
  activeRentals: {
    current: 12,
    previous: 8,
    change: 50.0
  }
};

export const mockChartData = [
  { month: 'Jan', revenue: 87500, bookings: 45, users: 372 },
  { month: 'Feb', revenue: 93750, bookings: 53, users: 446 },
  { month: 'Mar', revenue: 106250, bookings: 62, users: 620 },
  { month: 'Apr', revenue: 100000, bookings: 58, users: 558 },
  { month: 'May', revenue: 112500, bookings: 67, users: 682 },
  { month: 'Jun', revenue: 125000, bookings: 89, users: 744 }
];

// Simulate API delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
export const mockApiResponse = async (data, delayMs = 500) => {
  await delay(delayMs);
  return { data };
};





