// ./services/supplierService.js

const auth = require('../auth');
const bcrypt = require('bcrypt');
var round_salts = 10;

const db = require('../models');
const { where } = require('sequelize');

class SupplierService{
  constructor(SupplierModel){
    this.Supplier = SupplierModel;
  }

  async create(email, productType, cnpj, password){
    try{
      const hashpassword = await bcrypt.hash(password, parseInt(round_salts));
      const newSupplier = await this.Supplier.create({
        email:email,
        productType:productType,
        cnpj:cnpj,
        password:hashpassword
      });
      return newSupplier? newSupplier : null;
      
    }
    catch (error){
      throw error;
    }
  }

  async login(email, password){
    try {
      const Supplier = await this.Supplier.findOne({
        where : {email}
      });

      if(Supplier){
        if(bcrypt.compare(password, Supplier.password)){
          const token = await auth.generateToken(Supplier);
            Supplier.dataValues.Token = token;
            Supplier.dataValues.password = '';
        }
        else{
          throw new Error('Senha incorreta');
        }
      }
      return Supplier? Supplier : null;
    } catch (error) {
      throw error;
    }

  }
}

module.exports = SupplierService;