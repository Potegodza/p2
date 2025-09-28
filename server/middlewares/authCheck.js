const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')

exports.authCheck = async (req, res, next) => {
    try {
        //code
        const headerToken = req.headers.authorization
        if (!headerToken) {
            return res.status(401).json({ message: "No Token, Authorization" })
        }
        const token = headerToken.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET || process.env.SECRET)
        req.user = decode

        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email
            }
        })
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }
        
        if (!user.enabled) {
            return res.status(400).json({ message: 'This account cannot access' })
        }

        next()
    } catch (err) {
        console.error('Auth error:', err);
        
        // Handle specific JWT errors
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        res.status(401).json({ message: 'Authentication failed' });
    }
}


exports.adminCheck = async (req, res, next) => {
    try {
        const { email } = req.user
        const adminUser = await prisma.user.findFirst({
            where: { email: email }
        })
        if (!adminUser || adminUser.role !== 'admin') {
            return res.status(403).json({ message: 'Acess Denied: Admin Only' })
        }
        // console.log('admin check', adminUser)
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error Admin access denied' })
    }
}