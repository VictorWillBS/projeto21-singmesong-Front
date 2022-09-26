import Clear from "../repositories/clearBankRepository.js";

export async function clearBank() {
  return await Clear();
}
