const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
    const { billingAddress, deliveryAddress } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user });
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ msg: 'Cart is empty' });
        }

        const order = new Order({
            user: req.user,
            products: cart.products,
            billingAddress,
            deliveryAddress
        });

        await order.save();
        await Cart.deleteOne({ user: req.user });
        res.json({ msg: 'Order placed successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
