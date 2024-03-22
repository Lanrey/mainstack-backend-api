"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to protect routes
const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.currentUser = decoded; // Add user payload to request object
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).send({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).send({ message: 'Not authorized, no token' });
    }
};
exports.protect = protect;
