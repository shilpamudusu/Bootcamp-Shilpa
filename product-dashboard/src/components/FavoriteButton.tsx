"use client";

import { useFavoriteStore } from "@/store/favoriteStore";
import { Product } from "@/lib/api";

export default function FavoriteButton({ product }: { product: Product }) {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const isFavorite = favorites.some((p) => p.id === product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-4 py-2 rounded ${
        isFavorite
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white`}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}

