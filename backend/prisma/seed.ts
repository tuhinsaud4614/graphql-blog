import { PrismaClient } from "@prisma/client";
import { hash, } from "argon2";

const prisma = new PrismaClient();
async function main() {
  const adminHashPassword = await hash("admin123");
  const userHashPassword = await hash("1234567");
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: "admin@gmail.com",
      userStatus: "VERIFIED",
      password: adminHashPassword,
      role: "ADMIN",
    },
  });
  await prisma.user.upsert({
    where: { email: 't@gmail.com' },
    update: {},
    create: {
      email: "t@gmail.com",
      userStatus: "VERIFIED",
      password: userHashPassword,
      role: "AUTHOR",
    },
  });
  await prisma.user.upsert({
    where: { email: 't2@gmail.com' }, 
    update: {},
    create: {
      email: "t2@gmail.com",
      userStatus: "VERIFIED",
      password: userHashPassword,
      role: "AUTHOR",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed admin creation failed: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
