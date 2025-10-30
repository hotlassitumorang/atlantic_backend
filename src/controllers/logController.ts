import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"; // Use your correct import path
import { updateFirebaseRealtimeData } from "../services/firebaseService";

const prisma = new PrismaClient();

// This interface defines the expected shape of the data from the ESP32
interface DataLogPayload {
    voltage: number;
    current: number;
    power: number;
    energy: number;
    water_temperature: number;
    humidity: number;
    ph: number;
    nutrient_ppm: number;
}

/**
 * POST /api/logs
 * Creates a new data log from an ESP32.
 * Saves all data to Supabase and updates Firebase.
 */
export const createDataLog = async (req: Request, res: Response) => {
    try {
        const data = req.body as DataLogPayload;

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
        await updateFirebaseRealtimeData({
            energy: data.energy,
            water_temperature: data.water_temperature,
            humidity: data.humidity,
            ph: data.ph,
            nutrient_ppm: data.nutrient_ppm,
        });

        // --- 3. Send Success Response ---
        // We send the 'newLog' back as confirmation
        res.status(201).json(newLog);

    } catch (error) {
        console.error("Failed to create data log:", error);
        res.status(500).json({ error: "An error occurred while logging data." });
    }
};