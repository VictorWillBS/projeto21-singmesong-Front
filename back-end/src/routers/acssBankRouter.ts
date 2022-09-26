import { Router } from "express";
import { clearBank, populeBank } from "../controllers/acssBankController.js";
console.log("entreiaq2");

const acssBank = Router();
acssBank.post("/clearbank", clearBank);
acssBank.post("/popule", populeBank);

export default acssBank;
