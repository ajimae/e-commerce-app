import { Router } from 'express';
import { UserService } from '../services';
import { UserController } from '../controllers';

// concrete implementation and dependency injection
const userService = new UserService();
const userController = new UserController(userService);

const router = Router();
const { registerUser } = userController;

router.post('/users', registerUser.bind(userController));

export default router;
