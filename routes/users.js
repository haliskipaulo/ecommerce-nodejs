var express = require('express');
var router = express.Router();

const auth = require('../auth');
const db = require('../models')

const UserService = require('../services/userService');
const UserController = require('../controllers/userController');
const userService = new UserService(db.User);
const userController = new UserController(userService);

router.get('/', function(req, res, next) {
  res.send('Módulo de usuários rodando.');
});

router.post('/register', async(req, res)=>{
  userController.createUser(req,res);
});

router.post('/login', async(req, res)=>{
  userController.login(req,res);
})

module.exports = router;
