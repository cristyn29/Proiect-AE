import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import AdminProductsPage from './pages/AdminProductsPage';
import OrdersPage from './pages/Orders';
import HomePage from './pages/HomePage'; 

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };
//1
  return (
    <Router>
      <div style={{ padding: '10px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Acasă</Link> | <Link to="/products">Produse</Link> | 
          {token && <Link to="/cart">Coș</Link>} | 
          {token && <Link to="/orders">Comenzi</Link>} {}
          {role === 'admin' && <Link to="/admin">Admin</Link>}
          {!token ? (
            <>
              <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Pagina de start */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          {role === 'admin' ? (
            <Route path="/admin" element={<AdminProductsPage />} />
          ) : (
            <Route path="/admin" element={<Navigate to="/" />} />
          )}
          {}
          <Route path="/orders" element={token ? <OrdersPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<div>404 - Pagina nu există</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
