import React, { useEffect, useState } from "react";
// ❗️ 1. แก้ไข import ให้ถูกต้อง
import { listCarBy } from "../../api/car";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const NewProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // ❗️ 2. แก้ไขฟังก์ชันที่เรียกใช้เป็น listCarBy
    listCarBy("createdAt", "desc", 12)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to load new cars:", err);
      });
  };

  return (
    <SwiperShowProduct>
      {data?.map((item) => (
        <SwiperSlide key={item.id}>
          {/* ❗️ 3. แปลงข้อมูล "รถ" ให้ "ProductCard" เข้าใจ */}
          <ProductCard
            item={{
              ...item,
              title: `${item.brand} ${item.model}`,
              description: `ทะเบียน: ${item.licensePlate}`,
              price: item.pricePerDay,
            }}
          />
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
  );
};

export default NewProduct;