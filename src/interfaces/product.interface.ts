export interface Review {
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  approved: boolean;
}

export interface Product {
  _id: string;
  name: string;
  brand: string;
  gender: string;
  categoryId: string;
  description: string;
  notes: string[];
  longevity: string;
  price: number;
  imageUrls: string[];
  reviews: Review[];
}

// Hoặc nếu bạn muốn sử dụng ObjectId từ MongoDB
// import { ObjectId } from 'mongodb';

// export interface ReviewWithObjectId {
//   userId: ObjectId;
//   rating: number;
//   comment: string;
//   createdAt: Date;
//   approved: boolean;
// }

// export interface ProductWithObjectId {
//   _id: ObjectId;
//   name: string;
//   brand: string;
//   gender: string;
//   categoryId: ObjectId;
//   description: string;
//   notes: string[];
//   longevity: string;
//   price: number;
//   imageUrls: string[];
//   reviews: ReviewWithObjectId[];
// }