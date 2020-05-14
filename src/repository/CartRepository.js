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
	 * @description method to handle product addition to cart
	 *
	 * @param req.body
	 *
	 * @return Product<Array<object>>
	 */
	async addProductToCart(products) {
		const { userId, productId, quantity: Quantity } = products;
		const quantity = Number.parseInt(Quantity);

		let cart = await this.model.Cart.findOne({ userId });
		let product = await this.model.Product.findOne({ _id: productId });

		if (cart) {
			//cart exists for user
			let itemIndex = cart.items.findIndex((item) => item.productId == productId);

			if (itemIndex > -1) {
				//product exists in the cart, update the quantity
				const productItem = cart.items[itemIndex];
				cart.items[itemIndex].quantity = productItem.quantity + quantity;
				cart.items[itemIndex].total = productItem.quantity * productItem.price;
				cart.items[itemIndex].price = productItem.price;
				cart.items[itemIndex] = productItem;
				cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
			} else {
				// product does not exists in cart, add new item
				const { price: Price } = product;
				const price = Number.parseInt(Price);
				const total = price * quantity;
				cart.items.push({ productId, quantity, price, total });
				cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
			}
			const cartItem = await cart.save();
			return cartItem;
		} else {
			// no cart for user, create new cart
			const { price: Price } = product;

			const price = Number.parseInt(Price);
			const total = price * quantity;
			const newCart = await this.model.Cart({
				userId,
				items: [
					{
						productId,
						quantity,
						price,
						total,
					},
				],
				subTotal: parseInt(price * quantity),
			});

			const newCartItem = await newCart.save();

			if (newCartItem) {
				return newCartItem;
			}

			return null;
		}
  }
  
  async getAllCartItems(userId) {
    const cartItems = await this.model.Cart.find({ userId });
    if (cartItems) {
      return cartItems
    }

    return null;
	}
	
	// TODO: function to handle quantity adjustment

	async removeProductFromCart({ userId, productId }) {
		const cart = await this.model.Cart.findOne({ userId });

		if (cart) {
			// cart exists
			const updated = await this.model.Cart.updateMany(
				{ userId },
				{ $pull: { items: { productId: { $in: [...productId] } } } }, { multi: true, upsert: false }
			);

			if (updated.n > 0) {
				// recalculate the subtotal for the cart.
				const updatedCart = await this.model.Cart.findOne({ userId });
				const subTotal = updatedCart.items.map((item) => item.total).reduce((acc, next) => acc + next, 0);
				const updatedSubTotal = await this.model.Cart.updateOne({ userId }, { subTotal });
				
				return updatedSubTotal;
			}

			// couldn't remove item from cart
			return null;
		}

		// cart doesn't exist for that user
		return null;
	}
}
