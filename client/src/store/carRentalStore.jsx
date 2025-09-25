// client/src/store/carRentalStore.jsx

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { listCar, searchFilters } from '../api/car';
import { toast } from 'react-toastify';

const useCarRentalStore = create(
  persist(
    (set, get) => ({
      // --- State ---
      token: null,
      user: null,
      cars: [],
      rentals: [], // รถที่เลือกไว้
      startDate: null,
      endDate: null,

      // --- Actions ---
      actionLogin: async (credentials) => {
        try {
          const response = await axios.post('http://localhost:5001/api/login', credentials);
          const { token, payload } = response.data;
          
          set({ token: token, user: payload });
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          return response; // ✅ ส่งค่า response กลับไป
          
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },
      logout: () => {
        set({ token: null, user: null, cars: [], rentals: [], startDate: null, endDate: null });
        delete axios.defaults.headers.common['Authorization'];
      },
      getCar: async (count = 100) => {
        try {
          const res = await listCar(count);
          set({ cars: res.data });
        } catch (err) {
          console.error("Failed to fetch cars:", err);
        }
      },
      actionSearchFilters: async (filters) => {
        try {
            const res = await searchFilters(filters);
            set({ cars: res.data });
        } catch (err) {
            console.log(err);
        }
      },

      // --- Rental Actions ---
      addCarToRental: (car) => {
        const { rentals } = get();
        if (!rentals.find(item => item.id === car.id)) {
          set({ rentals: [...rentals, car] });
          toast.success(`เพิ่ม ${car.brand} ${car.model} สำหรับการเช่า`);
        } else {
          toast.info("คุณได้เลือกรถคันนี้ไว้แล้ว");
        }
      },
      removeCarFromRental: (carId) => {
        set((state) => ({
          rentals: state.rentals.filter((car) => car.id !== carId),
        }));
        toast.warn("นำรถออกจากรายการเช่า");
      },
      setRentalDates: (start, end) => {
        set({ startDate: start, endDate: end });
      },
      getTotalDailyPrice: () => {
        const { rentals } = get();
        return rentals.reduce((total, car) => total + car.pricePerDay, 0);
      },
      calculateTotalPrice: () => {
        const { startDate, endDate } = get();
        if (!startDate || !endDate) return 0;
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start > end) return 0;

        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        const dailyTotal = get().getTotalDailyPrice();
        return dailyTotal * diffDays;
      },
      clearRentals: () => {
        set({ rentals: [], startDate: null, endDate: null });
      }
    }),
    {
      name: 'car-rental-storage',
      onRehydrateStorage: () => {
        return (state) => {
          if (state && state.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
          }
        };
      },
    }
  )
);

export default useCarRentalStore;