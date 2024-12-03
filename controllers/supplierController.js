// ./controllers/supplierController.js

class SupplierController{
  constructor(SupplierService){
    this.supplierService = SupplierService;
  }

  async createSupplier(req,res){
    const {email, productType, cnpj, password} = req.body;
    try{
      const newSupplier = await this.supplierService.create(email, productType, cnpj, password);
      res.status(200).json(newSupplier);
      res.send();
    }
    catch(error){
      res
        .status(500)
        .json({error: 'Ocorreu um erro ao gravar o novo fornecedor.'});
    }
  }

  async login(req,res){
    const {email, password} = req.body;
    try{
      const Supplier  = await this.supplierService.login(email, password);
      res.status(200).json(Supplier);
    }
    catch(error){
      res.status(500).json({error: 'Erro no login do fornecedor'});
    }
  }
}

module.exports = SupplierController;