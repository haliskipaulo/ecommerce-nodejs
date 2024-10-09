var express = require('express');
var router = express.Router();

const auth = require('../auth');
const db = require('../models')

const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');
const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

router.post('/new', async(req, res)=>{
    productController.createProduct(req, res);
});

router.get('/get', async(req,res)=>{
    productController.getAllProducts(req, res);
})

router.put('/update/:id', async(req,res)=>{
    productController.updateProduct(req, res);
})

router.delete('/delete/:id', async(req, res)=>{
    productController.deleteProduct(req, res);
})

module.exports = router;