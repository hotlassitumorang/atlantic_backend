import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import logRouter from "./routes/logRouter";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// --- Your Routes ---
app.use("/api/logs", logRouter);

app.get("/", (req, res) => {
    res.send("🚀 Express + Prisma + TypeScript backend running!");
});

app.get("/users", async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// ❗️ COMMENT OUT OR DELETE THIS BLOCK ❗️
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// ✅ ADD THIS LINE AT THE VERY BOTTOM
export default app;