import { configDotenv } from "dotenv";
import "dotenv/config";
import { setEngine } from "node:crypto";
import path from "node:path";
import { defineConfig, env } from "prisma/config";

configDotenv();

type Env = {
  DATABASE_URL: string;
};

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env<Env>("DATABASE_URL"),
  },
});
