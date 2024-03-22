// src/types/express.d.ts
import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        currentUser?: { id: string; email: string }; // Adjust according to the payload you expect
    }
}