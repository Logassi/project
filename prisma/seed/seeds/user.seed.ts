import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function seedUsers() {
  const users = [
    {
      first_name: "nutech",
      last_name: "test",
      email: "user@nutech-integrasi.com",
      password: "abcdeF1234", // Will be hashed
      balance: 500123,
      profile_image: null,
    },
    {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      password: "password123",
      balance: 750000,
      profile_image: null,
    },
  ];

  for (const user of users) {
    // Delete existing user with the same email
    await prisma.user.deleteMany({
      where: {
        email: user.email,
      },
    });

    // Hash password
    const hashedPassword = await hash(user.password, 10);

    // Create user
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }
}
