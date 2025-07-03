import { findAllProducts, addProduct, removeProduct, modifyProduct } from "../services/product.service";
import { Request, Response } from 'express';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await findAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const createNewProduct = async (req: Request, res: Response) => {
    try {
        await addProduct(req.body);
        res.json({ message: 'Add new product successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const deleteProduct = async (req: Request , res: Response) => {
    try {
        await removeProduct(req.body);
        res.json({ message: 'Delete product successfully'});
    } catch (error) {
        res.status(500).json({ message: (error as Error).message});
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id);
        await modifyProduct(id, req.body);
        res.json({ message: 'Update product successfully'});
    } catch (error) {
        res.status(500).json({ message: (error as Error).message});
    }
}