import express from 'express';
import { downloadFile } from '../controllers/downloadController.js';
import { verify } from '../middleWare/authMiddleWare.js';


const route =express.Router()


route.get("/download/:fileName",verify,downloadFile)



export default route