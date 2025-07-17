import { findAllProducts, addProduct, removeProduct, modifyProduct } from "../services/product.service";
import { Request, Response } from 'express';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { data, total } = await findAllProducts({ page, limit });

    res.status(200).json({
      success: true,
      data,
      pagination: {
        page,   
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message
    });
  }
};

export const createNewProduct = async (req: Request, res: Response) => {
    try {
        await addProduct(req.body);
        res.json({
            success: true,
            message: 'Add new product successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message
        });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await removeProduct(id);
        res.json({
            success: true,
            message: 'Delete product successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message
        });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(req.body);
        await modifyProduct(id, req.body);
        res.json({
            success: true,
            message: 'Update product successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message
        });
    }
}