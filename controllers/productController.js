class ProductController{
    constructor(UserService){
        this.userService = UserService;
    }

    async createProduct(req, res){
        const {name, price, description, stock} = req.body;

        try{
            await createProductSVC(name, price, description, stock);
            res.status(200).json({message: "Produto criado"});
        } catch(err) {
            res.status(500).json({message: "Erro ao criar produto"});
        }
    }

    async getAllProducts(req, res){
        try{
            const allProducts = await getAllProductsSVC();
            res.status(200).json({allProducts});
        } catch(err) {
            res.status(500).json({message: "Erro ao consultar usuários"})
        }
    }

    async updateProduct(req, res){
        try{
            const {id} = req.params;
            const data = req.body;
            await updateProductSVC(id, data);
            res.status(200).json({message: "Produto atualizado"});
        } catch(err) {
            res.status(500).json({message: "Erro ao atualizar produto"});
        }
    }

    async deleteProduct(req, res){
        try{
            const {id} = req.params;
            await deleteProductSVC(id);
            res.status(200).json({message: "Produto deletado"});
        } catch(err) {
            res.status(500).json({message: "Erro ao apagar usuário"});
        }
    }
}
