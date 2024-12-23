import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure you have this file or comment out the line if it's not available
import App from './App'; // Ensure you have this component or create it

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
