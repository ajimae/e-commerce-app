import bcrypt from 'bcryptjs';
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
			password,
		});

		const user = await userModel.save();

		if (user) {
			return user;
		}

		throw new Error('There was error registering user');
	}

	/**
	 * @description method to check if user already exists
	 *
	 * @param email
	 *
	 * @returns { boolean } true | false
	 */
	async isRegistered(email) {
		const isEmailRegistered = this.model.User;

		const user = await isEmailRegistered.findOne({ email });

		if (user) {
			return true;
		}

		return false;
	};

	/**
	 * @description method to handle user login
	 *
	 * @parameter req.body
	 *
	 * @return user details { res.body }
	 */
	async loginUser({ email, password }) {
		const isUser = this.isRegistered(email);

		if (!isUser) {
			throw new Error('user with specified email does not found');
		}

		const userObject = this.model.User;
		const user = await userObject.findOne({ email });
		const isValidPassword = await bcrypt.compare(password, user.password);

		if (isValidPassword) {
			return user;
		}

		throw new Error('incorrect email or password');
	}
}
