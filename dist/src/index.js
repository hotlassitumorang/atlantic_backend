"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ❗️ Use the standard import if you fixed the previous error
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const logRouter_1 = __importDefault(require("./routes/logRouter")); // 1. Import your new router
dotenv_1.default.config();
// const prisma = new PrismaClient(); // You can remove this, it's in the controller
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // This is crucial for reading req.body
// --- 2. Use the new router ---
// All requests to /api/logs will be handled by logRoutes
app.use("/api/logs", logRouter_1.default);
app.get("/", (req, res) => {
    res.send("🚀 Express + Prisma + TypeScript backend running!");
});
// You can keep this route for testing
app.get("/users", async (req, res) => {
    const prisma = new client_1.PrismaClient(); // Or keep the instance up top
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (e) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
