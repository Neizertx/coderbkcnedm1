import { Router } from 'express';

import ProductsControlls from '../controllers/products.controllers.js';
import { isAuthorized } from '../middlewares/authorized.middleware.js';

const router = Router();


router.get('/all', ProductsControlls.getAllProducts)
router.get('/:id', ProductsControlls.productById)


router.delete('/:id' , async (req, res)=>{
    const {id} = req.params;
    const delProd = await productManager.deleteProduct(id);
    res.json({message : delProd });
})

export default router;
