
import productsDAO from '../persistence/DAOs/factory.js';

const ProdDAOS = productsDAO.productsDAO;


class ProductsServices {
  getAllProducts = async (limit, page) => {
    const prods = await ProdDAOS.allProducts(limit, page);
    // console.log('service prods',prods);
    return prods;
  };

  getProductById = async (id) => {
    const prods = await ProdDAOS.productById(id);
    return prods;
  };

  addProduct = async (prod) => {
    const prods = await ProdDAOS.add(prod);
    return prods;
  };

  deleteProduct = async (id) => {
    const prods = await ProdDAOS.deleteProduct(id);
    return prods;
  };
}

export default new ProductsServices(productsDAO);
