var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sequelize = require('./models').sequelize;
var User = require('./models/user').sequelize;
var Product = require('./models/product').sequelize;

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products')
var paymentsRouter = require('./routes/payments')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);


const db = require('./models');

async function applyDataStructure(){
    await db.sequelize.sync({alter: true});
}

applyDataStructure();

var port = 8080;
app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
