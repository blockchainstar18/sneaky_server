import express from "express";
import { generateAccounts, getAccounts, deleteAccounts, getUsers } from "../controllers/Exaccs.js";
const router = express.Router();
router.post('/', generateAccounts);
router.get('/', getAccounts)
router.post('/delete/', deleteAccounts)
router.get('/users', getUsers)
export default router;
