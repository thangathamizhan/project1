import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashBoard from './pages/TeacherDashBoard';
import { InfoProvider } from './components/UseAuth';
import {Toaster} from 'react-hot-toast'
import ProtectRoutes from './pages/ProtectRoutes';



const App = () => {
  return (

  <InfoProvider>
    <Toaster position='top-center' reverseOrder={false}
  toastOptions={{
    duration:4000,
    style :{
      background:"white",
      color:'#333',
      borderRadius:"8px",
      padding:'12px 16px',
      boxShadow:'0 2px 10px rgba(0,0,0,0.1)',
      fontSize:'14px',
      fontWeight:'500'
    },
      success:{
      style:{
        border:'1px solid  #16a34a',
        color:"#16a34a"
      }
      
      },
      error:{
     style:{
      border:'1px solid #dc2626',
      color:'#dc2626'
     }

      }


    }
  }


   />

    <Routes>
      <Route path="/" element={<LoginForm />} /> 
      <Route path="/register" element={<RegisterPage />} />
      <Route path="stundent/Dashboard" element={<ProtectRoutes allowedRole='student'>
       <StudentDashboard/>
      </ProtectRoutes>} />
      <Route path="teacher/DashBoard" element={<ProtectRoutes allowedRole='teacher'>
       <TeacherDashBoard/>
      </ProtectRoutes>} />
      
    </Routes>
  </InfoProvider>

  );
};

export default App;
