import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProductsProvider from './context/ProductsContext.jsx'
import CartProvider from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <ProductsProvider>
    <CartProvider>

    <App />

    </CartProvider>
  </ProductsProvider>
)
