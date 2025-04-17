import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBanner() {
  const data = await prisma.banner.findMany({});
  return data;
}

export async function getService() {
  const data = await prisma.service.findMany({});
  return data;
}
