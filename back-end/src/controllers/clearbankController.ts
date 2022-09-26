import * as clearBankService from "../services/clearBankService.js";
import { Request, Response } from "express";
export async function clearBank(req: Request, res: Response) {
  await clearBankService.clearBank();
  res.sendStatus(200);
}
