import { Router } from "express";
import { get } from "http";
import { getLogAverages } from "../controllers/dataController";

const router = Router();

// This will handle GET requests to /api/data/averages
router.get("/averages", getLogAverages);

export default router;