import express from "express";
import { getCredentials, checkMembership, signinToExtension, getMembership, checkuser } from "../controllers/membership.js";
const router = express.Router();
// router.get('/:param', );
router.post('/', checkMembership)
router.post('/data', getMembership)
router.post('/credential', getCredentials)
router.post('/signin', signinToExtension)
router.post('/checkuser', checkuser)
export default router;