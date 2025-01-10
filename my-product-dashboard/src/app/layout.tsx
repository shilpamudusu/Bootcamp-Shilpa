// src/app/layout.tsx
import React from 'react';
import { FavoritesProvider } from '../context/FavoritesContext';
import MyComponent from '../components/MyComponent'; // Make sure MyComponent is correctly imported

// This is the root layout for the app
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // Wrap everything with <html> and <body> tags
    <html lang="en">
      <body>
        <FavoritesProvider>
          <div>
            <MyComponent />
            {/* Render the page component (children will be injected here) */}
            {children}
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}
