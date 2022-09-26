import { prisma } from "../database.js";

export async function Clear() {
  await prisma.$executeRaw`TRUNCATE recommendations RESTART IDENTITY`;
}
export async function PopuleBank(
  name: string,
  youtubeLink: string,
  score: number
) {
  await prisma.recommendation.create({ data: { name, youtubeLink, score } });
}
export default { Clear, PopuleBank };
