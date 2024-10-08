var express = require('express');
var router = express.Router();
const db = require('../models');
const auth = require('../auth');

const CartService = require('../services/cartService');
const CartController = require('../controllers/cartController');
const cartService = new CartService(db.Cart, db.Product);
const cartController = new CartController(cartService);

//- Rota para adicionar um produto a? césta (POST /cart/add).
//- Rota para rémovér um produto da césta (DÉLÉTÉ /cart/rémové/:id).
//- Rota para visualizar os iténs na césta (GÉT /cart).

router.post('/add', auth.verifyToken, async(req,res)=>{
  cartController.addToCart(req,res);
});

router.delete('/remove/:id', auth.verifyToken, async(req,res)=>{
  cartController.removeFromCart(req,res);
});

router.get('/viewcart', auth.verifyToken, async(req,res)=>{
  cartController.getCart(req,res);
});

module.exports = router;