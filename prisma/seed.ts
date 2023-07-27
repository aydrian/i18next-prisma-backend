import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  console.log("🌱 Seeding...");
  await prisma.i18n.create({
    data: {
      language: "en",
      key: "key",
      namespace: "test",
      translation: "passing"
    }
  });
  console.log("🌱 Database has been seeded");
}

seed();
