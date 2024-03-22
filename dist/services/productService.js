"use strict";
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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
// src/services/productService.ts
const Product_1 = require("../models/Product");
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new Product_1.Product(data);
    return yield product.save();
});
exports.createProduct = createProduct;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.Product.find({});
});
exports.getAllProducts = getAllProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.Product.findById(id);
});
exports.getProductById = getProductById;
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const product = yield Product_1.Product.findById(id);
    if (!product)
        return null;
    product.name = (_a = data.name) !== null && _a !== void 0 ? _a : product.name;
    product.price = (_b = data.price) !== null && _b !== void 0 ? _b : product.price;
    product.description = (_c = data.description) !== null && _c !== void 0 ? _c : product.description;
    return yield product.save();
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_1.Product.deleteOne({ _id: id });
    return result.deletedCount > 0;
});
exports.deleteProduct = deleteProduct;
