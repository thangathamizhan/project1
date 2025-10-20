import React, { useContext, useEffect, useState } from "react";
import { BookOpen, File, OctagonAlert, Calendar, Check,CircleCheckBig ,AlertTriangle,Clock } from "lucide-react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { UserInfo } from "../components/UseAuth";
import Modol from "../components/Model";

const StudentDashboard = () => {
  const [upLoadfile,setFileUpload]=useState(null)
  const [assignment,setAssignments]=useState([])
  const [submittedAssignments,setsubmittedassignments]=useState([])
  const [load,setLoad]=useState(false)
  const[selectedId,setSelectedId]=useState(null)
  const{user} =useContext(UserInfo)
  useEffect(()=>{
     const mockAssignments = [
      {
        id: 1,
        title: 'React Components Assignment',
        description: 'Create a set of reusable React components with proper props and state management.',
        deadline: '2025-01-15T23:59:00',
        status: 'pending'
      },
      {
        id: 2,
        title: 'Database Design Project',
        description: 'Design and implement a normalized database schema for an e-commerce application.',
        deadline: '2025-01-20T23:59:00',
        status: 'pending'
      },
      {
        id: 3,
        title: 'Algorithm Analysis Report',
        description: 'Analyze the time and space complexity of various sorting algorithms.',
        deadline: '2024-12-20T23:59:00',
        status: 'pending'
      }
    ]
  const mockSubmittedAssignments = [
      {
        id: 4,
        title: 'JavaScript Fundamentals Quiz',
        description: 'Complete assessment on JavaScript basics including variables, functions, and objects.',
        deadline: '2024-12-15T23:59:00',
        status: 'graded',
        submissionDate: '2024-12-14T18:30:00',
        grade: 85,
        feedback: 'Good understanding of the concepts. Pay attention to arrow function syntax in future assignments.'
      },
      {
        id: 5,
        title: 'CSS Layout Challenge',
        description: 'Create responsive layouts using Flexbox and CSS Grid.',
        deadline: '2024-12-10T23:59:00',
        status: 'submitted',
        submissionDate: '2024-12-09T20:15:00'
      }
    ]

    setsubmittedassignments(mockSubmittedAssignments)
    setAssignments(mockAssignments)
  },[])

  const handleFile =(file)=>{
   setLoad(true)

   setTimeout(() => {
    
    const completed =assignment.find((assign)=>assign.id==selectedId)

    if(completed){
      const newSubmited ={
       ...completed,
       status:"submitted",
       submissionDate:new Date().toISOString(),
       fileName:file.name


      }
      const updatedAssignments =assignment.filter((assign)=>assign.id !==selectedId)

      setAssignments(updatedAssignments)
      setsubmittedassignments([...submittedAssignments,newSubmited])
    }
    setFileUpload(false)
    setSelectedId(null)
    setLoad(false)
   }, 2000);
                               

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
                <p className="text-gray-900 text-2xl font-bold">{assignment.length +submittedAssignments.length}</p>
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
                <p className="text-gray-900 text-2xl font-bold">{submittedAssignments.length}</p>
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
                   <div key={assignmen.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-shadow duration-200 hover:shadow-lg">
              <div className="flex justify-between mb-4">
                <div className="space-y-3 flex-1">
                  <h3 className="text-lg text-gray-900 font-bold">
                    {assignmen.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                {assignmen.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-red-100 rounded-md text-red-600">
                  <OctagonAlert className="h-3 w-3" />
                  <span>OverDue</span>
                </div>
              </div>

              <div className="text-gray-600 flex space-x-2 items-center mb-4">
                <Calendar className="h-4 w-4" />
                <span className="text-gray-600 text-sm">
                  {assignmen.deadline}
                </span>
              </div>
              <Button onClick={()=>{setSelectedId(assignmen.id), setFileUpload(true)}} className="w-full">Submit Assignment</Button>
            </div>

            ))}
            {<Modol isopen={upLoadfile} onClose={()=>{setFileUpload(false)}} onUpload={handleFile} loading={load}/>}
         
          
          </div>

          <div>
            <h2 className="text-2xl text-gray-900 mb-8 font-bold">
              Submitted Assignments
            </h2>{submittedAssignments.map((sub)=>(
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-shadow duration-200">
              <div className="flex justify-between">
                <div className="flex-1 space-y-2 mb-4">
                  <h2 className="text-lg font-bold text-gray-900">
                   {sub.title}
                  </h2>
                  <p className="text-gray-600">
                   {sub.description}
                  </p>
                </div>
                <div className="flex items-center text-green-600 bg-green-100 rounded-md space-x-1 text-sm px-2 py-1">
                  <Check className="h-3 w-3" />
                  <span>Graded</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{sub.deadline}</span>
                </div>
                <div className="flex space-x-2 text-gray-600 items-center">
                  <File className="w-4 h-4" />
                  <span>Submitted: {sub.submissionDate}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">Grade</span>
                  <span className="text-green-600 font-bold">{sub.grade}</span>
                </div>
                <div>
                  <span className="text-gray-900">FeedBack:</span>
                  <p className="text-gray-600">
                    {sub.feedback}
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