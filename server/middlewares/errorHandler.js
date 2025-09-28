// server/middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error('Error occurred:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query,
        timestamp: new Date().toISOString()
    });

    // Database connection errors
    if (err.code === 'P2002') {
        return res.status(400).json({
            message: 'Duplicate entry found',
            field: err.meta?.target
        });
    }

    // Database query errors
    if (err.code && err.code.startsWith('P')) {
        return res.status(400).json({
            message: 'Database error',
            error: process.env.NODE_ENV === 'development' ? err.message : 'Database operation failed'
        });
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation error',
            errors: err.errors
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            message: 'Token expired'
        });
    }

    // Default error response
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        message,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        timestamp: new Date().toISOString()
    });
};

module.exports = errorHandler;
