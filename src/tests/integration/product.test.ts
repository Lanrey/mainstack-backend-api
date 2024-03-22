// tests/product.test.ts
import request from 'supertest';
import app from '../../app'; // 

let token: string;

// Log in before running the tests
beforeAll(async () => {
    const res = await request(app)
        .post('/api/users/login')
        .send({
            email: 'user@example.com',
            password: 'password123',
        });
    token = res.body.token; // Assuming the token is returned in the body
});

describe('POST /api/products', () => {
    it('creates a new product', async () => {
        const response = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
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
      const response = await request(app).get('/api/products').set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  
    it('fetches a single product by ID', async () => {
      const product = await request(app)
        .post('/api/products')
        .send({ name: 'Single Product', price: 50, description: 'For testing fetching by ID' });
      const response = await request(app).get(`/api/products/${product.body._id}`).set('Authorization', `Bearer ${token}`);
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
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated Product', price: 70, description: 'After update' });
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Updated Product');
    });
  });

  // Tests for DELETE /api/products/:id
describe('DELETE /api/products/:id', () => {
    it('deletes a product', async () => {
      const product = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Delete Me', price: 80, description: 'To be deleted' });
      const response = await request(app).delete(`/api/products/${product.body._id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Product deleted');
    });
  });
  
  
