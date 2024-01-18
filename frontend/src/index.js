import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SqlContextProvider}from "./context/SqlMetodos";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <SqlContextProvider>
      <App />
    </SqlContextProvider>
    
  </React.StrictMode>
);


