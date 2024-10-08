
const db = require('../models');

class ProductService{
  constructor(ProductModel){
    this.Product = ProductModel;
  }
  async create(name, description, price, stock){
    try {
      const newProduct = await this.Product.create({
        name: name,
        description: description,
        price: price,
        stock: stock
      });
      return newProduct? newProduct : null;
    }
    catch (error){
      throw error;
    }
  }
  async findAll(){
    try{
      const AllProducts = await this.Product.findAll();
      return AllProducts? AllProducts : null;
    }
    catch(error){
      throw error;
    }
  }

  async update(id, {name, description, price, stock}){
    try {
      await this.Product.update({
        name: name,
        description: description,
        price: price,
        stock: stock
      },
      {
        where: {id: id}
      });
    }
    catch (error){
      throw error;
    }
  }

  async delete(id){
    try {
      await this.Product.destroy({
        where: {id: id}
      });
    }
    catch (error){
      throw error;
    }
  }

}

module.exports = ProductService;