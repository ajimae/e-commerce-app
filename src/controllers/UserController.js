import Authentication from '../middleware/Authentication';

/**
 * @description UserController
 * 
 * @function registerUser
 */
export default class UserController {
  constructor(UserService) {
    this.userService = UserService;
  }
  /**
   * @description register new user
   * 
   * @param req
   * @param res
   * 
   * @return json
   */
  async registerUser(req, res) {
    try {
      const userObject = await this.userService.registerUser(req.body);
      const user = userObject.toObject();
      const token = Authentication.authenticate(user);
      res.status(201).json({
        status: 'success',
        data: {
          user,
          token
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}
