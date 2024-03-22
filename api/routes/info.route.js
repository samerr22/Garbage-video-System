import  express  from "express";
import { verifyToken } from '../utils/VerfiyUser.js';
import { verifyAdmin } from '../utils/VerifyAdmin.js';

import { createInfo, deleteInfo, getInfo, updateInfo } from "../controllers/info.controller.js";

const router = express.Router();

router.post('/createe', verifyToken,verifyAdmin, createInfo);
router.get('/getinfo', getInfo);
router.delete('/deleted/:InfoId', verifyToken,verifyAdmin, deleteInfo)
router.put('/updatee/:infooId', verifyToken,verifyAdmin, updateInfo)


export default router;