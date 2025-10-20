import express from 'express';
import { createUser, login } from '../controllers/userController.js';
import { verify } from '../middleWare/authMiddleWare.js';


 export  const Route =express.Router()

Route.post('/register',createUser)
Route.post('/login',login)