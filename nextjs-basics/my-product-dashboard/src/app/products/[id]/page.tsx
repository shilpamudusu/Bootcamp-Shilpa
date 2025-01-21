import React from 'react';
import products from '../../../data/products.json'; // Adjust path to products.json

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: boolean;
  image: string;
}

export default async function ProductDetails({ params }: { params: { id: string } }) {
  // Find product by ID
  const product = products.find((p: Product) => p.id.toString() === params.id);

  if (!product) {
    // If no product is found, handle the case
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>In stock: {product.stock ? 'Yes' : 'No'}</p>
      <img src={product.image} alt={product.name} />
    </div>
  );
}
