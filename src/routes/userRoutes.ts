import express from 'express';
import { body, validationResult } from 'express-validator';
import * as userController from '../controllers/userController';

const router = express.Router();

const userValidationRules = {
  register: [
    body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long').trim().escape(),
  ],
  login: [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').not().isEmpty().withMessage('Password cannot be empty'),
  ]
};

const validate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

router.post('/register', userValidationRules.register, validate, userController.registerUser);
router.post('/login', userValidationRules.login, validate, userController.loginUser);

export default router;
