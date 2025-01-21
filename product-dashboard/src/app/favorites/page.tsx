"use client";

import { useFavoriteStore } from "@/store/favoriteStore";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavoriteStore();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <div className="mt-4 space-x-2">
                <Link
                  href={`/products/${product.id}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Details
                </Link>
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

