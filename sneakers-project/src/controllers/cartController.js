const { Cart, Product } = require('../models');

module.exports = {

  getCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const cartItems = await Cart.findAll({
        where: { user_id: userId },
        include: [Product] 
      });


      res.json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare la obtinerea cosului.' });
    }
  },


  addToCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const { product_id, quantity } = req.body;

      if (!product_id || !quantity || quantity <= 0) {
        return res.status(400).json({ error: 'ID produs si cantitate > 0 sunt obligatorii.' });
      }


      const product = await Product.findByPk(product_id);
      if (!product) {
        return res.status(404).json({ error: 'Produsul nu exista.' });
      }

   
      const cartItem = await Cart.findOne({ where: { user_id: userId, product_id } });

      if (cartItem) {

        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
      
        await Cart.create({ user_id: userId, product_id, quantity });
      }

      res.json({ message: 'Produs adaugat/actualizat in cos cu succes!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare la adaugarea in cos.' });
    }
  },


  updateCartItem: async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params; 
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Cantitatea trebuie sa fie > 0.' });
      }

      const cartItem = await Cart.findOne({ where: { id, user_id: userId } });
      if (!cartItem) {
        return res.status(404).json({ error: 'Produsul nu a fost gasit inn cosul tau.' });
      }

      cartItem.quantity = quantity;
      await cartItem.save();

      res.json({ message: 'Cantitate actualizata cu succes!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare la actualizarea produsului din coÈ™.' });
    }
  },


  removeCartItem: async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const cartItem = await Cart.findOne({ where: { id, user_id: userId } });
      if (!cartItem) {
        return res.status(404).json({ error: 'Produsul nu se gaseste Ã®n cosul tau.' });
      }

      await cartItem.destroy();
      res.json({ message: 'Produs sters din cos cu succes!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare la È™tergerea produsului din cos.' });
    }
  }
};
