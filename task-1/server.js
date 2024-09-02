const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api', require('./routes/profileRoutes.js'));
app.use('/api', require('./routes/productRoutes.js'));
app.use('/api', require('./routes/categoryRoutes.js'));
app.use('/api', require('./routes/cartRoutes.js'));
app.use('/api', require('./routes/orderRoutes.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
