import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18+ import
import App from './App';  // Import your App component

// Use ReactDOM.createRoot for React 18+
const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
