// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

// Middleware to protect routes
export const protect = (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
            req.currentUser = decoded; // Add user payload to request object
            next();
        } catch (error) {
            console.error(error);
            res.status(401).send({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).send({ message: 'Not authorized, no token' });
    }
};
