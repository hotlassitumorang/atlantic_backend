import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/logs/averages
 * Gets the daily average for all sensors for the last X days.
 * * Query Params:
 * ?days=30 (defaults to 30)
 */
export const getLogAverages = async (req: Request, res: Response) => {
    try {
        // 1. Get number of days from query, default to 30
        const daysQuery = parseInt(req.query.days as string, 10) || 30;

        // 2. Calculate the start date
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysQuery);

        // 3. This is the magic! Ask Prisma to group by day and calculate averages.
        // We must use a raw query here because 'groupBy' can't group by a function (DATE_TRUNC)
        const averages = await prisma.$queryRaw`
            SELECT
                DATE_TRUNC('day', "createdAt") AS "day",
                AVG(voltage) AS "avg_voltage",
                AVG(current) AS "avg_current",
                AVG(power) AS "avg_power",
                AVG(energy) AS "avg_energy",
                AVG(water_temperature) AS "avg_water_temperature",
                AVG(humidity) AS "avg_humidity",
                AVG(ph) AS "avg_ph",
                AVG(nutrient_ppm) AS "avg_nutrient_ppm"
            FROM "data_logs"
            WHERE "createdAt" >= ${startDate}
            GROUP BY "day"
            ORDER BY "day" ASC;
        `;

        // 4. Send the small, clean array to the app
        res.status(200).json(averages);

    } catch (error) {
        console.error("Failed to get log averages:", error);
        res.status(500).json({ error: "An error occurred while fetching averages." });
    }
};