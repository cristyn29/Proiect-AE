const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

// Trebuie sÄƒ fii logat ca sÄƒ plasezi comenzi
router.post('/', authMiddleware, orderController.placeOrder);

// Istoricul comenzilor utilizatorului
router.get('/', authMiddleware, orderController.getUserOrders);

module.exports = router;
