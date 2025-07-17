import {
    findAllCategories,
    addCategory,
    modifyCategory,
    removeCategory
} from "../services/category.service";
import { Request, Response } from "express";

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await findAllCategories();
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message
        })
    }
}

export const createNewCategory = async (req: Request, res: Response) => {
    try {
        const response = await addCategory(req.body);
        res.json({
            success: true,
            message: 'Add new category successfully',
            data: response
        })
    } catch (error) {
        res.json({
            success: false,
            message: (error as Error).message
        })
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name || description.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Input'
            })
        }

        await modifyCategory(id, req.body);
        res.json({
            success: true,
            message: 'Update category successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message
        })
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await removeCategory(id);
        res.status(200).json({
            success: true,
            message: 'Delete category successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message
        })
    }
}