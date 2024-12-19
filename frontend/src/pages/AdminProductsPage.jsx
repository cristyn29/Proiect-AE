import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // Produsul selectat pentru editare
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    size: '',  // Adăugăm mărimea
    image_url: '',  // Adăugăm câmpul pentru imagine (opțional)
    stock_quantity: 0,
  });
  const token = localStorage.getItem('token');

  // Fetch produse din baza de date
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Adăugare sau actualizare produs
  const handleSubmit = async () => {
    // Verificare că toate câmpurile sunt completate
    if (!productForm.name || !productForm.price || !productForm.size || !productForm.stock_quantity) {
      alert('Te rugăm să completezi toate câmpurile!');
      return;
    }

    // Verificare că prețul și stocul sunt numere valide
    if (isNaN(productForm.price) || isNaN(productForm.stock_quantity)) {
      alert('Prețul și stocul trebuie să fie numere valide!');
      return;
    }

    try {
      if (editProduct) {
        // Actualizare produs
        await axios.put(
          `/products/${editProduct.id}`,
          productForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Produs actualizat cu succes!');
      } else {
        // Adăugare produs nou
        await axios.post(
          '/products',
          productForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Produs adăugat cu succes!');
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Eroare la salvarea produsului!');
    }
  };

  // Ștergere produs
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      alert('Produs șters cu succes!');
    } catch (err) {
      console.error(err);
      alert('Eroare la ștergerea produsului!');
    }
  };

  // Setare formular pentru editare
  const handleEdit = (product) => {
    setEditProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      size: product.size,  // Setăm și mărimea
      image_url: product.image_url || '',  // Setăm și imaginea (opțional)
      stock_quantity: product.stock_quantity,
    });
  };

  // Resetare formular
  const resetForm = () => {
    setEditProduct(null);
    setProductForm({ name: '', price: '', size: '', image_url: '', stock_quantity: 0 });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestionare Produse (Admin)</h2>

      {/* Formular Adăugare/Modificare Produs */}
      <div style={{ marginBottom: '20px' }}>
        <h3>{editProduct ? 'Modifică Produs' : 'Adaugă Produs'}</h3>
        <input
          type="text"
          placeholder="Nume produs"
          value={productForm.name}
          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preț"
          value={productForm.price}
          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mărime"
          value={productForm.size}
          onChange={(e) => setProductForm({ ...productForm, size: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL Imagine (opțional)"
          value={productForm.image_url}
          onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stoc"
          value={productForm.stock_quantity}
          onChange={(e) => setProductForm({ ...productForm, stock_quantity: e.target.value })}
        />
        <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>
          {editProduct ? 'Actualizează' : 'Adaugă'}
        </button>
        {editProduct && <button onClick={resetForm} style={{ marginLeft: '10px' }}>Anulează</button>}
      </div>

      {/* Lista de Produse */}
      <h3>Lista Produse</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nume</th>
            <th>Preț</th>
            <th>Mărime</th>
            <th>Stoc</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>{prod.price} USD</td>
              <td>{prod.size}</td>
              <td>{prod.stock_quantity}</td>
              <td>
                <button onClick={() => handleEdit(prod)} style={{ marginRight: '10px' }}>Editează</button>
                <button onClick={() => deleteProduct(prod.id)} style={{ color: 'red' }}>Șterge</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductsPage;
