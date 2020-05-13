// import { UserService } from '../services';

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
      const user = await this.userService.registerUser(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          user,
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: {
          error
        }
      });
    }
  }
}
