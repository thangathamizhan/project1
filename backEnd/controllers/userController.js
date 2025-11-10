import userModel from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import assignmentModel from "../model/Assignment.js";

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

export const 
login = async (req, res) => {
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
   const token =jwt.sign({email,role:"teacher",name:'abi'},process.env.JWT_SECRET,{expiresIn:'7d'})


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
      const token =jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'7d'})

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

export const getUser =async (req,res)=>{

try {
  const users =await userModel.find({role:{$ne:"teacher"}})

  if(!users || users.length==0){
  return  res.status(404).json({message:"no user found"})
  }

  res.status(201).json({totalstudents:users.length})

  
} catch (error) {
  console.log("error while fetch",error.message)
  res.status(500).json({message:"server error"})
}





}



export const createAssignment =async(req,res)=>{

try {
  const {deadline,title,description}=req.body
   const students =await userModel.find({role:'student'})

   const total =students.length


   const newAssignment =new assignmentModel({
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


export const  getAssignment =async(req,res)=>{

try {

  const Assignments =await assignmentModel.find().sort({createdAt:-1})

  if(! Assignments){
    res.status(401).json({message:'no assignments is created now'})
  }

  res.status(201).json({Assignments})
  
} catch (error) {
  console.error("error while getting asignment",error.message)
  res.status(500).json({message:"serrver error"})
}




}


export const uploadSubmission =async(req,res)=>{

try{

const {assignmentId}=req.body;
const studentId =req.user.id
const fileUrl =`http://localhost:5000/uploads/${req.file.filename}`

const assignment =await assignmentModel.findById(assignmentId)
if(!assignment){
  return res.status(404).json({message:"assignment not found"})

}
const student =await userModel.findById(studentId) 

if(!student){

  return res.status(404).json({message:"no student found"})
}

console.log("hi from upload submission")
console.log("studentid is recieved:",studentId)
console.log("asignment is recieved:",assignmentId)

// const alreadysubmitted = await assignment.submissionCount.find((sub)=>sub.studentId.toString()==studentId)
//       if(alreadysubmitted){
//         return res.status(404).json({message:"asignment already submitted"})
//       }

      const newsubmision ={
        studentId:studentId,
        assignmentId:assignmentId,
        studentName:student.name,
        studentEmail:student.email,
        fileUrl:fileUrl
      }
     await assignment.submissionCount.push(newsubmision)

      await assignment.save()
      res.status(201).json({ message: "submission uploaded successfully", fileUrl });

}catch(error){
  console.log("error:",error.message)
}

}

 export const getsubmissions =async(req,res)=>{
try {
  const {id} =req.params

  const submission =await assignmentModel.findById(id)

  if(!submission){
    return res.status(404).json({message:"no submission found"})
  }
  res.status(201).json({message:"fetched the submission clealy",submissions:submission.submissionCount})
  
} catch (error) {
  console.log("error while get the submission",error.message)
  res.status(500).json({message:"server error"})
}




 }

  export const studentSubmission =async(req,res)=>{

  try {
    const studentId =req.user.id

    console.log(
      "studentid:",studentId
    )

    const assignments = await assignmentModel.find({"submissionCount.studentId":studentId}).populate('submissionCount.studentId','name email')
    const  studentSubmissions =assignments.map(assignment=>{
      const studentSubmission=assignment.submissionCount.find((sub)=>sub.studentId._id.toString()==studentId.toString())

      return{
        assignmentId:assignment._id,
        assignmentTitle:assignment.title,
        description:assignment.description,
        deadline:assignment.deadline,
        submission:studentSubmission
      }
    })

   res.status(201).json({message:"succefully fetched",studentSubmissions})
    
  } catch (error) {
    console.log("error while get student submission",error.message)
    res.status(500).json({messgae:"server error"})
  }
 }


 export const  gradeSubmission =async (req,res)=>{

  try {
    const {grade,feedback} =req.body;
    const {studentId,assignmentId}=req.params


    const assignment =await assignmentModel.findById(assignmentId)
   if(! assignment){
    return res.status(404).json({message:""})
   }
    const studentIndex =assignment.submissionCount.findIndex((s)=>s.studentId.toString() ===studentId)

    if(studentIndex === -1){
      return res.status(404).json({message:"submision not found"})
    }
    assignment.submissionCount[studentIndex].grade = grade;
    assignment.submissionCount[studentIndex].feedback = feedback;


    await assignment.save()
    res.status(201).json({message:"grade saved successFully"})

    
  } catch (error) {
    console.log("error while gradeSubmission")
    res.status(500).json({message:"server error"})
  }






 } 










