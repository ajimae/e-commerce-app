import { Router } from 'express';
import models from '../models';
import { UserService } from '../services';
import { UserRepository } from '../repository';
import { UserController } from '../controllers';

// concrete implementation and dependency injection
const userRepository = new UserRepository(models);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = Router();
const { registerUser, loginUser } = userController;

router.get('/users', loginUser.bind(userController));
router.post('/users', registerUser.bind(userController));

export default router;
