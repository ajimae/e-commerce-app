import models from '../models';
import { UserRepository } from '../repository';

/**
 * @description user service class
 * 
 */
export default class UserService {

  registerUser(user) {
    // console.log(this.userRepository, '<><><>');
    return new UserRepository(models).registerUser(user);
  }
}
