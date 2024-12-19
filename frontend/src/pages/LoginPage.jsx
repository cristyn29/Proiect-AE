import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
    
      const response = await axios.post('/users/login', { email, password });
      const { token } = response.data;

      if (token) {
        
        const decoded = jwtDecode(token);
        const userRole = decoded.type;

       
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);

        alert('Logare reușită!');

       
        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/products');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Credențiale invalide sau eroare server');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Logare</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)} 
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Parola:</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)} 
              style={styles.input}
              required
            />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    textAlign: 'left',
    color: '#555',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
    marginBottom: '5px',
    outline: 'none',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    fontSize: '12px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default LoginPage;
