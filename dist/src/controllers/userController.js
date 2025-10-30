"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const client_1 = require("../../generated/prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = async (req, res) => {
    const users = null;
    res.json(users);
};
exports.getUsers = getUsers;
