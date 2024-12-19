import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance'; // Asigură-te că axiosInstance este corect configurat

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  // Funcție pentru a obține comenzile utilizatorului
  const fetchOrders = async () => {
    if (!token) {
      setError('Trebuie să fii logat pentru a vizualiza comenzile.');
      return;
    }

    try {
      const response = await axios.get('/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.error(err);
      setError('Eroare la obținerea comenzilor.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Istoricul comenzilor</h2>
      {error && <div style={styles.error}>{error}</div>}

      {orders.length === 0 ? (
        <p>Nu ai nicio comandă încă.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={order.id} style={styles.orderItem}>
              <h3>Comanda #{index + 1}</h3> {/* Comanda numerotată */}
              <p><strong>Total:</strong> {order.total_price} USD</p>
              <ul style={styles.orderDetailsList}>
                {order.OrderDetails.map((orderDetail) => (
                  <li key={orderDetail.id}>
                    {/* Verificare pentru produsul null */}
                    {orderDetail.Product ? (
                      <>
                        <strong>{orderDetail.Product.name}</strong> - {orderDetail.quantity} x {orderDetail.price_per_unit} USD
                      </>
                    ) : (
                      <span>Produs momentan indisponibil</span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  },
  orderItem: {
    marginBottom: '25px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  orderDetailsList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
};

export default OrdersPage;
