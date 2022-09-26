import { Router } from "express";
import { clearBank } from "../controllers/clearbankController.js";
console.log("entreiaq2");

const acssBank = Router();
acssBank.post("/clearbank", clearBank);
export default acssBank;
