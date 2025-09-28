const prisma = require("../config/prisma");
const cloudinary = require('cloudinary').v2;

// Configuration for Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.create = async (req, res) => {
    try {
        const { brand, model, year, licensePlate, pricePerDay, images } = req.body;
        const car = await prisma.car.create({
            data: {
                brand: brand,
                model: model,
                year: parseInt(year),
                licensePlate: licensePlate,
                pricePerDay: parseFloat(pricePerDay),
                images: {
                    create: images.map(item => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        });
        res.status(201).json(car);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.list = async (req, res) => {
    try {
        const { count } = req.params;
        const cars = await prisma.car.findMany({
            take: parseInt(count),
            orderBy: { createdAt: "desc" },
            include: { 
                images: true,
                rentals: {
                    where: {
                        status: {
                            in: ['Pending', 'Active']
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });
        res.json(cars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.read = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await prisma.car.findFirst({
            where: { id: Number(id) },
            include: { 
                images: true,
                rentals: {
                    where: {
                        status: {
                            in: ['Pending', 'Active']
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });
        
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        
        res.json(car);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.update = async (req, res) => {
    try {
        const { brand, model, year, licensePlate, pricePerDay, images } = req.body;
        const { id } = req.params;

        await prisma.image.deleteMany({
            where: { carId: Number(id) }
        });

        const car = await prisma.car.update({
            where: { id: Number(id) },
            data: {
                brand: brand,
                model: model,
                year: parseInt(year),
                licensePlate: licensePlate,
                pricePerDay: parseFloat(pricePerDay),
                images: {
                    create: images.map(item => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        });
        res.json(car);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await prisma.car.findFirst({
            where: { id: Number(id) },
            include: { images: true }
        });

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        const deletedImagePromises = car.images.map(image => 
            new Promise((resolve, reject) => {
                cloudinary.uploader.destroy(image.public_id, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            })
        );
        await Promise.all(deletedImagePromises);

        await prisma.car.delete({
            where: { id: Number(id) }
        });

        res.send('Deleted Success');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.searchFilters = async (req, res) => {
    try {
        const { brand, price } = req.body;
        let whereCondition = {};

        if (brand) {
            whereCondition.brand = { contains: brand };
        }
        if (price && Array.isArray(price) && price.length === 2) {
            whereCondition.pricePerDay = { gte: price[0], lte: price[1] };
        }
        
        const cars = await prisma.car.findMany({
            where: whereCondition,
            include: { images: true },
            orderBy: { createdAt: "desc" }
        });
        
        res.json(cars);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.listBy = async (req, res) => {
    try {
        const { sort, order, limit } = req.body;
        const cars = await prisma.car.findMany({
            take: Number(limit),
            orderBy: { [sort]: order },
            include: { images: true }
        });
        res.json(cars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.createImages = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `car-rental-${Date.now()}`,
            resource_type: 'auto',
            folder: 'CarRental'
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.removeImage = async (req, res) => {
    try {
        const { public_id } = req.body;
        cloudinary.uploader.destroy(public_id, (error, result) => {
            if (error) {
                return res.status(500).json({ message: 'Error removing image' });
            }
            res.send('Remove Image Success!!!');
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// ฟังก์ชันสำหรับเปลี่ยนสถานะรถ
exports.changeCarStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // ตรวจสอบสถานะที่อนุญาต
        const allowedStatuses = ['available', 'rented', 'maintenance'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ 
                message: 'Invalid status. Allowed values: available, rented, maintenance' 
            });
        }

        const car = await prisma.car.update({
            where: { id: Number(id) },
            data: { status: status },
            include: { 
                images: true,
                rentals: {
                    where: {
                        status: {
                            in: ['Pending', 'Active']
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });

        res.json({ 
            message: `Car status updated to ${status}`, 
            car: car 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
