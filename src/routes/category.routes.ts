import { Router } from "express";
import {
    createNewCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller";
import { RequestHandler } from "express";

const router = Router();

router.get('/categories', getAllCategories);
router.post('/create-new-category', createNewCategory);
router.put('/update-category/:id', updateCategory as RequestHandler);
router.delete('/delete-category/:id', deleteCategory);

export default router;