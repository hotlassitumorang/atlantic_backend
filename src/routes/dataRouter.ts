import { Router } from "express";
import { get } from "http";
import { getAllData, getLogAverages } from "../controllers/dataController";
import { checkApiKey } from "../middleware/check_apikey";

const router = Router();

// This will handle GET requests to /api/data/averages
router.get("/averages", checkApiKey, getLogAverages);
router.get("/alldata", checkApiKey, getAllData);

export default router;