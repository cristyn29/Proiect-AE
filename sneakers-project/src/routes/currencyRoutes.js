const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

// GET /api/currency/:currency
router.get('/:currency', currencyController.convertProductsPrice);

module.exports = router;
