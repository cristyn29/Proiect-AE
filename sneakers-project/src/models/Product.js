const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false
  },
  size: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  image_url: {
    type: DataTypes.TEXT
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;
