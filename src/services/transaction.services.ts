import { PrismaClient } from "@prisma/client";
import { HttpError } from "../utils/http.error";

const prisma = new PrismaClient();

export async function getBalance(email: string) {
  const data = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      balance: true,
    },
  });

  return data?.balance;
}

export async function getTransactionHistory(
  offset: number,
  limit: number,
  email: string
) {
  // this one is tricky
  // because the requirement said, only get user transaction history only
  // meaning, there is join from transaction table to user table
  const data = await prisma.transactionHistory.findMany({
    where: {
      user: {
        email: email,
      },
    },
    skip: offset,
    take: limit,
    orderBy: {
      created_on: "desc", // Optional: latest transactions first
    },
    select: {
      invoice_number: true,
      transaction_type: true,
      description: true,
      total_amount: true,
      created_on: true,
    },
  });

  const totalRecords = await prisma.transactionHistory.count({
    where: {
      user: {
        email,
      },
    },
  });

  return { offset, limit, totalRecords: totalRecords, records: data };
}

export async function topUp(amount: number, email: string) {
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      balance: {
        increment: amount,
      },
    },
  });
}

export async function createTransaction(service_code: string, email: string) {
  const isService = await prisma.service.findUnique({
    where: {
      service_code,
    },
  });

  if (!isService) {
    throw new HttpError(401, "Service atas Layanan tidak ditemukan");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new HttpError(401, "User tidak ditemukan");
  }

  if (user?.balance < isService.service_tariff) {
    throw new HttpError(401, "Saldo tidak mencukupi");
  }

  const transactionCount = await prisma.transactionHistory.count({
    where: {
      user: {
        email,
      },
    },
  });

  const now = new Date();

  // Format date to DDMMYYYY
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const year = now.getFullYear();
  const formattedDate = `${day}${month}${year}`;

  const transaction = await prisma.transactionHistory.create({
    data: {
      invoice_number: `INV${formattedDate}-${transactionCount + 1}`,
      transaction_type: "PAYMENT",
      description: `Top Up ${service_code}`,
      total_amount: isService.service_tariff, // example amount
      created_on: new Date(),
      user: {
        connect: {
          email: email,
        },
      },
    },
  });

  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      balance: {
        decrement: isService.service_tariff,
      },
    },
  });

  return {
    invoice_numer: transaction.invoice_number,
    service_code,
    service_name: isService.service_name,
    transaction_type: transaction.transaction_type,
    total_amount: transaction.total_amount,
    created_on: transaction.created_on,
  };
}
