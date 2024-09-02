const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/order', auth, placeOrder);
router.get('/orders', auth, getOrders);

module.exports = router;
