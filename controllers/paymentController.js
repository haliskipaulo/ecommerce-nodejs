class paymentController {
  constructor(PaymentService) {
    this.PaymentService = PaymentService;
  }

  async pix(req, res) {
    try {
      const paymentResult = await this.PaymentService.pix(req.user.id);
      res.status(201).json(paymentResult);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async creditCard(req, res) {
    try {
      const paymentResult = await this.PaymentService.creditCard(req.user.id);
      res.status(201).json(paymentResult);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async viewTransaction(req, res) {
    try {
      const transaction = await this.PaymentService.viewTransaction(req.user.id, req.params.id);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = paymentController;