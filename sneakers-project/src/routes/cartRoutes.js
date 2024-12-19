const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

// Toate rutele necesitÄƒ autentificare (user logat)
router.get('/', authMiddleware, cartController.getCart);
router.post('/', authMiddleware, cartController.addToCart);
router.put('/:id', authMiddleware, cartController.updateCartItem);
router.delete('/:id', authMiddleware, cartController.removeCartItem);

module.exports = router;
