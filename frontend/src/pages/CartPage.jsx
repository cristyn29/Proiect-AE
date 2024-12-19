import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // Lista produselor din coș
  const [loading, setLoading] = useState(true);   // Indicator de încărcare
  const [error, setError] = useState('');         // Mesaj pentru erori
  const [orderMessage, setOrderMessage] = useState(''); // Mesaj după plasarea comenzii

  // Funcție pentru încărcarea produselor din coș
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data);
    } catch (err) {
      setError('Eroare la încărcarea coșului.');
    } finally {
      setLoading(false);
    }
  };

  // Funcție pentru ștergerea unui produs din coș
  const handleRemoveFromCart = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      setError('Eroare la ștergerea produsului.');
    }
  };

  // Funcție pentru plasarea comenzii
  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3001/api/orders',
        {}, // Body gol pentru că datele sunt preluate din token
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrderMessage(response.data.message); // Setează mesajul de succes
      setCartItems([]); // Golește coșul din UI
    } catch (err) {
      setError('Eroare la plasarea comenzii.');
    }
  };

  // Încarcă produsele din coș la montarea componentei
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Afișează indicatorul de încărcare sau erorile
  if (loading) return <p>Se încarcă...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Coșul de Cumpărături</h1>
      {orderMessage && <p style={styles.successMessage}>{orderMessage}</p>}
      {cartItems.length === 0 ? (
        <p>Coșul este gol.</p>
      ) : (
        <div>
          <ul style={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} style={styles.cartItem}>
                <div style={styles.productInfo}>
                  <strong>{item.Product.name}</strong> - {item.Product.price} USD - Cantitate: {item.quantity}
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  style={styles.removeButton}
                >
                  Șterge
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handlePlaceOrder}
            style={styles.placeOrderButton}
          >
            Plasează Comanda
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '20px',
  },
  cartList: {
    listStyleType: 'none',
    padding: '0',
  },
  cartItem: {
    marginBottom: '15px',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    fontSize: '16px',
    color: '#333',
  },
  removeButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 15px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  placeOrderButton: {
    marginTop: '20px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    width: '100%',
  },
  successMessage: {
    color: 'green',
    fontSize: '16px',
    marginBottom: '20px',
  },
};

export default Cart;
