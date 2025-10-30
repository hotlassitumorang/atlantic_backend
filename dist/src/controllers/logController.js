"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataLog = void 0;
const client_1 = require("@prisma/client"); // Use your correct import path
const firebaseService_1 = require("../services/firebaseService");
const prisma = new client_1.PrismaClient();
/**
 * POST /api/logs
 * Creates a new data log from an ESP32.
 * Saves all data to Supabase and updates Firebase.
 */
const createDataLog = async (req, res) => {
    try {
        const data = req.body;
        // --- 1. Save ALL data to Supabase (PostgreSQL) ---
        // Prisma maps our camelCase 'water_temperature' to 'water_temperature'
        // in the database automatically.
        const newLog = await prisma.dataLog.create({
            data: {
                voltage: data.voltage,
                current: data.current,
                power: data.power,
                energy: data.energy,
                water_temperature: data.water_temperature,
                humidity: data.humidity,
                ph: data.ph,
                nutrient_ppm: data.nutrient_ppm,
            },
        });
        // --- 2. Send SPECIFIC data to Firebase RTDB ---
        await (0, firebaseService_1.updateFirebaseRealtimeData)({
            energy: data.energy,
            water_temperature: data.water_temperature,
            humidity: data.humidity,
            ph: data.ph,
            nutrient_ppm: data.nutrient_ppm,
        });
        // --- 3. Send Success Response ---
        // We send the 'newLog' back as confirmation
        res.status(201).json(newLog);
    }
    catch (error) {
        console.error("Failed to create data log:", error);
        res.status(500).json({ error: "An error occurred while logging data." });
    }
};
exports.createDataLog = createDataLog;
