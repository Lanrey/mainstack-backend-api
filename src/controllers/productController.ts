// src/controllers/productController.ts
import { Request, Response } from 'express';
import * as productService from '../services/productService';

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const success = await productService.deleteProduct(req.params.id);
        if (success) {
            res.json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
