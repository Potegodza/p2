import React from "react";
import useCarRentalStore from "../../store/carRentalStore";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";

const ProductCard = ({ item }) => {
  // ดึง action สำหรับเพิ่มรถเข้าตะกร้าเช่าจาก store
  const addCarToRental = useCarRentalStore((state) => state.addCarToRental);

  return (
    // ใช้ Framer Motion เพื่อเพิ่ม Animation ตอนการ์ดปรากฏ
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-100/50 rounded-lg shadow-md p-4 flex flex-col h-full"
    >
      {/* ส่วนรูปภาพรถ */}
      <div className="mb-4">
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0].url}
            className="rounded-md w-full h-40 object-cover"
            alt={item.title}
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center shadow-inner">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      {/* ส่วนรายละเอียดรถ */}
      <div className="flex-grow mb-4">
        <h3 className="text-xl font-bold text-brand-dark truncate">{item.title}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      {/* ส่วนราคา */}
      <div className="mb-4">
        <span className="text-2xl font-bold text-brand-dark">{numberFormat(item.price)}</span>
        <span className="text-sm text-gray-500"> THB/day</span>
      </div>

      {/* ส่วนปุ่ม */}
      <div className="grid grid-cols-2 gap-3">
        <button className="w-full border border-gray-300 text-gray-600 font-semibold py-2 rounded-md hover:bg-gray-200 transition-colors">
          View Details
        </button>
        <button
          onClick={() => addCarToRental(item)}
          className="w-full bg-brand-gold text-brand-dark font-bold py-2 rounded-md hover:bg-yellow-500 transition-colors"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
