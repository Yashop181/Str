// src/components/ProductsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './Csss/List.css'; // Import your external CSS file

const stripePromise = loadStripe(''); // Replace with your actual Stripe publishable key

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/products/all');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handlePay = async (productId) => {
    try {
      const res = await axios.post('http://localhost:8000/stripe/create-checkout-session', { productId });
      const { id } = res.data;
      window.location.href = id; // Ensure this is the correct URL from your backend
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
  

  return (
    <Elements stripe={stripePromise}>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="card">
            <img src={`http://localhost:8000/${product.imageUrl}`} alt={product.title} />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <button onClick={() => handlePay(product._id)}>Pay</button>
          </div>
        ))}
      </div>
    </Elements>
  );
};

export default ProductsList;
