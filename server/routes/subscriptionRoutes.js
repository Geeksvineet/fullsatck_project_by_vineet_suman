const express = require('express');
const { getSubscriptions, deleteSubscription, addSubscription } = require('../controllers/subscriptionController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getSubscriptions);               // Get all subscriptions (protected)
router.delete('/:id', auth, deleteSubscription);       // Delete a subscription by ID (protected)
router.post('/', addSubscription); // Add contact submission

module.exports = router;
