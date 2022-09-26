import { prisma } from "../database.js";

export default async function Clear() {
  await prisma.$executeRaw`TRUNCATE recommendations RESTART IDENTITY`;
}
