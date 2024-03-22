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
const userService_1 = require("../../services/userService");
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
jest.mock('../models/User');
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockReturnValue('mockedToken'),
}));
// Mock User model
User_1.default.findOne = jest.fn();
User_1.default.create = jest.fn();
describe('createUser', () => {
    it('throws an error if user already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        User_1.default.findOne.mockResolvedValue(true); // Mock that user exists
        yield expect((0, userService_1.createUser)('test@example.com', 'password123')).rejects.toThrow('User already exists');
    }));
    it('creates a new user if they do not already exist', () => __awaiter(void 0, void 0, void 0, function* () {
        User_1.default.findOne.mockResolvedValue(null); // Mock that user does not exist
        User_1.default.create.mockResolvedValue({ email: 'test@example.com', password: 'password123' }); // Mock User.create
        const user = yield (0, userService_1.createUser)('test@example.com', 'password123');
        expect(user).toEqual({ email: 'test@example.com', password: 'password123' });
        expect(User_1.default.create).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    }));
});
describe('validateUser', () => {
    it('returns user if email and password are valid', () => __awaiter(void 0, void 0, void 0, function* () {
        User_1.default.findOne.mockResolvedValue({
            comparePassword: jest.fn().mockResolvedValue(true),
        });
        const user = yield (0, userService_1.validateUser)('valid@example.com', 'password');
        expect(user).toBeTruthy();
        expect(User_1.default.findOne).toHaveBeenCalledWith({ email: 'valid@example.com' });
    }));
    it('throws an error if password is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        User_1.default.findOne.mockResolvedValue({
            comparePassword: jest.fn().mockResolvedValue(false),
        });
        yield expect((0, userService_1.validateUser)('valid@example.com', 'wrongpassword')).rejects.toThrow('Invalid email or password');
    }));
    it('throws an error if email does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        User_1.default.findOne.mockResolvedValue(null);
        yield expect((0, userService_1.validateUser)('nonexistent@example.com', 'password')).rejects.toThrow('Invalid email or password');
    }));
});
describe('generateToken', () => {
    it('generates a JWT for a user ID', () => {
        const id = '123';
        const token = (0, userService_1.generateToken)(id);
        expect(token).toBe('mockedToken'); // Expect the mocked token value
        expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith({ id }, expect.any(String), { expiresIn: '30d' });
    });
});
