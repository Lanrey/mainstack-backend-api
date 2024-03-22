// src/services/userService.ts
import User from '../models/User';
import jwt from 'jsonwebtoken';

const createUser = async (email: string, password: string) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }
    const user = await User.create({ email, password });
    return user;
};

const validateUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
        return user;
    }
    throw new Error('Invalid email or password');
};

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    });
};

export { createUser, validateUser, generateToken };
