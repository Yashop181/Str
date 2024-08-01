// backend/routes/stripe.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(''); // Replace with your actual Stripe secret key
const Product = require('../models/Product'); // Ensure the correct path to your Product model

router.post('/create-checkout-session', async (req, res) => {
  const { productId } = req.body;

  try {
    // Retrieve product details from your database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
        // Ensure the product price is at least $0.50
        if (product.price < 0.5) {
          return res.status(400).json({ error: 'Product price must be at least $0.50' });
        }
    const imageUrl = `http://localhost:8000/${product.imageUrl.replace(/\\/g, '/')}`;
    
    // Log the imageUrl for debugging
    console.log('Constructed image URL:', imageUrl);


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              images:[imageUrl], // Ensure correct image URL
            },
            unit_amount:  Math.round(product.price * 100), // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Your success URL
      cancel_url: 'http://localhost:3000/cancel', // Your cancel URL
    });

    res.json({ id: session.url }); // Ensure this returns the session URL
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
