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
Object.defineProperty(exports, "__esModule", { value: true });
const productService = __importStar(require("../../services/productService"));
const Product_1 = require("../../models/Product");
// Mock the Product model
jest.mock('../../models/Product', () => {
    return {
        Product: {
            find: jest.fn(),
            findById: jest.fn(),
            deleteOne: jest.fn(),
        },
    };
});
describe('createProduct', () => {
    it('should create a new product and save it to the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductData = { name: 'Test Product', price: 100, description: 'A test product' };
        // Assuming createProduct function returns the product object directly
        Product_1.Product.create.mockResolvedValue(mockProductData);
        const product = yield productService.createProduct(mockProductData);
        expect(Product_1.Product.create).toHaveBeenCalledWith(mockProductData);
        expect(product).toEqual(mockProductData);
    }));
});
describe('getAllProducts', () => {
    it('should return all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProducts = [{ name: 'Test Product', price: 100, description: 'A test product' }];
        Product_1.Product.find.mockResolvedValue(mockProducts);
        const products = yield productService.getAllProducts();
        expect(Product_1.Product.find).toHaveBeenCalled();
        expect(products).toEqual(mockProducts);
    }));
});
describe('getProductById', () => {
    it('should return a product by its ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProduct = { _id: '1', name: 'Test Product', price: 100, description: 'A test product' };
        Product_1.Product.findById.mockResolvedValue(mockProduct);
        const product = yield productService.getProductById('1');
        expect(Product_1.Product.findById).toHaveBeenCalledWith('1');
        expect(product).toEqual(mockProduct);
    }));
});
describe('updateProduct', () => {
    it('should update a product if it exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProduct = { _id: '1', name: 'Test Product', price: 100, description: 'A test product', save: jest.fn() };
        Product_1.Product.findById.mockResolvedValue(mockProduct);
        const updatedData = { name: 'Updated Product', price: 150 };
        const updatedProduct = yield productService.updateProduct('1', updatedData);
        expect(mockProduct.save).toHaveBeenCalled();
        expect(updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.name).toEqual(updatedData.name);
        expect(updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.price).toEqual(updatedData.price);
    }));
});
describe('deleteProduct', () => {
    it('should delete a product by its ID', () => __awaiter(void 0, void 0, void 0, function* () {
        Product_1.Product.deleteOne.mockResolvedValue({ deletedCount: 1 });
        const success = yield productService.deleteProduct('1');
        expect(Product_1.Product.deleteOne).toHaveBeenCalledWith({ _id: '1' });
        expect(success).toBe(true);
    }));
});
