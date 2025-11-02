import React, { useContext, useEffect, useState } from "react";
import { BookOpen, File, OctagonAlert, Calendar, Check,CircleCheckBig ,AlertTriangle,Clock } from "lucide-react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { UserInfo } from "../components/UseAuth";
import Modol from "../components/Model";
import toast from "react-hot-toast";
import axios from "axios";


const StudentDashboard = () => {
  const [upLoadfile,setFileUpload]=useState(null)
  const [assignment,setAssignments]=useState([])
  const [submittedAssignments,setsubmittedassignments]=useState([])
  const [load,setLoad]=useState(false)
  const[selectedId,setSelectedId]=useState(null)
  const{user} =useContext(UserInfo)
const token =user?.token


const fetchsubmission =async()=>{
try {
    const res = await axios.get("http://localhost:5000/api/auth/student/submission",{headers:{
      Authorization:`Bearer ${token}`
    }})
    return res.data.studentSubmissions
} catch (error) {
  console.log("error while get ",error.message)
}


console.log("submitted assignments",submittedAssignments)


}

  const fetchAsignment =async(studentSubs)=>{
   
   try {
      const response =await axios.get('http://localhost:5000/api/auth/getAssignment',{headers:{Authorization:`Bearer ${token}`}})
      console.log(response.data)
   const submittedIds =studentSubs.map((submittedAssignment)=>submittedAssignment.assignmentId)
     const AvailableAssigmnent = response.data.Assignments.filter((assignment)=>!submittedIds.includes(assignment._id))

      setAssignments(AvailableAssigmnent)
      setsubmittedassignments(studentSubs)
   } catch (error) {
    if(error.response){
      toast.error(error.response.status)
    }
    console.log('error while fetch asignment',error.message)
   }


  }
  useEffect(()=>{
    const loadData =async()=>{

 const subs =  await   fetchsubmission()
     await fetchAsignment(subs)
    }
    loadData()
  },[token])

  const handleFile =async(file)=>{
    try {

       
  setLoad(true)
  const formData =new FormData()
  formData.append('file',file)
  formData.append("assignmentId",selectedId)

  const res = await axios.post('http://localhost:5000/api/auth/upload',formData,{
    headers:{
      'Content-Type':'multipart/form-data',
      'Authorization':`Bearer ${token}`
    },
    
  })
  const completed =assignment.find((assign)=>assign._id ==selectedId)
    const newsubmitted ={
      ...completed,
      status:"submitted",
      submisionDate:new Date().toISOString(),
      filename:file.name,
      fileUrl:res.data.fileUrl
    }
    const updatedAssignment =assignment.filter((assign)=>assign._id !==selectedId)
    setAssignments(updatedAssignment)
    setsubmittedassignments([...submittedAssignments,newsubmitted])
    toast.success("file uploaded successfully")
    fetchsubmission()
} catch (error) {
  toast.error("error upload",error.message)
}finally{
setFileUpload(false);
    setSelectedId(null);
    setLoad(false);
}
                               

  }
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-gray-900 text-3xl font-bold">
            Welcome back {user.name}
          </h1>
          <p className="text-gray-600">
            Here's an overview of your assignments and progress.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Assignments
                </p>
                <p className="text-gray-900 text-2xl font-bold">{assignment.length +submittedAssignments?.length}</p>
              </div>
              <BookOpen className="text-blue-600 h-8 w-8" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  submitted  Assignments
                </p>
                <p className="text-gray-900 text-2xl font-bold">{submittedAssignments?.length}</p>
              </div>
              <CircleCheckBig className="text-green-600 h-8 w-8" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Assignments
                </p>
                <p className="text-gray-900 text-2xl font-bold">{assignment.length}</p>
              </div>
              <Clock className="text-orange-600 h-8 w-8" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  overdue
                </p>
                <p className="text-gray-900 text-2xl font-bold">{ assignment.filter((assign)=>new Date(assign.deadline)<new Date()).length}</p>
              </div>
              <AlertTriangle className="text-red-600 h-8 w-8" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl text-gray-900 mb-6 font-bold">
              Available Assignments
            </h2>{assignment.map((assignmen)=>(
                   <div key={assignmen._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-shadow duration-200 hover:shadow-lg">
              <div className="flex justify-between mb-4">
                <div className="space-y-3 flex-1">
                  <h3 className="text-lg text-gray-900 font-bold">
                    {assignmen.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                {assignmen.description}
                  </p>
                </div>
              
              </div>

              <div className="text-gray-600 flex space-x-2 items-center mb-4">
                <Calendar className="h-4 w-4" />
                <span className="text-gray-600 text-sm">
                  {new Date(assignmen.deadline).toLocaleString('en-IN',{
                    dateStyle:"medium",
                    timeStyle:"short"
                  })}
                </span>
              </div>
              <Button onClick={()=>{setSelectedId(assignmen._id);
                 setFileUpload(true);}} className="w-full">Submit Assignment</Button>
            </div>

            ))}
            {<Modol isOpen={upLoadfile} onClose={()=>{setFileUpload(false);setLoad(false)}} onUpload={handleFile} loading={load}/>}
         
          
          </div>

          <div>
            <h2 className="text-2xl text-gray-900 mb-8 font-bold">
              Submitted Assignments
            </h2>{
            
            submittedAssignments.map((sub)=>(
                <div key={sub.assignmentId} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-shadow duration-200">
              <div className="flex justify-between">
                <div className="flex-1 space-y-2 mb-4">
                  <h2 className="text-lg font-bold text-gray-900">
                   {sub.assignmentTitle}
                  </h2>
                  <p className="text-gray-600">
                   {sub.description}
                  </p>
                </div>
                {sub.submission?.grade==null ? <div className="flex items-center text-green-600 bg-green-100 rounded-md space-x-1 text-sm px-2 py-1">
                  <Check className="h-3 w-3" />
                  <span>submitted</span>
                </div>:<div className="flex items-center text-green-600 bg-green-100 rounded-md space-x-1 text-sm px-2 py-1">
                  <Check className="h-3 w-3" />
                  <span>Graded</span>
                </div>}
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="tracking-tighter">deadline:{new Date(sub?.deadline).toLocaleString('en-In',{
                    dateStyle:'medium',
                    timeStyle:"short"
                  })}</span>
                </div>
                <div className="flex space-x-2 text-gray-600 items-center">
                  <File className="w-4 h-4" />
                  <span className="tracking-tighter">Submitted at:{new Date(sub.submission?.submittedAt).toLocaleString('en-In',{
                    dateStyle:'medium',
                    timeStyle:'short'

                  })}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">Grade</span>
                  <span className="text-green-600 font-bold">{sub.submission?.grade ||null}</span>
                </div>
                <div>
                  <span className="text-gray-900">FeedBack:</span>
                  <p className="text-gray-600">
                    {sub.submission?.feedback}
                  </p>
                </div>
              </div>
            </div>
            ))

              
            }
          
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default StudentDashboard;