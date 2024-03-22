// tests/product.test.ts
import request from 'supertest';
import app from '../../app'; // 

describe('POST /api/products', () => {
    it('creates a new product', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({
                name: 'Test Product',
                price: 100,
                description: 'A test product',
            });
        
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Test Product');
    });
});

// Tests for GET /api/products
describe('GET /api/products', () => {
    it('fetches all products', async () => {
      const response = await request(app).get('/api/products');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  
    it('fetches a single product by ID', async () => {
      const product = await request(app)
        .post('/api/products')
        .send({ name: 'Single Product', price: 50, description: 'For testing fetching by ID' });
      const response = await request(app).get(`/api/products/${product.body._id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Single Product');
    });
  });

  // Tests for PUT /api/products/:id
describe('PUT /api/products/:id', () => {
    it('updates a product', async () => {
      const product = await request(app)
        .post('/api/products')
        .send({ name: 'Update Me', price: 60, description: 'Before update' });
      const response = await request(app)
        .put(`/api/products/${product.body._id}`)
        .send({ name: 'Updated Product', price: 70, description: 'After update' });
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Updated Product');
    });
  });
  
  
