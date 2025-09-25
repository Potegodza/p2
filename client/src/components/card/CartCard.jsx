import React from "react";
import { Trash2 } from "lucide-react";
import useCarRentalStore from "../../store/carRentalStore"; // ❗️ ตรวจสอบว่า import ถูกต้อง
import { Link } from "react-router-dom";
import { numberFormat } from '../../utils/number';

const CartCard = () => {
  // ❗️ 1. แก้ไขชื่อฟังก์ชันที่ดึงมาจาก Store ให้ถูกต้องทั้งหมด
  const rentals = useCarRentalStore((state) => state.rentals) || [];
  const removeCarFromRental = useCarRentalStore((state) => state.removeCarFromRental);
  const getTotalDailyPrice = useCarRentalStore((state) => state.getTotalDailyPrice);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">รถที่เลือก</h1>
      <div className="border p-2 rounded-lg bg-white space-y-2">
        {rentals.length > 0 ? (
          rentals.map((item) => (
            <div key={item.id} className="bg-white p-2 rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      className="w-16 h-16 rounded-md object-cover"
                      src={item.images[0].url}
                      alt={`${item.brand} ${item.model}`}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs">
                      No Image
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-sm">{`${item.brand} ${item.model}`}</p>
                    <p className="text-xs text-gray-500">{numberFormat(item.pricePerDay)}฿ / วัน</p>
                  </div>
                </div>
                <button
                  onClick={() => removeCarFromRental(item.id)}
                  className="text-red-500 p-2 hover:bg-red-100 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">ยังไม่มีรถที่เลือก</p>
        )}
        
        {rentals.length > 0 && (
          <>
            <hr className="my-2"/>
            <div className="flex justify-between px-2 py-2 font-bold">
              <span>รวม (ต่อวัน):</span>
              {/* ❗️ 2. เรียกใช้ฟังก์ชันชื่อใหม่ที่ถูกต้อง */}
              <span>{numberFormat(getTotalDailyPrice())}฿</span>
            </div>
            <Link to="/cart">
              <button className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded-md shadow-md">
                ดูรายการทั้งหมด
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CartCard;