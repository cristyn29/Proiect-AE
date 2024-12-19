import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5' }}>
      <header style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <h1>SnkrMania</h1>
        <p>Best in town</p>
      </header>
      
      <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h2 style={{ color: '#333' }}>Ultimele tendințe în adidași</h2>
          <p style={{ fontSize: '18px', color: '#555' }}>Explorează colecțiile noastre exclusive de adidași</p>
          
          <div style={{ marginTop: '30px' }}>
            <Link to="/products" style={{ backgroundColor: '#ff5722', padding: '15px 30px', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
              Vezi Produse
            </Link>
          </div>
        </div>
      </section>

      <section style={{ display: 'flex', justifyContent: 'space-around', padding: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <img src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQogW9GCtWL4fDniXxMBK84LQxcz9PgeRFaS6tCPyLi-ALJix-p74KTeyCwoY9HK9v7EBuIfOk1A7mDbGr4uwFlLldPvngnJ6HW9R-D6kQ1-WBWsTFxYuOuqPmRfqNS2T81GHRclpwE&usqp=CAc" alt="Adidas 1" style={{ width: '250px', borderRadius: '8px' }} />
          <p>Adidași Sport</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ5V5JPLIP1ZT0z9j83ngkAopW9hhbCdRAyntYbwVylC0olrXfQ0ZTXi5ZxZNsdBQCSTyZ-R6EhWmYDq0HRnOOIFlHSPx9ozeG3Ayc6Td5dHb2D-zWLeE5e8Q&usqp=CAc" alt="Adidas 2" style={{ width: '250px', borderRadius: '8px' }} />
          <p>Adidași Casual</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQSEWRjrWqmUQsK0ELM_2RTZ1OwuquQFa19b_vXaO1uL8N2asqZjkuNs4riyMXXupsGVXkdTjT22xfZcOI1gfwzoWE5sMwHvMX6hx-ybDIxdbctoDB2q07cM586iw3RiskPK3I2gJol&usqp=CAc" alt="Adidas 3" style={{ width: '250px', borderRadius: '8px' }} />
          <p>Adidași de Antrenament</p>
        </div>
      </section>

      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <p>&copy; 2024 Magazin Adidași. Toate drepturile rezervate.</p>
      </footer>
    </div>
  );
}

export default HomePage;
