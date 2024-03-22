"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const productController = __importStar(require("../controllers/productController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_validator_2 = require("express-validator");
const router = express_1.default.Router();
const validate = (validations) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all(validations.map(validation => validation.run(req)));
        const errors = (0, express_validator_2.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({ errors: errors.array() });
    });
};
router.post('/', authMiddleware_1.protect, validate([
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    (0, express_validator_1.body)('description').optional().isString().withMessage('Description must be a string'),
]), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', validate([
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid product ID'),
]), productController.getProductById);
router.put('/:id', authMiddleware_1.protect, validate([
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid product ID'),
    (0, express_validator_1.body)('name').optional().notEmpty().withMessage('Name cannot be empty'),
    (0, express_validator_1.body)('price').optional().isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    (0, express_validator_1.body)('description').optional().isString().withMessage('Description must be a string'),
]), productController.updateProduct);
router.delete('/:id', authMiddleware_1.protect, validate([
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid product ID'),
]), productController.deleteProduct);
exports.default = router;
