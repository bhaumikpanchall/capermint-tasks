const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');

const categories = [
    { name: 'Electronics', subCategories: ['Mobile Phones', 'Laptops', 'Televisions'] },
    { name: 'Fashion', subCategories: ['Clothing', 'Footwear', 'Accessories'] },
    { name: 'Home Appliances', subCategories: ['Refrigerators', 'Washing Machines', 'Microwaves'] },
];

const products = [
    { name: 'iPhone 12', price: 999, category: null },
    { name: 'Samsung Galaxy S21', price: 799, category: null },
    { name: 'Dell XPS 13', price: 1099, category: null },
    { name: 'Nike Air Max', price: 150, category: null },
    { name: 'Adidas Ultraboost', price: 180, category: null },
];

const seedDatabase = async () => {
    try {
        await Category.deleteMany({});
        const createdCategories = await Category.insertMany(categories);

        products[0].category = createdCategories[0]._id;
        products[1].category = createdCategories[0]._id;
        products[2].category = createdCategories[0]._id;
        products[3].category = createdCategories[1]._id;
        products[4].category = createdCategories[1]._id;

        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Categories and products seeded successfully');
    } catch (error) {
        console.error('Seeding error', error);
    } finally {
        mongoose.connection.close();
    }
};

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        // await seedDatabase();
    } catch (err) {
        console.log("err=>", err)
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;
