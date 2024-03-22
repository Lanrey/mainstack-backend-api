// src/routes/productRoutes.ts
import express from 'express';
import * as productController from '../controllers/productController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', protect, productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);

export default router;
