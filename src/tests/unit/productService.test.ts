
import * as productService from '../../services/productService';
import { Product } from '../../models/Product';

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
    it('should create a new product and save it to the database', async () => {
      const mockProductData = { name: 'Test Product', price: 100, description: 'A test product' };
      
      // Assuming createProduct function returns the product object directly
      (Product.create as jest.Mock).mockResolvedValue(mockProductData);
      
      const product = await productService.createProduct(mockProductData);
      
      expect(Product.create).toHaveBeenCalledWith(mockProductData);
      expect(product).toEqual(mockProductData);
    });
  });
  

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockProducts = [{ name: 'Test Product', price: 100, description: 'A test product' }];
      (Product.find as jest.Mock).mockResolvedValue(mockProducts);
  
      const products = await productService.getAllProducts();
  
      expect(Product.find).toHaveBeenCalled();
      expect(products).toEqual(mockProducts);
    });
  });

  describe('getProductById', () => {
    it('should return a product by its ID', async () => {
      const mockProduct = { _id: '1', name: 'Test Product', price: 100, description: 'A test product' };
      (Product.findById as jest.Mock).mockResolvedValue(mockProduct);
  
      const product = await productService.getProductById('1');
  
      expect(Product.findById).toHaveBeenCalledWith('1');
      expect(product).toEqual(mockProduct);
    });
  });

  describe('updateProduct', () => {
    it('should update a product if it exists', async () => {
      const mockProduct = { _id: '1', name: 'Test Product', price: 100, description: 'A test product', save: jest.fn() };
      (Product.findById as jest.Mock).mockResolvedValue(mockProduct);
  
      const updatedData = { name: 'Updated Product', price: 150 };
      const updatedProduct = await productService.updateProduct('1', updatedData);
  
      expect(mockProduct.save).toHaveBeenCalled();
      expect(updatedProduct?.name).toEqual(updatedData.name);
      expect(updatedProduct?.price).toEqual(updatedData.price);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by its ID', async () => {
      (Product.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 1 });
  
      const success = await productService.deleteProduct('1');
  
      expect(Product.deleteOne).toHaveBeenCalledWith({ _id: '1' });
      expect(success).toBe(true);
    });
  });
  