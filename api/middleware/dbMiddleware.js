const { getDb } = require('../database/dbConnection');

const dbMiddleware = (req, res, next) => {
    try {
        req.db = getDb(); // Attach the database connection to req
        next();
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).json({ error: 'Database connection is not established yet.' });
    }
};

module.exports = dbMiddleware;