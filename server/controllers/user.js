const prisma = require("../config/prisma");

// Get a list of all users (for admin)
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

// Change a user's status (for admin)
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

// Change a user's role (for admin)
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