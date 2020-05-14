import mongoose from 'mongoose';

const { Schema } = mongoose;

const ItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less then 1.'],
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
    required: true,
  },
}, {
  timestamps: true,
});

const CartSchema = new Schema({
  userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
  },
  items: [ItemSchema],
  subTotal: {
      default: 0,
      type: Number
  }
}, {
  timestamps: true
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;


// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const CartSchema = new Schema(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User"
//     },
//     products: [
//       {
//         productId: Schema.Types.ObjectId,
//         quantity: Number,
//         name: String,
//         price: Number
//       }
//     ],
//     active: {
//       type: Boolean,
//       default: true
//     },
//     modifiedOn: {
//       type: Date,
//       default: Date.now
//     }
//   },
//   { timestamps: true }
// );

// const Cart = mongoose.model("Cart", CartSchema);

// export default Cart;
