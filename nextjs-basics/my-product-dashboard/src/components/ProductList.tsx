// src/components/ProductList.tsx

import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 w-full sm:w-1/2 md:w-1/3 box-border"
        >
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
