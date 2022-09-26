import * as acssBankService from "../services/acssBankService.js";
import { Request, Response } from "express";
export async function clearBank(req: Request, res: Response) {
  await acssBankService.clearBank();
  res.sendStatus(200);
}
export async function populeBank(req: Request, res: Response) {
  await acssBankService.populeBank();
  res.sendStatus(200);
}
