const { Cart, Product, Order, OrderDetail, User } = require('../models');
const { sendConfirmationEmail } = require('../utils/mail');

module.exports = {

  placeOrder: async (req, res) => {
    const userId = req.user.id;

    try {

      const cartItems = await Cart.findAll({
        where: { user_id: userId },
        include: [Product]
      });

      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'Coșul este gol. Adaugă produse înainte de a plasa o comandă.' });
      }


      let total = 0;
      for (const item of cartItems) {
        const product = item.Product;
        if (product.stock_quantity < item.quantity) {
          return res.status(400).json({ 
            error: `Produsul ${product.name} nu are destul stoc (disponibil: ${product.stock_quantity}).`
          });
        }
        total += parseFloat(product.price) * item.quantity;
      }


      const newOrder = await Order.create({
        user_id: userId,
        total_price: total,
        status: 'in_process' 
      });

    
      for (const item of cartItems) {
        const product = item.Product;

        await OrderDetail.create({
          order_id: newOrder.id,
          product_id: product.id,
          quantity: item.quantity,
          price_per_unit: product.price
        });

        product.stock_quantity = product.stock_quantity - item.quantity;
        await product.save();
      }

   //2
      await Cart.destroy({ where: { user_id: userId } });

   
      const user = await User.findByPk(userId);
      if (user) {
        const subject = 'Confirmare Comandă - Sneakers Shop';
        const text = `Salut ${user.username},\n\nComanda ta cu ID ${newOrder.id} a fost plasată cu succes!\nTotal: ${total}\n\nMulțumim că ai cumpărat de la noi!`;
        await sendConfirmationEmail(user.email, subject, text);
      }

      res.json({ message: 'Comanda a fost plasată cu succes!', order_id: newOrder.id, total_price: total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare la plasarea comenzii.' });
    }
  },


  getUserOrders: async (req, res) => {
    const userId = req.user.id;
    try {
      const orders = await Order.findAll({
        where: { user_id: userId },
        include: [{ model: OrderDetail, include: [Product] }]
      });
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare la obținerea comenzilor.' });
    }
  }
};
