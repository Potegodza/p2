import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer"; // 1. Import Footer

const Layout = () => {
  return (
    // 2. ใช้ Flexbox เพื่อจัดให้ Footer อยู่ด้านล่างสุดของหน้าจอเสมอ
    <div className="flex flex-col min-h-screen"> 
      <MainNav />

      {/* 3. ส่วน <main> จะขยายเต็มพื้นที่ที่เหลือ ดัน Footer ลงไป */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer /> {/* 4. เพิ่ม Footer เข้ามาที่ส่วนท้ายสุด */}
    </div>
  );
};

export default Layout;

