import React from "react";
import useCarRentalStore from "../../store/carRentalStore";
import { Link, useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";
// ... (imports อื่นๆ)

const ListCart = () => {
  // ❗️ 1. แก้ไขชื่อฟังก์ชันที่ดึงมาจาก Store
  const rentals = useCarRentalStore((state) => state.rentals) || [];
  const user = useCarRentalStore((state) => state.user);
  const getTotalDailyPrice = useCarRentalStore((state) => state.getTotalDailyPrice);
  const navigate = useNavigate();

  // ... (โค้ดส่วนอื่นๆ)

  return (
    // ...
    <div className="bg-white p-4 rounded-md shadow-md space-y-4 flex flex-col">
      <p className="text-2xl font-bold">ยอดรวม</p>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">รวมสุทธิ (ต่อวัน)</span>
        <span className="text-2xl font-bold text-red-500">
          {/* ❗️ 2. เรียกใช้ฟังก์ชันชื่อใหม่ */}
          {numberFormat(getTotalDailyPrice())}฿
        </span>
      </div>
      {/* ... (โค้ดส่วนปุ่ม) */}
    </div>
    // ...
  );
};

export default ListCart;