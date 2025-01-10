import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

export default function Favorites() {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        favorites.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <button onClick={() => removeFromFavorites(product.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No favorite products yet.</p>
      )}
    </div>
  );
}
