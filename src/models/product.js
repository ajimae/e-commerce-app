import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
    unique: false
  },
  description: {
    type: String,
    required: true,
    unique: false
  },
  price: {
    type: Number,
    required: true,
    unique: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
