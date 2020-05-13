import { Router } from 'express';
import models from '../models';
import { UserService } from '../services';
import { UserRepository } from '../repository';
import { UserController } from '../controllers';

import Validations from '../middleware/Validations';

// concrete implementation and dependency injection
const userRepository = new UserRepository(models);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = Router();
const { registerUser, loginUser } = userController;
const { signupValidator, signinValidator } = Validations;

router.get('/users', signinValidator, loginUser.bind(userController));
router.post('/users', signupValidator, registerUser.bind(userController));

export default router;
