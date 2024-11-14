const express = require('express');
const { login, logout } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', login);
router.post('/logout', auth, logout); // Protected logout route

module.exports = router;
