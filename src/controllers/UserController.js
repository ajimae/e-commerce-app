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
    // TODO handle case where email already exists
    try {

      const userObject = await this.userService.registerUser(req.body);
      const user = userObject.toObject();
      const token = Authentication.authenticate(user);
      
      delete user.password;
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

  /**
   * @description user login
   * 
   * @param req
   * @param res
   * 
   * @return { json } user object
   */
  async loginUser(req, res) {
    try {
      const isUser = await this.userService.loginUser(req.body);
      if (isUser) {
        const user = isUser.toObject();
        const token = Authentication.authenticate(user);
        
        delete user.password;
        return res.status(200).json({
          status: 'success',
          data: {
            user,
            token
          }
        });
      }
      return res.status(404).json({
        status: 'success',
        data: {
          isUser
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }
  }
}
