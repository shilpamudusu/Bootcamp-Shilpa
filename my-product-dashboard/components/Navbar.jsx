import Link from 'next/link';
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

export default function Navbar() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <nav>
      <Link href="/products">Products</Link>
      <Link href="/favorites">Favorites ({favorites.length})</Link>
    </nav>
  );
}
