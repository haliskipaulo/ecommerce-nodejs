const db = require('../models');

class CartService {
  constructor(CartModel, ProductModel) {
    this.Cart = CartModel;
    this.Product = ProductModel;
  }

  async addToCart(userId, productName, quantity){
    try {
      const product = await this.Product.findOne({ where: { name: productName } });
      if (!product) {
        throw new Error('Produto não encontrado');
      }

      if(product.stock < quantity){ // changed from quantity to newItem.quantity
        throw new Error('O estoque não é suficiente');
      }

      let cart = await this.Cart.findOne({ where: {userId} });

      if(!cart){
        cart = await this.Cart.create({ userId, items: [], totalPrice: 0.00 });
      }

      const items = cart.items || [];
      const existingItemIndex = items.findIndex(item => item.productId === product.id);

      if (existingItemIndex >= 0) {
        items[existingItemIndex].quantity += quantity;
      } else {
        items.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
      }

      console.log("Items before save:", items);
      const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

      cart.items = items;
      cart.totalPrice = totalPrice;
      await cart.save();
      console.log("Cart updated:", cart)
      return cart;
    }
    catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error.message);
      throw new Error(error.message || 'Não foi possível adicionar o item ao carrinho');
    }
    
  }

  async removeFromCart(userId, productId){
    try{
      const cart = await this.Cart.findOne({ where: {userId} });
      if(!cart){
        throw new Error('Carrinho não encontrado');
      }

      const items = cart.items || [];
      const existingItemIndex = items.findIndex(item => item.productId === productId);

      if (existingItemIndex >= 0) {
        items.splice(existingItemIndex, 1);
      }
      else {
        throw new Error('Item não encontrado no carrinho');
      }

      const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

      cart.items = items;
      cart.totalPrice = totalPrice;
      await cart.save();

      return cart;
    }
    catch{
      throw new Error('Não foi possível remover o item do carrinho');
    }
  }

  async getCart(userId){
    try{
      const cart = await this.Cart.findOne({ where: {userId} });
      if(!cart){
        throw new Error('Carrinho não encontrado');
      }
      return cart;
    }
    catch{
      throw new Error('Não foi possível obter o carrinho');
    }
  }
}
module.exports = CartService;