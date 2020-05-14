import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrderSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		cartId: {
			type: Schema.Types.ObjectId,
			ref: 'Cart',
		},
		fulfilled: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;
