const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    const { minPrice, maxPrice, category, search, sort } = req.query;

    try {
        let query = {};
        if (minPrice) query.price = { $gte: minPrice };
        if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
        if (category) query.category = category;
        if (search) query.name = { $regex: search, $options: 'i' };

        let products = await Product.find(query).populate('category');

        if (sort) {
            const sortOptions = {
                'name-asc': { name: 1 },
                'name-desc': { name: -1 },
                'date-asc': { createdAt: 1 },
                'date-desc': { createdAt: -1 },
                'price-asc': { price: 1 },
                'price-desc': { price: -1 }
            };
            products = await Product.find(query)
                .populate('category')
                .sort(sortOptions[sort]);
        }

        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
