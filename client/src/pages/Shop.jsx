// client/src/pages/Shop.jsx

import React, { useEffect } from 'react';
import ProductCard from '../components/card/ProductCard';
import useCarRentalStore from '../store/carRentalStore';
import SearchCard from '../components/card/SearchCard';
import CartCard from '../components/card/CartCard';

// ❗️ 1. ลบบรรทัด import ที่ผิดพลาดนี้ทิ้งไป
// import getCar from '../api/car'; 

const Shop = () => {
  // ✅ 2. ดึง state และ action มาจาก store ให้ถูกต้อง
  const cars = useCarRentalStore((state) => state.cars) || [];
  const getCar = useCarRentalStore((state) => state.getCar);

  useEffect(() => {
    // ✅ 3. เรียก getCar จาก store เมื่อ component โหลด
    getCar(100); // โหลดรถมา 100 คัน หรือตามจำนวนที่ต้องการ
  }, [getCar]);

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      <aside className='w-full md:w-1/4 lg:w-1/5'>
        <SearchCard />
        <div className="mt-4">
          <CartCard />
        </div>
      </aside>

      <main className='w-full md:w-3/4 lg:w-4/5 p-4'>
        <p className='text-2xl font-bold mb-4'>รถยนต์ทั้งหมด ({cars.length})</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {cars.map((car) => (
            <ProductCard
              key={car.id}
              item={{
                ...car,
                title: `${car.brand} ${car.model}`,
                description: `ทะเบียน: ${car.licensePlate}`,
                price: car.pricePerDay,
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Shop;