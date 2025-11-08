// middleware/checkApiKey.ts
import { Request, Response, NextFunction } from "express";

const API_KEY = process.env.API_KEY || "atlanticbackendapp52";

export const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers["x-api-key"];

    if (key !== API_KEY) {
        return res.status(401).json({ error: "Unauthorized: Invalid API key" });
    }

    next();
};
