import { createUser, validateUser, generateToken } from '../../services/userService';
import User from '../../models/User';
import jwt from 'jsonwebtoken';


jest.mock('../../models/User');
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mockedToken'),
}));

// Mock User model
User.findOne = jest.fn();
User.create = jest.fn();

describe('createUser', () => {
  it('throws an error if user already exists', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(true); // Mock that user exists

    await expect(createUser('test@example.com', 'password123')).rejects.toThrow('User already exists');
  });

  it('creates a new user if they do not already exist', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null); // Mock that user does not exist
    (User.create as jest.Mock).mockResolvedValue({ email: 'test@example.com', password: 'password123' }); // Mock User.create

    const user = await createUser('test@example.com', 'password123');

    expect(user).toEqual({ email: 'test@example.com', password: 'password123' });
    expect(User.create).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
  });
});

describe('validateUser', () => {
    it('returns user if email and password are valid', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        comparePassword: jest.fn().mockResolvedValue(true),
      });
  
      const user = await validateUser('valid@example.com', 'password');
  
      expect(user).toBeTruthy();
      expect(User.findOne).toHaveBeenCalledWith({ email: 'valid@example.com' });
    });
  
    it('throws an error if password is invalid', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        comparePassword: jest.fn().mockResolvedValue(false),
      });
  
      await expect(validateUser('valid@example.com', 'wrongpassword')).rejects.toThrow('Invalid email or password');
    });
  
    it('throws an error if email does not exist', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
  
      await expect(validateUser('nonexistent@example.com', 'password')).rejects.toThrow('Invalid email or password');
    });
  });


  
  
