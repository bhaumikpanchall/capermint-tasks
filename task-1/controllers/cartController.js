const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        let cart = await Cart.findOne({ user: req.user });
        if (!cart) {
            cart = new Cart({ user: req.user, products: [] });
        }

        const existingProduct = cart.products.find(p => p.product.toString() === productId);
        if (existingProduct) {
            const totalQuantity = existingProduct.quantity + quantity;
            if (totalQuantity > product.quantity) {
                return res.status(400).json({ msg: `Only ${product.quantity} qty is available for this product` });
            }
            existingProduct.quantity = totalQuantity;
        } else {
            if (quantity > product.quantity) {
                return res.status(400).json({ msg: `Only ${product.quantity} qty is available for this product` });
            }
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user });
        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCartQuantity = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user });
        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        const existingProduct = cart.products.find(p => p.product.toString() === productId);
        if (!existingProduct) return res.status(404).json({ msg: 'Product not in cart' });

        if (quantity > product.quantity) {
            return res.status(400).json({ msg: `Only ${product.quantity} qty is available for this product` });
        }

        existingProduct.quantity = quantity;
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
