import express from "express";
import { generateAccounts, getAccounts, deleteAccounts } from "../controllers/Exaccs.js";
const router = express.Router();
router.post('/', generateAccounts);
router.get('/', getAccounts)
router.post('/delete/', deleteAccounts)
export default router;
