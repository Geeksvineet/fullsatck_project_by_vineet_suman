const express = require('express');
const { getContacts, deleteContact, addContact } = require('../controllers/contactController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getContacts);               // Get all contact submissions (protected)
router.post('/', addContact); // Add contact submission
router.delete('/:id', auth, deleteContact);       // Delete a contact submission by ID (protected)

module.exports = router;
