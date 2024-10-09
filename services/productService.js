

class ProductService{
    constructor(ProductModel){
        this.Product = ProductModel;
    }

    async createProductSVC(name, price, description, stock) {
        var hasProduct = await Product.findOne({ where: { name: name } });

        if(hasProduct) {
            throw new Error('Este produto já existe!');
        }

        const newProduct = await this.Product.create({
            name: name,
            price: price,
            description: description,
            stock: stock
        });
        return newProduct;
    }

    async getAllProductsSVC() {
        const allProducts = await this.Product.findAll();
        return allProducts;
    }

    async updateProductSVC(productID, newData) {
        const product = await this.Product.findByPk(productID);

        if (!product) {
            throw new Error('Produto não existe');
        };

        product.name = newData.name;
        product.price = newData.price;
        product.description = newData.description;
        product.stock = newData.stock;

        await product.save();
        return product;
    }

    async deleteProductSVC(productID) {
        const product = await this.Product.findByPk(productID);

        if (!product) {
            throw new Error('Produto não existe');
        };
        
        await product.destroy();
        return(`${product.name} removido`);
    }
}

module.exports = ProductService;