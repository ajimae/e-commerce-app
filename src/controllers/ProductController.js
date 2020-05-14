import Response from '../helpers/Response';

/**
 * @description ProductController
 * 
 * @function addProduct
 * @function getAllProducts
 * @function getProduct
 */
export default class ProductController {
  constructor(ProductService) {
    this.productService = ProductService;
  }
  /**
   * @description create a product item
   * 
   * @param req
   * @param res
   * 
   * @return json
   */
  async addProduct(req, res) {
    try {

      const { decoded: { _id } } = req;
      req.body.user = _id;
      const productObject = await this.productService.addProduct(req.body);
      const product = productObject.toObject();

      return Response.successResponse(res, 201, 'product created successfully', product);
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description get all products
   * 
   * @param req
   * @param res
   * 
   * @return { Array<json> } product object
   */
  async getAllProducts(req, res) {
    try {
      // TODO: add pagination here
      const products = await this.productService.getAllProducts(req.body);
      if (products) {
        return Response.successResponse(res, 200, 'products fetched successful', products);
      }
      return Response.errorResponse(res, 404, 'there is no product at this time');
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description get single product
   * 
   * @param req
   * @param res
   * 
   * @return { json } product object
   */
  async getProduct(req, res) {
    try {
      const product = await this.productService.getProduct(req.params.id);
      if (product) {
        return Response.successResponse(res, 200, 'product fetched successful', product);
      }
      return Response.errorResponse(res, 404, 'this product cannot be found');
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }
}
