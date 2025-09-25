const prisma = require("../config/prisma");

exports.listUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                enabled: true,
                name: true,
                telephone: true,
            },
            orderBy: { createdAt: "asc" }
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.changeStatus = async (req, res) => {
    try {
        const { id, enabled } = req.body;
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { enabled: enabled },
        });
        res.send("Update Status Success");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.changeRole = async (req, res) => {
    try {
        const { id, role } = req.body;
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { role: role },
        });
        res.send("Update Role Success");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};


// ==========================================================
//        ฟังก์ชัน Dashboard Stats (เวอร์ชัน Prisma)
// ==========================================================
exports.getDashboardStats = async (req, res) => {
  try {
    // ใช้ Prisma Transaction เพื่อรันคำสั่งทั้งหมดพร้อมกันเพื่อประสิทธิภาพสูงสุด
    const [userCount, rentalCount, revenueResult] = await prisma.$transaction([
      prisma.user.count(),
      prisma.carRental.count(), // แก้ไขจาก prisma.rental เป็น prisma.carRental
      prisma.carRental.aggregate({ // แก้ไขจาก prisma.rental เป็น prisma.carRental
        _sum: {
          totalPrice: true, // ฟิลด์นี้ถูกต้องตรงตาม schema
        },
      }),
    ]);

    // ดึงค่า totalRevenue ออกมา (ถ้าไม่มีการจองเลย ค่าจะเป็น null)
    const totalRevenue = revenueResult._sum.totalPrice || 0;

    // ส่งข้อมูลกลับไป
    res.json({
      totalUsers: userCount,
      totalBookings: rentalCount,
      totalRevenue: totalRevenue,
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

