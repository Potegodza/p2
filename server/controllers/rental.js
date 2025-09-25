const prisma = require("../config/prisma");

// ... (ฟังก์ชัน saveRental, getRentals) ...
exports.saveRental = async (req, res) => {
    try {
        const { carId, startDate, endDate, name, telephone } = req.body;
        const userId = req.user.id;

        // --- ✅ NEW: Input Validation ---
        if (!startDate || !endDate || !carId) {
            return res.status(400).json({ message: "Car, start date, and end date are required." });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to the beginning of today

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ message: "Invalid date format." });
        }
        if (start < today) {
            return res.status(400).json({ message: "Start date cannot be in the past." });
        }
        if (end < start) {
            return res.status(400).json({ message: "End date cannot be before the start date." });
        }
        // --- End of Validation ---


        // Use a transaction to ensure all operations succeed or none do.
        const newRental = await prisma.$transaction(async (tx) => {
            // 1. Find the car and lock it for the transaction, checking its status.
            const car = await tx.car.findUnique({
                where: { id: Number(carId) },
            });

            // If the car is not found or already rented, throw an error to cancel the transaction.
            if (!car || car.status !== 'available') {
                throw new Error("This car is not available for rental at this moment.");
            }

            // 2. Update user's contact info.
            if (name || telephone) { // Only update if provided
                await tx.user.update({
                    where: { id: userId },
                    data: { name, telephone }
                });
            }

            // 3. Calculate rental details.
            // We use the validated start and end date objects from above
            const diffTime = end.getTime() - start.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the start day
            const totalPrice = diffDays * car.pricePerDay;

            // --- ✅ NEW: Validate the calculated total price ---
            if (!isFinite(totalPrice) || totalPrice <= 0) {
                throw new Error("Could not calculate a valid total price.");
            }

            // 4. Create the new rental record.
            const rental = await tx.carRental.create({
                data: {
                    carId: Number(carId),
                    renterId: userId,
                    startDate: start,
                    endDate: end,
                    totalPrice: totalPrice,
                    status: 'Pending', // Default status
                }
            });
            
            // 5. Update the car's status to 'rented'.
            await tx.car.update({
                where: { id: Number(carId) },
                data: { status: 'rented' }
            });

            return rental;
        });

        res.status(201).json({ message: "Rental created successfully!", rental: newRental });
    } catch (err) {
        // --- ✅ IMPROVED: More Detailed Error Logging ---
        console.error("--- FULL ERROR OBJECT IN saveRental ---", err);
        
        // Provide a specific error message for known issues
        if (err.message.includes("Car is not available") || err.message.includes("valid total price")) {
            return res.status(400).json({ message: err.message });
        }

        // Check for Prisma-specific error codes to provide better feedback
        if (err.code) { 
            console.error("Prisma Error Code:", err.code);
            return res.status(500).json({ message: `A database error occurred. Code: ${err.code}` });
        }

        res.status(500).json({ message: "An unexpected server error occurred." });
    }
};

exports.getRentals = async (req, res) => {
    try {
        const rentals = await prisma.carRental.findMany({
            where: { renterId: Number(req.user.id) },
            include: { 
                car: {
                    include: {
                        images: true // Include car images
                    }
                } 
            },
            orderBy: { createdAt: "desc" }
        });
        res.json(rentals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getRentalsAdmin = async (req, res) => {
    try {
        const rentals = await prisma.carRental.findMany({
            include: {
                car: true,
                renter: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        telephone: true,
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        });
        res.json(rentals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


// ✅ UPGRADED VERSION
// Change a rental's status (for admin)
exports.changeRentalStatus = async (req, res) => {
    try {
        const { rentalId, rentalStatus } = req.body;

        const updatedRental = await prisma.$transaction(async (tx) => {
            // Step 1: Update the rental status
            const rental = await tx.carRental.update({
                where: { id: Number(rentalId) },
                data: { status: rentalStatus },
                include: { car: true }, // Include car data to get its ID
            });

            // Step 2: If status is 'Completed' or 'Cancelled', make the car available again
            if (rentalStatus === "Completed" || rentalStatus === "Cancelled") {
                await tx.car.update({
                    where: { id: rental.carId },
                    data: { status: "available" },
                });
            }

            return rental;
        });

        res.json(updatedRental);
    } catch (err) {
        console.error("Error changing rental status:", err);
        res.status(500).json({ message: "Server error while changing status" });
    }
};

