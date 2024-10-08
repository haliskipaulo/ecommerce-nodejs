const db = require('../models');

class PaymentService{
  constructor(PaymentModel, CartModel, ProductModel){
    this.Payment = PaymentModel;
    this.Cart = CartModel;
    this.Product = ProductModel;
  }

  async confirmedPayment(userId){
    try {
      const cart = await this.Cart.findOne({ where: { userId } });
      for (const item of cart.items) {
      const product = await this.Product.findByPk(item.productId);
      product.stock -= item.quantity;
      await product.save();
      }


      await this.Cart.destroy({ where: { userId } });
    } catch (error) {
      throw error;
    }
  }

  async pix(UserId){
    try{
      const cart = await this.Cart.findOne({where: {userId}});
      
      const paymentResult = await this.Payment.create({
        userId: UserId,
        totalPrice: cart.totalPrice,
        paymentMethod: 'pix',
        status: 'confirmed'
      });

      await this.confirmedPayment(UserId);

      return paymentResult;

    } catch(error){
      throw error;
    }
  }

  async creditCard(UserId){
    try{
      const cart = await this.Cart.findOne({where: {userId}});
      
      const paymentResult = await this.Payment.create({
        userId: UserId,
        totalPrice: cart.totalPrice,
        paymentMethod: 'creditCard',
        status: 'confirmed'
      });

      await this.confirmedPayment(UserId);

      return paymentResult;

    } catch(error){
      throw error;
    }
  }

  async viewTransaction(UserId, transactionId){
    try{
      const transaction = await this.Payment.findOne({where: {userId: UserId, id: transactionId}});
      return transaction;
    } catch(error){
      throw error;
    }
  }
}

module.exports = PaymentService;