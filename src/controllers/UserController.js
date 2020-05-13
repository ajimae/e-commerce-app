import Response from '../helpers/Response';

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
      res.header('Authorization', `Bearer ${token}`);
      return Response.successResponse(res, 201, 'user created successfully', { user, token });
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
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
        res.header('Authorization', `Bearer ${token}`);
        return Response.successResponse(res, 200, 'login successful', { isUser, token });
      }
      return Response.errorResponse(res, 404, 'email or password incorrect', isUser);
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }
}
