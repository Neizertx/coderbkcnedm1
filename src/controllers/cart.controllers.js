import CartsService from '../services/carts.services.js';

class CartsControlls {

  newCart = async (req, res) => {
    try {
      const newCart = await CartsService.createCart();
      res.status(200).render('cart', { newCart });
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  };

  getAll = async (req, res) => {
    try {
      const carts = await CartsService.getAllCarts();
      if (carts) {
        res.status(200).render('cart', { cartProducts });
      } else {
        res.status(404).json({ message: 'No existe Cart' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  };

  getCart = async (req, res) => {
    const { cid } = req.params;

    try {
      const cart = await CartsService.getCartById(cid); //.populate('products');

      if (cart) {
        const cartProducts = cart.productList;
        res.status(200).render('cart', { cartProducts });
      } else {
        res.status(404).json({ message: 'No existe Cart' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  };

  toCart = async (req, res) => {
    
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    console.log('1 - CONTROL: ', 'cid: ',cid, 'pid:', pid);

    try {
      const cart =  await CartsService.addProductsToCart(cid, pid, quantity);
      if (cart) {
        res.status(200).json({ message: 'agReGAdO' });
      } else {
        res.status(404).json({ message: 'No se pudo agregar al carrto' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
    



  };
}

export default new CartsControlls();

