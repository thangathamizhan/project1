import mongoose from 'mongoose';




const userSchema =new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    passWord:{type:String,required:true},
    role:{type:String,required:true, default:"student"}
})


const userModel =mongoose.model('usersData',userSchema)


export default userModel