// src/routes/userRoutes.ts
import express from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Utility function to generate JWT
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    });
};

export default router;
