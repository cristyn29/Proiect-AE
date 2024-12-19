import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance'; // Asigură-te că axiosInstance este corect configurat

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [chfRate, setChfRate] = useState(1); // Rata de conversie pentru CHF

  // Fetch produse din API
  const fetchProducts = async () => {
    try {
      let url = '/products';
      if (currency !== 'USD') {
        url = `/currency/${currency}`; // API-ul pentru conversie valutara
      }
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Obține rata de conversie pentru CHF
  const fetchChfRate = async () => {
    try {
      const response = await axios.get(`/currency/CHF`);
      setChfRate(response.data.conversionRate); // Actualizează rata de conversie pentru CHF
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (currency === 'CHF') {
      fetchChfRate(); // Dacă moneda aleasă este CHF, fetch rata de conversie
    }
  }, [currency]);

  const token = localStorage.getItem('token'); // Verificăm dacă utilizatorul este logat

  // Adăugare produs în coș
  const addToCart = async (productId) => {
    if (!token) {
      alert('Trebuie să fii logat pentru a adăuga în coș!');
      return;
    }
    try {
      await axios.post(
        '/cart',
        { product_id: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Produs adăugat în coș!');
    } catch (err) {
      console.error(err);
      alert('Eroare la adăugarea în coș.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Produse</h2>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label>Alege moneda: </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{
            padding: '5px',
            marginLeft: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CHF">CHF</option> {/* Adăugăm CHF */}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((prod) => {
          let priceToDisplay = prod.price;
          if (currency === 'CHF') {
            // Conversie pentru CHF
            priceToDisplay = prod.price_converted ? prod.price_converted : (prod.price * chfRate).toFixed(2);
          } else if (currency === 'EUR') {
            priceToDisplay = prod.price_converted;
          }

          return (
            <div
              key={prod.id}
              style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
              }}
            >
              <img
                src={prod.image_url || 'https://via.placeholder.com/150'}
                alt={prod.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease',
                }}
              />
              <h3 style={{ margin: '10px 0', fontSize: '18px', color: '#333' }}>{prod.name}</h3>
              <p style={{ fontSize: '16px', color: '#555' }}>
                {priceToDisplay} {currency}
              </p>
              <p style={{ color: prod.stock_quantity > 0 ? 'green' : 'red' }}>
                Stoc: {prod.stock_quantity > 0 ? prod.stock_quantity : 'Stoc epuizat'}
              </p>
              <p>
                <strong>Marime:</strong> {prod.size || 'N/A'}
              </p>
              {token && prod.stock_quantity > 0 && (
                <button
                  onClick={() => addToCart(prod.id)}
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Adaugă în coș
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsPage;
