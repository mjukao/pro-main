import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRuter';
import './index.css';
import 'leaflet/dist/leaflet.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
