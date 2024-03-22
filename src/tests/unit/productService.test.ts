
import * as productService from '../../services/productService';
import  Product  from '../../models/Product';



// Mock the Product model as a default expor

jest.mock('../../models/Product');

Product.findOne = jest.fn();
Product.create = jest.fn();
Product.findById = jest.fn();
Product.find = jest.fn();
Product.deleteOne = jest.fn();


/*
jest.mock('../../models/Product', () => {
    // Mock implementation of the Product constructor
    return {
      __esModule: true, // This property is necessary for ES Modules compatibility
      default: jest.fn().mockImplementation((data) => ({
        save: jest.fn().mockResolvedValue(data), // Mocks the save method on the instance
      })),
    };
  });
  */

/*
  jest.mock('../../models/Product', () => ({
    __esModule: true, // This is necessary for ES Modules compatibility
    default: jest.fn().mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(true),
    })),
    findOne: jest.fn(), // Static methods should be mocked like this
    create: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    deleteOne: jest.fn(),
  }));
  */
  

beforeEach(() => {
    jest.clearAllMocks();
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
  
  
  

  describe('deleteProduct', () => {
    it('should delete a product by its ID', async () => {
      (Product.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 1 });
  
      const success = await productService.deleteProduct('1');
  
      expect(Product.deleteOne).toHaveBeenCalledWith({ _id: '1' });
      expect(success).toBe(true);
    });
  });
  