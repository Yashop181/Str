// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');
const stripeRoutes = require('./routes/stripe');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/products', productRoutes);
app.use('/stripe', stripeRoutes);

mongoose.connect('mongodb://127.0.0.1/your_database')

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))