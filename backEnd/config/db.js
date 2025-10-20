import mongoose from 'mongoose'




const connecDb =async()=>{

try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`db connection done ${conn.connection.host}`)
} catch (error) {
    console.log("error:",error.message)
}
    
}

export default connecDb