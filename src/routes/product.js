import { Router } from 'express';
import models from '../models';
import { ProductService } from '../services';
import { ProductRepository } from '../repository';
import { ProductController } from '../controllers';

import Authentication from '../middleware/Authentication';

// concrete implementation and dependency injection
const productRepository = new ProductRepository(models);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = Router();
const { addProduct, getAllProducts, getProduct } = productController;
const { verifyUserToken } = Authentication;

router.get('/product/:id', getProduct.bind(productController));
router.get('/products', getAllProducts.bind(productController));
router.post('/products', verifyUserToken, addProduct.bind(productController));

export default router;
