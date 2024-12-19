const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth'); // Ã®l creÄƒm imediat

// Rute publice
router.post('/register', userController.register);
router.post('/login', userController.login);

// RutÄƒ protejatÄƒ pentru profilul utilizatorului
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
