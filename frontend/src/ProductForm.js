// components/ProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('image', image);

    await axios.post('http://localhost:8000/products/add', formData);
    
    alert('Product added successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br/>
      <br/>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <br/>
      <br/>
      <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <br/>
      <br/>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <br/>
      <br/>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
