import bankRepository from "../repositories/acssBankRepository.js";

export async function clearBank() {
  return await bankRepository.Clear();
}
export async function populeBank() {
  await bankRepository.Clear();
  const youtubeLinks = [
    "https://www.youtube.com/watch?v=qU9mHegkTc4&list=RDqU9mHegkTc4&start_radio=1&ab_channel=ArcticMonkeys-Topic",
    "https://www.youtube.com/watch?v=wdo_ATH_ITg&list=RDqU9mHegkTc4&index=2",
    "https://www.youtube.com/watch?v=HYsz1hP0BFo&list=RDqU9mHegkTc4&index=3",
    "https://www.youtube.com/watch?v=nyuo9-OjNNg&list=RDqU9mHegkTc4&index=4",
    "https://www.youtube.com/watch?v=GCdwKhTtNNw&list=RDqU9mHegkTc4&index=5",
    "https://www.youtube.com/watch?v=Kp7eSUU9oy8&list=RDqU9mHegkTc4&index=6",
    "https://www.youtube.com/watch?v=_lMlsPQJs6U&list=RDqU9mHegkTc4&index=8",
    "https://www.youtube.com/watch?v=lyO-Sveg6a8&list=RDqU9mHegkTc4&index=9",
    "https://www.youtube.com/watch?v=9wiEM0s4aCQ&list=RDqU9mHegkTc4&index=10",
    "https://www.youtube.com/watch?v=uQFVqltOXRg&list=RDqU9mHegkTc4&index=12",
    "https://www.youtube.com/watch?v=cULQhvuq1Zc&ab_channel=TheNeighbourhood-Topic",
  ];
  youtubeLinks.map(async (youtubeLink, i) => {
    const name = `teste ${i}`;
    const score = i + 1 * 2;
    await bankRepository.PopuleBank(name, youtubeLink, score);
  });
}
