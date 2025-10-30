import { Router } from "express";
import { createDataLog } from "../controllers/logController";

const router = Router();

// This will handle POST requests to /api/logs
router.post("/", createDataLog);

export default router;