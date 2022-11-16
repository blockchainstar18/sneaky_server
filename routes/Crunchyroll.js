import express from "express";

import {
    getAllAccounts,
    createAccount,
    getAccountById,
    updateAccount,
    deleteAccount
} from "../controllers/Crunchyroll.js";

const router = express.Router();

router.get('/', getAllAccounts);
router.get('/:email', getAccountById);
router.post('/', createAccount);
router.patch('/:email', updateAccount);
router.delete('/:email', deleteAccount);

export default router;