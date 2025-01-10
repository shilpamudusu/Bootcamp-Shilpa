import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface FavoriteStore {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (product) =>
        set((state) => ({
          favorites: [...state.favorites, product],
        })),
      removeFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== productId),
        })),
    }),
    {
      name: 'favorite-storage',
    }
  )
);

