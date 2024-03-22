import express from 'express';
import {Product} from '../models/Product';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/products - Create a new product
router.post('/', protect, async (req, res) => {
    const { name, price, description } = req.body;

    try {
        const product = new Product({
            name,
            price,
            description,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
});

// GET /api/products - Fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/products/:id - Fetch a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/products/:id - Update a product
router.put('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        const { name, price, description } = req.body;
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        await product.deleteOne();
        res.json({ message: 'Product deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;