import { Router } from 'express';

import users from './user';
import products from './product';
import cart from './cart';

const router = Router();

router.use(users);
router.use(products);
router.use(cart);

export default router;
