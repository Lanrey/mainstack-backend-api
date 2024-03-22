// src/services/productService.ts
import { Product } from "../models/Product";

const createProduct = async (data: { name: string; price: number; description?: string }) => {
    const product = new Product(data);
    return await product.save();
};

const getAllProducts = async () => {
    return await Product.find({});
};

const getProductById = async (id: string) => {
    return await Product.findById(id);
};

const updateProduct = async (id: string, data: { name?: string; price?: number; description?: string }) => {
    const product = await Product.findById(id);
    if (!product) return null;

    product.name = data.name ?? product.name;
    product.price = data.price ?? product.price;
    product.description = data.description ?? product.description;

    return await product.save();
};

const deleteProduct = async (id: string) => {
    const result = await Product.deleteOne({ _id: id });
    return result.deletedCount > 0;
};

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
