class CartController {
  constructor(CartService) {
      this.cartService = CartService;
  }

  async addToCart(req, res) {
    try {
      const { userId, product, quantity } = req.body;

      if (!userId || !product || !quantity) {
        return res.status(400).json({ message: "Campos obrigatórios: userId, product, quantity" });
      }

      const cart = await this.cartService.addToCart(userId, product, quantity);

      res.status(200).json(cart);
    } catch (error) {
      console.error("Erro no controller:", error.message);
      res.status(400).json({ message: error.message || "Ocorreu um erro ao adicionar ao carrinho" });
    }
  }

  async removeFromCart(req, res) {
    try {
      const userId = req.user.id;
      const productId = req.params.productId;

      if (!userId || !productId) {
        return res.status(400).json({ message: "Campos obrigatórios: userId, productId" });
      }

      const cart = await this.cartService.removeFromCart(userId, productId);
      res.status(200).json(cart);
    } catch (error) {
      console.error("Erro no controller:", error.message);
      res.status(400).json({ message: error.message || 'Ocorreu um erro ao remover o item' });
    }
  }

  async getCart(req, res) {
    const userId = req.user.id;

    try {
        const cart = await this.cartService.getCart(userId); // changed from cartService to this.cartService
        if (!cart) {
            return res.status(404).json({ message: 'Carrinho não encontrado' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  } 
}
module.exports = CartController;