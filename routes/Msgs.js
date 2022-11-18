import express from "express";
import { getMsg, newMsg, deleteMsg } from "../controllers/Msgs.js";
const router = express.Router();
router.post('/', newMsg);
router.get('/', getMsg)
router.patch('/', deleteMsg)
export default router;
