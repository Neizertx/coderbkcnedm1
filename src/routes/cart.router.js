import { Router } from 'express';

import { isAuthorized } from '../middlewares/authorized.middleware.js';
import { isAuthenticated } from '../middlewares/authenticated.middleware.js';

import cartControllers from '../controllers/cart.controllers.js';



const router = Router();


router.post('/', cartControllers.newCart);

router.get('/', cartControllers.getAll);

router.get('/:cid', isAuthenticated, cartControllers.getCart);

router.post('/:cid/product/:pid', isAuthenticated, cartControllers.toCart);


export default router;
