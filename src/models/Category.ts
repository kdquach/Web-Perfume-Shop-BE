import { Schema, model } from "mongoose";
import { CategoryInterface } from "../interfaces/category.interface";

const CategorySchema = new Schema<CategoryInterface> ({
    name: {type: String, require: true},
    description: {type: String, require: true}
})

export default model<CategoryInterface>('Category', CategorySchema);