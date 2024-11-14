const Contact = require('../models/Contact');

// Get all contact form submissions
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new contact submission
exports.addContact = async (req, res) => {
    try {
        const { fullName, email, mobile, city } = req.body;

        // Check if all required fields are provided
        if (!fullName || !email || !mobile || !city) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new Contact document
        const newContact = new Contact({ fullName, email, mobile, city });
        await newContact.save();

        res.status(201).json({ message: "Contact submission added successfully", contact: newContact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a contact submission by ID
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact submission not found" });
        }
        res.status(200).json({ message: "Contact submission deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
