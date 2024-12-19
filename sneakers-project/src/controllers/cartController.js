const { Cart, Product } = require('../models');

module.exports = {
  // GET /api/cart
  getCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const cartItems = await Cart.findAll({
        where: { user_id: userId },
        include: [Product] // include detaliile produselor
      });

      // cartItems va fi o listÄƒ de obiecte Cart, cu field Product.
      res.json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare la obÈ›inerea coÈ™ului.' });
    }
  },

  // POST /api/cart
  addToCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const { product_id, quantity } = req.body;

      if (!product_id || !quantity || quantity <= 0) {
        return res.status(400).json({ error: 'ID produs È™i cantitate > 0 sunt obligatorii.' });
      }

      // VerificÄƒm dacÄƒ produsul existÄƒ
      const product = await Product.findByPk(product_id);
      if (!product) {
        return res.status(404).json({ error: 'Produsul nu existÄƒ.' });
      }

      // VerificÄƒm dacÄƒ existÄƒ deja Ã®n coÈ™
      const cartItem = await Cart.findOne({ where: { user_id: userId, product_id } });

      if (cartItem) {
        // DacÄƒ existÄƒ, actualizÄƒm cantitatea
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        // DacÄƒ nu existÄƒ, Ã®l creÄƒm
        await Cart.create({ user_id: userId, product_id, quantity });
      }

      res.json({ message: 'Produs adÄƒugat/actualizat Ã®n coÈ™ cu succes!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare la adÄƒugarea Ã®n coÈ™.' });
    }
  },

  // PUT /api/cart/:id
  updateCartItem: async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params; // id-ul Ã®nregistrÄƒrii din cart
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Cantitatea trebuie sÄƒ fie > 0.' });
      }

      const cartItem = await Cart.findOne({ where: { id, user_id: userId } });
      if (!cartItem) {
        return res.status(404).json({ error: 'Produsul nu a fost gÄƒsit Ã®n coÈ™ul tÄƒu.' });
      }

      cartItem.quantity = quantity;
      await cartItem.save();

      res.json({ message: 'Cantitate actualizatÄƒ cu succes!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare la actualizarea produsului din coÈ™.' });
    }
  },

  // DELETE /api/cart/:id
  removeCartItem: async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const cartItem = await Cart.findOne({ where: { id, user_id: userId } });
      if (!cartItem) {
        return res.status(404).json({ error: 'Produsul nu se gÄƒseÈ™te Ã®n coÈ™ul tÄƒu.' });
      }

      await cartItem.destroy();
      res.json({ message: 'Produs È™ters din coÈ™ cu succes!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare la È™tergerea produsului din coÈ™.' });
    }
  }
};
