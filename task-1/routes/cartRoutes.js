const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, updateCartQuantity } = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.post('/cart', auth, addToCart);
router.delete('/cart', auth, removeFromCart);
router.put('/cart', auth, updateCartQuantity);

module.exports = router;
