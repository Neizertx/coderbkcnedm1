
import cartsDAO from '../persistence/DAOs/factory.js';


const CartDAOS = cartsDAO.cartsDAO;

class CartsService {
  createCart = async () => {
    const cart = await CartDAOS.create(); 
    return cart;
  };

  getAllCarts = async () => {
    const cart = await CartDAOS.getAll(); 
    return cart;
  };

  getCartById = async (cid) => {
    const cart = await CartDAOS.getCart(cid); 
    return cart;
  };

  addProductsToCart = async (cid, pid, quantity) => {
    const cart = await CartDAOS.addToCart(cid, pid, quantity); 
    console.log('2 - SERVICE: ', 'cid: ',cid, 'pid:', pid);
    return cart;
  };
}

export default new CartsService(CartDAOS);
