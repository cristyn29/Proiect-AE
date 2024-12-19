const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const Order = require('./Order');
const OrderDetail = require('./OrderDetail');

// Relații între modele

// User - Cart: un user poate avea multiple intrări în cart
User.hasMany(Cart, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

// Product - Cart: fiecare intrare în cart aparține unui produs
Product.hasMany(Cart, { foreignKey: 'product_id' });
Cart.belongsTo(Product, { foreignKey: 'product_id' });

// User - Order: un user poate avea multiple comenzi
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Order - OrderDetail: o comandă poate avea multiple detalii
Order.hasMany(OrderDetail, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });

// Product - OrderDetail: fiecare detaliu de comandă se referă la un produs
Product.hasMany(OrderDetail, { foreignKey: 'product_id' });
OrderDetail.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  Order,
  OrderDetail
};
