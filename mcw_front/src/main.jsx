import React from 'react'; // React est nécessaire pour JSX, même si tu n'appelles pas React.StrictMode
import ReactDOM from 'react-dom/client'; // Importe createRoot depuis react-dom/client
import App from './App.jsx'; // Importe ton composant App
import './index.css'; // Ton CSS global

// Crée la racine de rendu et rend ton composant App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);