import { cartModel } from '../../mongo/models/cart.model.js';
import { usersModel } from '../../mongo/models/user.model.js';
import { productModel } from '../../mongo/models/product.models.js';

export default class CartMongoManager {
  async create() {
    try {
      const createCart = await cartModel.create({
        cart: [],
      });
      return createCart;
    } catch (error) {
      return error;
    }
  }


  async getAll() {
    try {
      const allCarts = await cartModel.find().lean();
      console.log(allCarts);
      return allCarts;
    } catch (error) {
      return error;
    }
  }

  async getCart(id) {
    try {
      const getCart = await cartModel.findById(id);
     
      return getCart.productList;
    } catch (error) {
      return error;
    }
  }

  async addToCart(cid, pid, quantity) {
    
    console.log('3 - MANAGER: ', 'cid: ',cid, 'pid:', pid);

    try {
     
      const checkCart = req.user.cart

      if (!checkCart) {
        await this.create(); 
      } else {
       
        const getCart = await this.getCart(checkCart._id);

        if (getCart) {
            
          const compare = getCart.productList.find((e) => e.productId == pid);
          if (compare) {
           
            const addQuantity = getCart.productList.map((element) => {
              if (element.productId == pid) {
                element.quantity += quantity;
              }
              return element;
            });
            return await cartModel.findByIdAndUpdate(cid, {
              productList: addQuantity,
            });
          }else{
          
            const addToCart = await cartModel.findByIdAndUpdate(
              { _id: cid },
              {
                $push: {
                  productList: {
                    productId: pid,
                    productName: getProd.name,
                    quantity: quantity,
                  },
                },
              }
            );
  
            return addToCart;
          }
        } else {
      return error;
        } 
      }

    } catch (error) {
      return error
    }
  }
}




    