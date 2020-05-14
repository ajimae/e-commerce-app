import { Router } from 'express';

import users from './user';
import products from './product';
import cart from './cart';
import order from './order';

const router = Router();

router.use(users);
router.use(products);
router.use(cart);
router.use(order);

export default router;
