import Product from '../models/Product';
import { ProductInterface, ReviewInterface } from '../interfaces/product.interface';

interface PaginationParams {
  page?: number;
  limit?: number;
}

// Lấy tất cả sản phẩm
export const findAllProducts = async ({ 
  page = 1, 
  limit = 10 
}: PaginationParams = {}): Promise<{
  data: ProductInterface[];
  total: number;
}> => {
  const skip = (page - 1) * limit;
  
  const [products, total] = await Promise.all([
    Product.find().skip(skip).limit(limit).exec(),
    Product.countDocuments().exec()
  ]);

  return {
    data: products,
    total
  };
};

// Lấy sản phẩm theo id
export const getProductById = async (id: string): Promise<ProductInterface | null> => {
    return await Product.findById(id);
};

// Tạo mới sản phẩm
export const addProduct = async (data: Partial<ProductInterface>): Promise<ProductInterface> => {
    const product = new Product(data);
    return await product.save();
};

// Cập nhật sản phẩm
export const modifyProduct = async (
    id: string,
    data: Partial<ProductInterface>
): Promise<ProductInterface | null> => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

// Xóa sản phẩm 
export const removeProduct = async (id: string): Promise<ProductInterface | null> => {
    return await Product.findByIdAndDelete(id);
};

// Thêm review cho sản phẩm
export const addReview = async (    
    productId: string,
    review: ProductInterface
): Promise<ProductInterface | null> => {
    return await Product.findByIdAndUpdate(
        productId,
        { $push: { reviews: review } },
        { new: true }
    );
};