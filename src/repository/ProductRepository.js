/**
 * @description product repository class
 *
 * @method addProduct
 *
 */
export default class ProductRepository {
	constructor(model) {
		this.model = model;
	}

	/**
	 * @description method to handle product creation
	 *
	 * @param req.body
	 *
	 * @return product object
	 */
	async addProduct(products) {
		const { name, category, description, price, user } = products;
		const ProductModel = this.model.Product({
			name,
			category,
			description,
			price,
			user,
		});

		const product = await ProductModel.save();

		if (product) {
			return product;
		}

		return null;
	}

	/**
	 * @description method to handle get all products
	 *
	 * @parameter req.body
	 *
	 * @return product details { res.body }
	 */
	async getAllProducts() {
		const productObject = this.model.Product;
		const product = await productObject.find({});

		if (product) {
			return product;
		}

		return null;
	}

	/**
	 * @description method to handle get single product
	 *
	 * @parameter req.body
	 *
	 * @return product details { res.body }
	 */
	async getProduct(_id) {
		const productObject = this.model.Product;
		const product = await productObject.findOne({ _id }).populate({
			path: 'user',
			model: 'User',
			select: '-password',
		});

		if (product) {
			return product;
		}

		return null;
	}
}
