// ./routes/suppliers.js
var express = require('express');
var router = express.Router();
const auth = require('../auth'); 

const db = require('../models');

const SupplierService = require('../services/supplierService');
const SupplierController = require('../controllers/supplierController');

const supplierService = new SupplierService(db.Supplier);
const supplierController = new SupplierController(supplierService);

router.get('/', function(req, res, next) {
  res.send('Fornecedores rodando');
});

router.post('/login', auth.verifyToken, async(req,res)=>{
  supplierController.login(req,res);
});

router.post('/newsupplier', async (req,res)=>{
  supplierController.createSupplier(req,res);
});

module.exports = router;