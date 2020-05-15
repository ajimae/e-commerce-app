import Response from '../helpers/Response';

/**
 * @description OrderController
 * 
 * @function addOrder
 * @function cancelOrder
 * @function getAllOrders
 */
export default class OrderController {
  constructor(OrderService) {
    this.orderService = OrderService;
  }
  /**
   * @description add an order
   * 
   * @param req
   * @param res
   * 
   * @return json
   */
  async addOrder(req, res) {
    try {

      const { decoded: { _id } } = req;
      req.body.userId = _id;
      const orderObject = await this.orderService.addOrder(req.body);
      const order = orderObject.toObject();

      return Response.successResponse(res, 201, 'order added successfully', order);
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description get all order
   * 
   * @param req
   * @param res
   * 
   * @return { Array<json> } order object
   */
  async getAllOrders(req, res) {
    try {
      // TODO: add pagination here
      const { decoded: { _id } } = req;
      const orders = await this.orderService.getAllOrders(_id);
      if (orders) {
        return Response.successResponse(res, 200, 'orders fetched successful', orders);
      }
      return Response.errorResponse(res, 404, 'there is no order at this time');
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description cancel single order
   * 
   * @param req
   * @param res
   * 
   * @return { json } order object
   */
  async cancelOrder(req, res) {
    try {
      const order = await this.orderService.cancelOrder(req.params.id);
      if (order) {
        return Response.successResponse(res, 200, 'order cencelled', order);
      }
      return Response.errorResponse(res, 404, 'this order cannot be found');
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }

  async fulfullOrder(req, res) {
    const { decoded: { _id: userId } } = req;
    const fulfilled = await this.orderService.fulfullOrder({ userId, orderId: req.params.id });
    if (fulfilled) {
      return Response.successResponse(res, 200, 'order cencelled', fulfilled);
    }
    return Response.errorResponse(res, 404, 'this order cannot be found');
  } catch (error) {
    return Response.errorResponse(res, 500, error.message);
  }
}
