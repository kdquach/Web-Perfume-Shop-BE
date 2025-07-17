import Category from "../models/Category";
import { CategoryInterface } from "../interfaces/category.interface";

// Lấy tất cả danh muc
export const findAllCategories = async (): Promise<CategoryInterface[]> => {
    const categories = await Category.find();
    if (categories.length === 0) {
        throw new Error("No categories found");
    }
    return categories;
}

// Thêm mới vào danh mục
export const addCategory = async (data: Partial<CategoryInterface>): Promise<CategoryInterface> => {
    const category = new Category(data);
    return await category.save();
}

// Chỉnh sửa category
export const modifyCategory = async (
    id: string,
    data: Partial<CategoryInterface>
): Promise<CategoryInterface | null> => {
    return await Category.findByIdAndUpdate(id, data, {new: true});
}

// Xóa category
export const removeCategory = async (id: string): Promise<CategoryInterface | null> => {
    return await Category.findByIdAndDelete(id);
}