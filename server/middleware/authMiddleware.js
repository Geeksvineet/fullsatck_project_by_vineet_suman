const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the admin by ID and check if the token matches the one in the database
        const admin = await Admin.findById(decoded.id);
        if (!admin || admin.token !== token) {
            return res.status(401).json({ message: "Invalid token." });
        }

        req.admin = admin; // Attach the admin to the request object for further access
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: "Token verification failed." });
    }
};

module.exports = auth;
