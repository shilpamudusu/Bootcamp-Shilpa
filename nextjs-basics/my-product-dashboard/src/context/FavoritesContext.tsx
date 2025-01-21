// src/context/FavoritesContext.tsx
'use client';
import React, { createContext, useContext, useState } from 'react';

// Define the Product type
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: boolean;
  image: string;
}

// Define the shape of the context state
interface FavoritesContextType {
  favorites: Product[]; // Array of products in the favorites
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>; // Setter function for favorites
}

// Create a context with a default value of an empty array
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider component to wrap around your app and provide the context
export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to access the context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
