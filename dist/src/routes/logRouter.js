"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logController_1 = require("../controllers/logController");
const router = (0, express_1.Router)();
// This will handle POST requests to /api/logs
router.post("/", logController_1.createDataLog);
exports.default = router;
