import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail]   = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]   = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('/users/register', { username, email, password });
      if (response.data.message) {
        setMessage('Înregistrare reușită! Te poți loga acum.');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Eroare la înregistrare.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Înregistrare</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username: </label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)} 
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email: </label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)} 
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Parola: </label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              style={styles.input}
              required
            />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          {message && <div style={styles.success}>{message}</div>}
          <button type="submit" style={styles.button}>Înregistrează-te</button>
        </form>
        <button onClick={() => navigate('/login')} style={styles.linkButton}>Mergi la Login</button>
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
  success: {
    color: 'green',
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
  linkButton: {
    marginTop: '10px',
    backgroundColor: 'transparent',
    color: '#007bff',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default RegisterPage;
