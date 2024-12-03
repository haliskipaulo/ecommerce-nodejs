// models/supplier.js
const Sequelize = require('sequelize');
module.exports = (sequelize) =>{
  const Supplier = sequelize.define('Supplier',{
    id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey:true
    },
    email:{
      type: Sequelize.STRING,
      allowNull:false
    },
    productType:{
      type: Sequelize.STRING,
      allowNull:false
    },
    cnpj:{
      type: Sequelize.STRING,
      allowNull:false
    },
    password:{
      type: Sequelize.STRING,
      allowNull:false
    }
  });
  return Supplier;
};