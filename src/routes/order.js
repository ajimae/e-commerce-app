import { Router } from 'express';
import models from '../models';
import { OrderService } from '../services';
import { OrderRepository } from '../repository';
import { OrderController } from '../controllers';

import Authentication from '../middleware/Authentication';

// concrete implementation and dependency injection
const orderRepository = new OrderRepository(models);
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

const router = Router();
const { addOrder, cancelOrder, getAllOrders } = orderController;
const { verifyUserToken } = Authentication;

router.get('/order', verifyUserToken, getAllOrders.bind(orderController));
router.post('/order', verifyUserToken, addOrder.bind(orderController));
router.delete('/order/:id', verifyUserToken, cancelOrder.bind(orderController));

export default router;
