
const Sequelize = require('sequelize');

module.exports = (sequelize) =>{
  const Cart = sequelize.define('Cart', {
    id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    items:{
      type: Sequelize.JSON,
      allowNull: false,
      unique: false
    },
    totalPrice:{
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      unique: false,
      defaultValue: 0.00
    }
  });

  return Cart;
};