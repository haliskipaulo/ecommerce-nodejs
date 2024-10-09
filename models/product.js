const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const Product = sequelize.define('Product',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        name:{
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        price:{
            type: Sequelize.FLOAT,
            unique: false,
            allowNull: false
        },
        description:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: true
        },
        stock:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull: false
        }
    });
    return Product;
}
