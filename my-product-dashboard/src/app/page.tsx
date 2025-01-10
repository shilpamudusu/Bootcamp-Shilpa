// src/app/page.tsx
import React from 'react';
import products from '../data/products.json'; // Correct path to products.json
import Link from 'next/link';
import MyComponent from '../components/MyComponent';
import ProductList from '../components/ProductList';


const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Product Dashboard</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>${product.price}</span>
            <Link href={`/products/${product.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
