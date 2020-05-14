/**
 * @description order service class
 *
 */
export default class OrderService {
	constructor(OrderRepository) {
		this.orderRepository = OrderRepository;
	}

	addOrder(orderDetails) {
		return this.orderRepository.addOrder(orderDetails);
	}

	getAllOrders(userId) {
		return this.orderRepository.getAllOrders(userId);
  }

	cancelOrder(orderId) {
		return this.orderRepository.cancelOrder(orderId);
	}
}
