import express from 'express';
import { createAssignment, createUser, getAssignment, getsubmissions, getUser, gradeSubmission, login, studentSubmission, uploadSubmission } from '../controllers/userController.js';
import { isteacher, verify } from '../middleWare/authMiddleWare.js';
import { upload } from '../middleWare/upload.js';


 export  const Route =express.Router()

Route.post('/register',createUser)
Route.post('/login',login)
Route.get('/getuser',getUser)
Route.post('/createAssignment',verify,isteacher,createAssignment)
Route.get('/getAssignment',verify,getAssignment)
Route.post('/upload',verify,upload.single('file'),uploadSubmission)
Route.get('/getsubmission/:id',getsubmissions)
Route.get('/student/submission/',verify,studentSubmission)
Route.put('/grade/:studentId/:assignmentId',verify,gradeSubmission)
