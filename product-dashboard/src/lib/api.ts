export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}

const products: Product[] = [
  { id: 1, name: "Product 1", price: 19.99, description: "This is product 1", stock: 10 },
  { id: 2, name: "Product 2", price: 29.99, description: "This is product 2", stock: 5 },
  { id: 3, name: "Product 3", price: 39.99, description: "This is product 3", stock: 15 },
];

export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return products;
}

export async function getProduct(id: number): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return products.find((p) => p.id === id);
}

