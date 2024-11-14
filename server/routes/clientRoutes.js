const express = require('express');
const { createClient, getClients, updateClient, deleteClient, uploadImage } = require('../controllers/clientController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, uploadImage, createClient);       // Create a client (protected)
router.get('/', getClients);          // Get all clients (protected)
router.put('/:id', auth, uploadImage, updateClient);     // Update a client by ID (protected)
router.delete('/:id', auth, deleteClient);  // Delete a client by ID (protected)

module.exports = router;