import Response from '../helpers/Response';

/**
 * @description CartController
 *
 * @function addProductToCart
 */
export default class ProductController {
	constructor(CartService) {
		this.cartService = CartService;
	}
	/**
	 * @description add product item to cart
	 *
	 * @param req
	 * @param res
	 *
	 * @return json
	 */
	async addProductToCart(req, res) {
		try {
			const {
				decoded: { _id },
			} = req;
			req.body.userId = _id;
			const productObject = await this.cartService.addProductToCart(req.body);
			const product = productObject.toObject();

			return Response.successResponse(res, 201, 'product created successfully', product);
		} catch (error) {
			return Response.errorResponse(res, 500, error.message);
		}
	}

	async getAllCartItems(req, res) {
		try {
			const {
				decoded: { _id },
			} = req;
			const cartItems = await this.cartService.getAllCartItems(_id);
			
			return Response.successResponse(res, 200, 'cart items fetched successfully', cartItems);
		} catch (error) {
			return Response.errorResponse(res, 500, error.message);
		}
	}

	async removeProductFromCart(req, res) {
		try {
			const {
				decoded: { _id },
			} = req;
			req.body.userId = _id;
			const cartObject = await this.cartService.removeProductFromCart(req.body);
			return Response.successResponse(res, 200, 'cart updated successfully', cartObject);
		} catch (error) {
			return Response.errorResponse(res, 500, error.message);
		}
	}
}
