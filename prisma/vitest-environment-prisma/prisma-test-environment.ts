import "dotenv/config";

import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import fs from "node:fs";

import { PrismaClient } from "@prisma/client";
import path from "path";
import type { Environment } from "vitest";

const prisma = new PrismaClient();

export default <Environment>{
  name: "prisma",
  setup() {
    const databaseFile = `./prisma/data.${randomUUID()}.db`;
    const databasePath = path.join(process.cwd(), databaseFile);
    const databaseURL = `file:${databasePath}?connection_limit=1`;

    process.env.DATABASE_URL = databaseURL;

    execSync("npx prisma migrate deploy");
    execSync("npx prisma db seed");

    return {
      async teardown() {
        await prisma.$disconnect();
        await fs.promises.rm(databasePath);
      }
    };
  }
};
