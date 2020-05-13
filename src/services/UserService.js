/**
 * @description user service class
 * 
 */
export default class UserService {

  constructor(UserRepository) {
    this.userRepository = UserRepository;
  }

  registerUser(user) {
    return this.userRepository.registerUser(user);
  }

  loginUser(user) {
    return this.userRepository.loginUser(user);
  }
}
