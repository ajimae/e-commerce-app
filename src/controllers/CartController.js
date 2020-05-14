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
}
