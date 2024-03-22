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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tests/product.test.ts
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app")); // 
let token;
// Log in before running the tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.default)
        .post('/api/users/login')
        .send({
        email: 'user@example.com',
        password: 'password123',
    });
    token = res.body.token; // Assuming the token is returned in the body
}));
describe('POST /api/products', () => {
    it('creates a new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'Test Product',
            price: 100,
            description: 'A test product',
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Test Product');
    }));
});
// Tests for GET /api/products
describe('GET /api/products', () => {
    it('fetches all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/products').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
    it('fetches a single product by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield (0, supertest_1.default)(app_1.default)
            .post('/api/products')
            .send({ name: 'Single Product', price: 50, description: 'For testing fetching by ID' });
        const response = yield (0, supertest_1.default)(app_1.default).get(`/api/products/${product.body._id}`).set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Single Product');
    }));
});
// Tests for PUT /api/products/:id
describe('PUT /api/products/:id', () => {
    it('updates a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield (0, supertest_1.default)(app_1.default)
            .post('/api/products')
            .send({ name: 'Update Me', price: 60, description: 'Before update' });
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/products/${product.body._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated Product', price: 70, description: 'After update' });
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Updated Product');
    }));
});
// Tests for DELETE /api/products/:id
describe('DELETE /api/products/:id', () => {
    it('deletes a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield (0, supertest_1.default)(app_1.default)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Delete Me', price: 80, description: 'To be deleted' });
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/api/products/${product.body._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Product deleted');
    }));
});
