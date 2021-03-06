/**
 * @description product repository class
 *
 * @method addProduct
 *
 */
export default class OrderRepository {
	constructor(model) {
		this.model = model;
	}

	/**
	 * @description method to handle order creation
	 *
	 * @param req.body
	 *
	 * @return order<Object>
	 */
	async addOrder({ userId, cartId }) {
		// check to ensure cart is not empty
		const cart = await this.model.Cart.findOne({ _id: cartId });
		if (cart.items.length > 0) {
			// we have products in cart
			const order = await this.model.Order.findOneAndUpdate(
				{ cartId },
				{ userId, cartId, fulfilled: false },
				{ new: true, upsert: true, useFindAndModify: false }
			);

			// const ordered = await order.save();
			if (order) {
				return order;
			}

			return null;
		} else {
			throw new Error('cart is empty');
		}
	}

	async getAllOrders(userId) {
		const orders = await this.model.Order.find({ userId });

		if (orders) {
			return orders;
		}

		return null;
	}

	/**
	 * @description method to cancel an order
	 *
	 * @param req.body
	 *
	 * @return
	 */
	async cancelOrder(orderId) {
		const order = await this.model.Order.findOne({ _id: orderId });
		if (!order.fulfilled) {
			const removedOrder = await this.model.Order.findOneAndDelete({ _id: orderId }, { useFindAndModify: false });

			return removedOrder;
		}

		throw new Error('cannot cancel order, order has been fulfilled.');
	}

	/**
	 * @description method to fulfill an order
	 *
	 * @param req.body
	 *
	 * @return
	 */
	async fulfullOrder({ userId, orderId}) {
		const order = await this.model.Order.findOne({ _id: orderId });
		if (order && !order.fulfilled) {
			const fulfillOrder = await this.model.Order.findOneAndUpdate({ _id: orderId }, { fulfilled: true }, { new: true, useFindAndModify: false });

			// empty user cart items
			await this.model.Cart.findOneAndUpdate({ userId }, { items: [], subTotal: 0 }, { new: true, useFindAndModify: false });

			return fulfillOrder;
		}

		throw new Error('order does not exist or has already been fulfilled.');
	}
}
