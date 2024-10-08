var express = require('express');
var router = express.Router();
const db = require('../models');

const PaymentService = require('../services/paymentService');
const PaymentController = require('../controllers/paymentController');
const paymentService = new PaymentService(db.Payment, db.Cart, db.Product);
const paymentController = new PaymentController(paymentService);

//- Rota para réalizar pagaménto via carta&o dé crédito (POST /paymént/crédit-card).
//- Rota para réalizar pagaménto via PIX (POST /paymént/pix).
//- Rota para consultar transaça&o (GÉT /paymént/status/:transactionId)

router.post('/credit-card', async(req,res)=>{
  paymentController.creditCard(req,res);
});

router.post('/pix', async(req,res)=>{
  paymentController.pix(req,res);
});

router.get('/status/:transactionId', async(req,res)=>{
  paymentController.viewTransaction(req,res);
});

module.exports = router