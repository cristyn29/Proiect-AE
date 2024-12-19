const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  total_price: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  order_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('in_process', 'completed', 'canceled'),
    allowNull: false,
    defaultValue: 'in_process'
  }
}, {
  tableName: 'orders',
  timestamps: false
});

module.exports = Order;
