import express from "express";
import { updateMsg, getMsg } from "../controllers/Msgs.js";
const router = express.Router();
router.patch('/', updateMsg);
router.get('/', getMsg)
export default router;
