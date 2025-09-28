const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        const { email, password, telephone } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        if (!telephone) {
            return res.status(400).json({ message: 'Phone number is required.' });
        }

        const user = await prisma.user.findFirst({
            where: { email: email }
        });
        if (user) {
            return res.status(400).json({ message: "Email already exists." });
        }
        
        const hashPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                telephone: telephone
            }
        });

        res.send('Registration successful.');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findFirst({
            where: { email: email }
        });
        if (!user || !user.enabled) {
            return res.status(400).json({ message: 'User not found or account is disabled.' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password.' });
        }
        
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        
        jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Server Error" });
            }
            res.json({ payload, token });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.currentUser = async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: { email: req.user.email },
            select: {
                id: true,
                email: true,
                name: true,
                telephone: true,
                role: true
            }
        });
        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};