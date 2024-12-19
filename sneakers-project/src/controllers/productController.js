const { Product } = require('../models');

module.exports = {
  // GET /api/products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare server la obținerea produselor.' });
    }
  },

  // POST /api/products (admin required)
  createProduct: async (req, res) => {
    try {
      const { name, price, size, image_url, stock_quantity } = req.body;

      if (!name || !price || !size) {
        return res.status(400).json({ error: 'Nume, preț și mărime sunt obligatorii.' });
      }

      const newProduct = await Product.create({
        name,
        price,
        size,
        image_url: image_url || null,
        stock_quantity: stock_quantity || 0
      });

      res.status(201).json({ message: 'Produs creat cu succes!', product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare server la crearea produsului.' });
    }
  },

  // PUT /api/products/:id (admin required)
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, size, image_url, stock_quantity } = req.body;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Produsul nu există.' });
      }

      product.name = name || product.name;
      product.price = price || product.price;
      product.size = size || product.size;
      product.image_url = image_url || product.image_url;
      product.stock_quantity = stock_quantity !== undefined ? stock_quantity : product.stock_quantity;

      await product.save();
      res.json({ message: 'Produs actualizat cu succes!', product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare server la actualizarea produsului.' });
    }
  },

  // DELETE /api/products/:id (admin required)
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
  
      console.log("Ștergerea produsului cu ID:", id); // Logare ID produs
  
      // Găsim produsul în baza de date
      const product = await Product.findByPk(id);
      
      if (!product) {
        return res.status(404).json({ error: 'Produsul nu există.' });
      }
  
      console.log("Produs găsit:", product); // Verifică detalii despre produs
  
      // Ștergem produsul
      await product.destroy();
      console.log("Produs șters cu succes."); // Confirmă că a fost șters
  
      res.json({ message: 'Produs șters cu succes!' });
    } catch (error) {
      console.error("Eroare la ștergerea produsului:", error); // Logare eroare
      res.status(500).json({ error: 'Eroare server la ștergerea produsului.' });
    }
  }
  
};
