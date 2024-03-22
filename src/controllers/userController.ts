// src/controllers/userController.ts
import { Request, Response } from 'express';
import * as userService from '../services/userService';

const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await userService.createUser(email, password);
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: userService.generateToken(user._id),
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await userService.validateUser(email, password);
        res.json({
            _id: user._id,
            email: user.email,
            token: userService.generateToken(user._id),
        });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};

export { registerUser, loginUser };
