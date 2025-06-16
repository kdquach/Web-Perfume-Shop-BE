import { Schema, model } from 'mongoose';
import { Product, Review } from '../interfaces/product.interface';

const ReviewSchema = new Schema<Review>({
  userId: { type: String, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }
});

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  gender: { type: String, required: true },
  categoryId: { type: String, ref: 'Category', required: true },
  description: { type: String, required: true },
  notes: [{ type: String }],
  longevity: { type: String },
  price: { type: Number, required: true },
  imageUrls: [{ type: String }],
  reviews: [ReviewSchema]
}, { timestamps: true });

export default model<Product>('Product', ProductSchema);