import type { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    const users = null;
    res.json(users);
};
