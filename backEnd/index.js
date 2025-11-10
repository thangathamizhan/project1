import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connecDb from './config/db.js'
import { Route } from './Routes/userRoutes.js'
import route from './Routes/downloadRoute.js'




dotenv.config()
connecDb()
const app =express()

app.use(express.json())
app.use(cors())
app.use('/api/auth',Route)
app.use('/api',route)
app.use('/uploads',express.static("uploads"))
const PORT =process.env.PORT || 5000

app.listen(PORT,()=>{

 console.log(`server running on http://localhost:${PORT}`)

})