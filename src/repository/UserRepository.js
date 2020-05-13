/**
 * @description user repository class
 * 
 * @method registerUser
 * 
 */
export default class UserRepository {
  constructor(model) {
    this.model = model;
  }

  /**
   * @description method to handle user registration
   * 
   * @param req.body
   * 
   * @return user object
   */
  async registerUser({ firstName, lastName, email, phone, password }) {
    const userModel = this.model.User({
      firstName,
      lastName,
      email,
      phone,
      password
    });

    const user = await userModel.save();

    if (user) {
      return user;
    }
    
    throw new Error('There was error registering user');
  }
}
