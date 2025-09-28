import React, { useEffect, useState } from "react";
// ❗️ 1. แก้ไข import ให้ถูกต้อง
import { listCarBy } from "../../api/car";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";

const NewProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    // ❗️ 2. แก้ไขฟังก์ชันที่เรียกใช้เป็น listCarBy
    listCarBy("createdAt", "desc", 12)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load new cars:", err);
        setLoading(false);
      });
  };

  if (loading) {
    return <LoadingSpinner text="Loading new arrivals..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <SwiperShowProduct>
        {data?.map((item, index) => (
          <SwiperSlide key={item.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* ❗️ 3. แปลงข้อมูล "รถ" ให้ "ProductCard" เข้าใจ */}
              <ProductCard
                item={{
                  ...item,
                  title: `${item.brand} ${item.model}`,
                  description: `ทะเบียน: ${item.licensePlate}`,
                  price: item.pricePerDay,
                }}
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </SwiperShowProduct>
    </motion.div>
  );
};

export default NewProduct;