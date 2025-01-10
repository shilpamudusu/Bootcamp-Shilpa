"use client";

import Link from "next/link";
import { useFavoriteStore } from "@/store/favoriteStore";

export default function Navbar() {
  const favoriteCount = useFavoriteStore((state) => state.favorites.length);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Product Dashboard
        </Link>
        <div className="space-x-4">
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/favorites" className="hover:underline">
            Favorites ({favoriteCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}

