
const Sequelize = require('sequelize');

module.exports = (sequelize) =>{
  const Product = sequelize.define('Product', {
    id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name:{
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    description:{
      type: Sequelize.STRING,
      unique: false,
      allowNull: true
    },
    price:{
      type: Sequelize.DECIMAL(10, 2),
      unique: false,
      allowNull: false
    },
    stock:{
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false
    }
  });
  return Product;
};