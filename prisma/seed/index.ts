import { PrismaClient } from "@prisma/client";
import { seedService } from "./seeds/service.seed";
import { seedBanner } from "./seeds/banner.seed";
import { seedUsers } from "./seeds/user.seed";
import { seedTransactionHistory } from "./seeds/transaction.seed";

const prisma = new PrismaClient();

// run "npx db seed --preview-feature" or "npx prisma db seed"

async function main() {
  await seedUsers();
  await seedService();
  await seedTransactionHistory();
  await seedBanner();

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
