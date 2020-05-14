import { Router } from 'express';
import models from '../models';
import { CartService } from '../services';
import { CartRepository } from '../repository';
import { CartController } from '../controllers';

import Authentication from '../middleware/Authentication';

// concrete implementation and dependency injection
const cartRepository = new CartRepository(models);
const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

const router = Router();
const { addProductToCart } = cartController;
const { verifyUserToken } = Authentication;

// router.get('/product/:id', getProduct.bind(productController));
// router.get('/products', getAllProducts.bind(productController));
router.post('/cart', verifyUserToken, addProductToCart.bind(cartController));

export default router;
