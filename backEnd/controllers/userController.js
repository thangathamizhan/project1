import userModel from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
  try {
    const { name, email, passWord } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "user already exist" });
    }

    const hashPassword = await bcrypt.hash(passWord, 10);

    await userModel.create({
      name,
      email,
      passWord: hashPassword,
    });

    res.status(201).json({ message: "user successfully created" });
  } catch (error) {
    console.error("errror while creating", error.message);
    res.status(500).json({ message: "server errror" });
  }
};

export const login = async (req, res) => {
  try {
    console.log('login body:',req.body)
    const { email, passWord } = req.body;

    if (!email || !passWord) {
      return res.status(401).json({ message: "please fill out the fields" });
    }

    if (
      email === process.env.TEACHER_EMAIL &&
      passWord === process.env.TEACHER_PASSWORD
    ) {
   const token =jwt.sign({email,role:"teacher",name:'abi'},process.env.JWT_SECRET,{expiresIn:'2h'})


      return res.status(201).json({
        message: "teacher login successfull",
        token,
        name: "Abi",
        email,
        role: "teacher",
      });
    } else {
      const existingUser = await userModel.findOne({ email });

      if (!existingUser) {
        return res.status(400).json({ message: "user not found" });
      }

      const isMatch = await bcrypt.compare(passWord, existingUser.passWord);

      if (!isMatch) {
        return res.status(400).json({ message: "invalid password" });
      }
      const payload ={id:existingUser._id,email:existingUser.email}
      const token =jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2h'})

      res.status(201).json({
        message: "successfully login",
        token,
        name: existingUser.name,
        email: existingUser.email,
        role: "student",
      });
    }
  } catch (error) {
    console.error("error while login", error.message);
  }
};



export const createAssignment =async(req,res)=>{

try {
  const {deadline,title,description}=req.body
   const students =await userModel.find({role:'student'})

   const total =students.length


   const newAssignment =new Assignment({
      title:title,
      description:description,
      deadline:deadline,
      totalStudent:total

   })

   await newAssignment.save()

   res.status(201).json({message:"newassignment is created",newAssignment})

} catch (error) {
  console.log('error while creating',error.message)
}


}
