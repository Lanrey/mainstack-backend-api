"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const db_1 = __importDefault(require("./database/db"));
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Define a simple route to test that the server is running
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Use the userRoutes with the /api/users prefix
app.use('/api/users', userRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
// Error handling middleware
const errorHandlerFor500 = (err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};
app.use(errorHandlerFor500);
app.use(errorMiddleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
exports.default = app;
