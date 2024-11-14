const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Function
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if admin with the same username already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this username already exists" });
        }

        // Create a new Admin instance
        const newAdmin = new Admin({ username, password });

        // Generate JWT token
        const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
        newAdmin.token = token; // Store token in the admin model

        // Save the new admin with hashed password and token
        await newAdmin.save();

        // Respond with a success message and the generated token
        res.status(201).json({ message: "Admin registered successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login Function
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if admin exists
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Create JWT token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

        // Update admin with the new token
        admin.token = token;
        await admin.save();

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout Function
exports.logout = async (req, res) => {
    try {
        // Ensure we're dealing with the correct admin
        const admin = await Admin.findById(req.admin.id);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        // Clear the token from the database
        admin.token = null;
        await admin.save();

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
