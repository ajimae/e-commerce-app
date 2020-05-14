/**
 * @description product repository class
 *
 * @method addProduct
 *
 */
export default class CartRepository {
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
      const order = await this.model.Order.findOneAndUpdate({ cartId }, { userId, cartId }, { new: true, upsert: true });

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

      console.log(removedOrder)
      return removedOrder;
    }

    throw new Error('cannot cancel order, order has been fulfilled.');
  }
}