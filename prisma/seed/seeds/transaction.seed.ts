import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedTransactionHistory() {
  const users = await prisma.user.findMany(); // Seeded users

  const sampleTransactions = [
    {
      invoice_number: "INV17082023-001",
      transaction_type: "TOPUP",
      description: "Top Up balance",
      total_amount: 100000,
      created_on: new Date("2023-08-17T10:10:10.000Z"),
    },
    {
      invoice_number: "INV17082023-002",
      transaction_type: "PAYMENT",
      description: "PLN Pascabayar",
      total_amount: 10000,
      created_on: new Date("2023-08-17T11:10:10.000Z"),
    },
    {
      invoice_number: "INV17082023-003",
      transaction_type: "PAYMENT",
      description: "Pulsa Indosat",
      total_amount: 40000,
      created_on: new Date("2023-08-17T12:10:10.000Z"),
    },
  ];

  for (const user of users) {
    for (const trx of sampleTransactions) {
      await prisma.transactionHistory.create({
        data: {
          user_id: user.id,
          invoice_number: trx.invoice_number,
          transaction_type: trx.transaction_type,
          description: trx.description,
          total_amount: trx.total_amount,
          created_on: trx.created_on,
        },
      });
    }
  }
}
