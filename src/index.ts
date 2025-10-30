import express from "express";
// ❗️ Use the standard import if you fixed the previous error
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import logRoutes from "./routes/logRouter"; // 1. Import your new router

dotenv.config();
// const prisma = new PrismaClient(); // You can remove this, it's in the controller
const app = express();

app.use(cors());
app.use(express.json()); // This is crucial for reading req.body

// --- 2. Use the new router ---
// All requests to /api/logs will be handled by logRoutes
app.use("/api/logs", logRoutes);

app.get("/", (req, res) => {
    res.send("🚀 Express + Prisma + TypeScript backend running!");
});

// You can keep this route for testing
app.get("/users", async (req, res) => {
    const prisma = new PrismaClient(); // Or keep the instance up top
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));