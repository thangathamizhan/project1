import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import {
  Plus,
  BookOpen,
  FileText,
  Clock,
  CheckCircle,
  Calendar,
  Users,
  Pencil,
} from "lucide-react";
import Input_ from "../components/Input_label";
import Label from "../components/Label";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { UserInfo } from "../components/UseAuth";
import axios from "axios";
import toast from "react-hot-toast";

const TeacherDashBoard = () => {
  const [isModelOpen, setModalOpen] = useState(false);
  const[studentCount,setStudentCount]=useState(0)
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState([]);
  const [subModal, setSubmodal] = useState(false);
  const [editingSubmissionId, setEditingSubmissionId] = useState(null);
  const [editedGrade, setEditedGrade] = useState("");
  const [feedback, setFeedBack] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [newAssignment, setNewAssingments] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const { user } = useContext(UserInfo);
  console.log(user)

  const openmodel = () => {
    document.body.style.overflow = "hidden";
    setModalOpen(true);
  };
  const closeModel = () => {
    document.body.style.overflow = "";
    setModalOpen(false);
  };
 const token =user?.token
const fetchAssignment =async()=>{

try {
  const response = await axios.get('http://localhost:5000/api/auth/getAssignment',{
    headers:{Authorization:`Bearer ${token}`}

  })
  const res =await axios.get('http://localhost:5000/api/auth/getuser',{
    headers:{Authorization:`Bearer ${token}`}
  })
  
setStudentCount(res.data.totalstudents)
  setAssignments(response.data.Assignments)
} catch (error) {

  if(error.response && error.response.status ===403){
    toast.error("session expired")
    localStorage.clear()
    window.location.href ='/'
  }else{

    console.log('error while get',error.message)
  }
  
}



}
useEffect(()=>{
  if(token){
    fetchAssignment()
  }
},[token])



  const handleAssignment = async(e) => {
    e.preventDefault();
    
    if (
      !newAssignment.title.trim() ||
      !newAssignment.description.trim() ||
      !newAssignment.deadline
    ) {
      alert("Please fill all the fields");
      return;
    }else{

      setIsCreating(true)
    }
    try {
      const response =await axios.post('http://localhost:5000/api/auth/createAssignment',newAssignment,{headers:{Authorization:`Bearer ${token}`}})
      setAssignments([response.data.newAssignment,...assignments])   
      setNewAssingments({
    title: "",
    description: "",
    deadline: "",

  })
  toast.success("assignment succesfully created")  
    } catch (error) {
      console.log("error:",error.message)
    }finally{
      setIsCreating(false)
    closeModel()
    }
   

  }

  const handleAssignmentForm = (e) => {
    const { value, name } = e.target;
    setNewAssingments((pre) => ({ ...pre, [name]: value }));
  };
  
  const handlesubmission = async(assignment) => {
    try {
        const res =await axios.get(`http://localhost:5000/api/auth/getsubmission/${assignment._id}`)
        console.log(res.data)
        setSubmissions(res.data.submissions
)
        console.log("receiver submissions",submissions)
    } catch (error) {
        console.log("error while get submision",error.message)
    }
    
     


    const filterSubmission = submissions.filter(
      (sub) => sub.assignmentId === assignment.id
    );
    setSelectedSubmission(filterSubmission);
    setSubmodal(true);


  };

  const handleSave = () => {
    setSubmissions((presub) =>
      presub.map((sub) =>
        sub.id === editingSubmissionId
          ? { ...sub, grade: editedGrade, feedback: feedback }
          : sub
      )
    );
    setSelectedSubmission((presub) =>
      presub.map((sub) =>
        sub.id === editingSubmissionId
          ? { ...sub, grade: editedGrade, feedback: feedback }
          : sub
      )
    );
    setEditingSubmissionId(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, Mr. {user?.name ||'Guest'}
              </h1>
              <p className="text-gray-600 mt-2">
                Manage assignments and review student submissions.
              </p>
            </div>
            <Button
              onClick={openmodel}
              size="sm"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Create Assignment</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Total Assignments",
                value: assignments.length,
                icon: BookOpen,
                color: "blue",
              },
              {
                title: "Total Submissions",
                value: submissions.length,
                icon: FileText,
                color: "green",
              },
              {
                title: "Graded",
                value: submissions.filter(
                  (sub) => sub.grade !== null && sub.grade !== undefined
                ).length,
                icon: CheckCircle,
                color: "purple",
              },
              {
                title: "Pending Grades",
                value: submissions.filter(
                  (sub) => sub.grade == null && sub.grade !== undefined
                ).length,
                icon: Clock,
                color: "red",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg bg-${stat.color}-50`}
                  >
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Assignments */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Assignments
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <div
                key={assignment._id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {assignment.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                  {assignment.description}
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>
                      Due:{" "}
                      {new Date(assignment.deadline).toLocaleString("en-US", {
                        timeZone: "Asia/Kolkata",
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span>
                      {assignment.submissionCount.length}/{studentCount}{" "}
                      submitted
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handlesubmission(assignment)}
                  className="w-full border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all rounded-lg py-2 font-medium"
                >
                  View Submissions ({assignment.submissionCount.length})
                </Button>
              </div>
            ))}
          </div>

          {/* Modals */}
          {isModelOpen && (
            <div
              onClick={closeModel}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative"
              >
                <button
                  onClick={closeModel}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
                <form onSubmit={handleAssignment}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Create New Assignment
                  </h2>
                  <Input_
                    label="Assignment Title"
                    onChange={handleAssignmentForm}
                    name="title"
                    value={newAssignment.title}
                    placeholder="Enter assignment title"
                    className="mb-4"
                  />
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </Label>
                  <textarea
                    name="description"
                    id="description"
                    value={newAssignment.description}
                    onChange={handleAssignmentForm}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the description and requirements"
                  />
                  <Input_
                    label="Deadline"
                    type="datetime-local"
                    name="deadline"
                    value={newAssignment.deadline}
                    onChange={handleAssignmentForm}
                  />
                  <div className="flex justify-end gap-3 mt-6">
                    <Button
                      type="submit"
                      disabled={isCreating}
                      className={`px-4 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition ${
                        isCreating ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isCreating ? "Creating..." : "Create Assignment"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={closeModel}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Submissions Modal */}
          {subModal && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4"
           onClick={()=>setSubmodal(false)} >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 overflow-y-auto max-h-[90vh]"
              >
                {selectedSubmission.length === 0 ? (
                  <div className="text-center py-10">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No Submissions Yet
                    </h3>
                    <p className="text-gray-600">
                      Student submissions will appear here once submitted.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {selectedSubmission.map((sub) => (
                      <div
                        key={sub.id}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-5"
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                            <Users className="text-blue-600 w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {sub.studentName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {sub.studentEmail}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-b border-gray-200 py-3 mb-4">
                          <span className="text-gray-700 font-medium">
                            Grade
                          </span>
                          <div className="flex items-center gap-2">
                            {sub.id === editingSubmissionId ? (
                              <Input
                                type="number"
                                value={editedGrade}
                                onChange={(e) =>
                                  setEditedGrade(e.target.value)
                                }
                                className="w-20 border-gray-300 rounded-md"
                              />
                            ) : (
                              <span className="text-xl font-bold text-green-600">
                                {sub.grade}/100
                              </span>
                            )}
                            <Pencil
                              className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800"
                              onClick={() => {
                                setEditedGrade(sub.grade ?? "");
                                setEditingSubmissionId(sub.id);
                                setFeedBack(sub.feedback ?? "");
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-gray-800 font-medium mb-2">
                            Feedback
                          </h4>
                          {sub.id === editingSubmissionId ? (
                            <div className="space-y-3">
                              <Input
                                type="text"
                                value={feedback}
                                onChange={(e) => setFeedBack(e.target.value)}
                                className="w-full border-gray-300 rounded-md"
                              />
                              <div className="flex gap-3">
                                <Button
                                  onClick={handleSave}
                                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                >
                                  Save Grade
                                </Button>
                                <Button
                                  onClick={() => {
                                    setEditingSubmissionId(null);
                                    setEditedGrade("");
                                    setFeedBack("");
                                  }}
                                  className="bg-gray-700 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-700 bg-white border border-gray-200 rounded-md p-3">
                              {sub.feedback || "No feedback yet."}
                            </p>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          onClick={() =>
                            alert(`${sub.fileName} is downloading`)
                          }
                          className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg py-2"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Download Submission
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TeacherDashBoard;
