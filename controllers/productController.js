
class ProductController{
  constructor(ProductService){
    this.productService = ProductService;
  }

  async createProduct(req,res){
    const {name, description, price, stock} = req.body;
    try{
      const newProduct = await this.productService.create(name, description, price, stock);
      res.status(200).json(newProduct);
      res.send();
    }
    catch(error){
      res
        .status(500)
        .json({error: 'Ocorreu um erro ao gravar o novo produto.'});
    }
  }

  async findAllProducts(req,res){
    try{
      const AllProducts = await this.productService.findAll();
      res.status(200).json(AllProducts);
    }
    catch(error){
      res
        .status(500)
        .json({error: 'Ocorreu um erro ao localizar todos os produtos.'});
    }
  }

  async updateProduct(req,res){
    const {id} = req.params;
    const {name, description, price, stock} = req.body;
    try{
      await this.productService.update(id, {name, description, price, stock});
      res.status(200).json({message: 'Produto atualizado com sucesso.'});
    }
    catch(error){
      res
        .status(500)
        .json({error: 'Ocorreu um erro ao atualizar o produto.'});
    }
  }

  async deleteProduct(req,res){
    const {id} = req.params;
    try{
      await this.productService.delete(id);
      res.status(200).json({message: 'Produto deletado com sucesso.'});
    }
    catch(error){
      res
        .status(500)
        .json({error: 'Ocorreu um erro ao deletar o produto.'});
    }
  }
}

module.exports = ProductController;