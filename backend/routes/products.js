// routes/products.js
const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), async (req, res) => {
  const { name, title, price } = req.body;
  const imageUrl = req.file.path;

  const product = new Product({ name, title, price, imageUrl });
  await product.save();

  res.send(product);
});

router.get('/all', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

module.exports = router;
