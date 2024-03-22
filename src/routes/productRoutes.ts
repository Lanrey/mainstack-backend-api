import express, {Request, Response, NextFunction} from 'express';
import { body, param, ValidationChain} from 'express-validator';
import * as productController from '../controllers/productController';
import { protect } from '../middleware/authMiddleware';
import { validationResult } from 'express-validator';

const router = express.Router();

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

router.post(
  '/',
  protect,
  validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('description').optional().isString().withMessage('Description must be a string'),
  ]),
  productController.createProduct
);

router.get('/', productController.getAllProducts);

router.get(
  '/:id',
  validate([
    param('id').isMongoId().withMessage('Invalid product ID'),
  ]),
  productController.getProductById
);

router.put(
  '/:id',
  protect,
  validate([
    param('id').isMongoId().withMessage('Invalid product ID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('description').optional().isString().withMessage('Description must be a string'),
  ]),
  productController.updateProduct
);

router.delete(
  '/:id',
  protect,
  validate([
    param('id').isMongoId().withMessage('Invalid product ID'),
  ]),
  productController.deleteProduct
);

export default router;
