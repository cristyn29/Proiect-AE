const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderDetail = sequelize.define('OrderDetail', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price_per_unit: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'order_details',
  timestamps: false
});

module.exports = OrderDetail;
