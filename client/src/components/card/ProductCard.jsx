import React from "react";
import useCarRentalStore from "../../store/carRentalStore";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";

const ProductCard = ({ item }) => {
  // ดึง action สำหรับเพิ่มรถเข้าตะกร้าเช่าจาก store
  const addCarToRental = useCarRentalStore((state) => state.addCarToRental);
  
  // ตรวจสอบสถานะรถ
  const isAvailable = item.status === 'available';
  const isRented = item.status === 'rented';
  const isMaintenance = item.status === 'maintenance';
  
  // ตรวจสอบว่ามีการเช่าที่กำลังดำเนินอยู่หรือไม่
  const hasActiveRental = item.rentals && item.rentals.length > 0;

  return (
    // ใช้ Framer Motion เพื่อเพิ่ม Animation ตอนการ์ดปรากฏ
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="bg-gray-100/50 rounded-lg shadow-md p-4 flex flex-col h-full"
    >
      {/* ส่วนรูปภาพรถ */}
      <div className="mb-4 relative">
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
        
        {/* Car Status */}
        <motion.div 
          className="absolute top-2 right-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
        >
          {isRented || hasActiveRental ? (
            <motion.span 
              className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md"
              whileHover={{ scale: 1.1 }}
            >
              RENTED
            </motion.span>
          ) : isMaintenance ? (
            <motion.span 
              className="bg-brand-gold text-brand-dark px-2 py-1 rounded-full text-xs font-semibold shadow-md"
              whileHover={{ scale: 1.1 }}
            >
              MAINTENANCE
            </motion.span>
          ) : (
            <motion.span 
              className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md"
              whileHover={{ scale: 1.1 }}
            >
              AVAILABLE
            </motion.span>
          )}
        </motion.div>
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
      <div className="w-full">
        {isAvailable && !hasActiveRental ? (
          <motion.button
            onClick={() => addCarToRental(item)}
            className="w-full bg-brand-gold text-brand-dark font-bold py-2 rounded-md hover:bg-yellow-500 transition-colors shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Book Now
          </motion.button>
        ) : (
          <motion.button
            disabled
            className="w-full bg-gray-300 text-gray-500 font-bold py-2 rounded-md cursor-not-allowed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {isRented || hasActiveRental ? 'RENTED' : isMaintenance ? 'MAINTENANCE' : 'UNAVAILABLE'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
