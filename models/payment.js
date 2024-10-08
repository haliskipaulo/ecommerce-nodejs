const Sequelize = require('sequelize');
module.exports = (sequelize) =>{
  const Payment = sequelize.define('Payment',{
    id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey:true
    },
    userId:{
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:'Users',
        key:'id'
      }
    },
    totalPrice:{
      type: Sequelize.DECIMAL(10,2),
      allowNull:false,
      defaultValue:0.00
    },
    paymentMethod:{
      type: Sequelize.STRING,
      allowNull:false
    },
    status:{
      type: Sequelize.STRING,
      allowNull:false,
      defaultValue:'pending'
    }
  });
  return Payment;
};
