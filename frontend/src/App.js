import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import LocationLayout from './LocationLayout';
import Home from './com/home';
import Location from './com/location';
import Hotel from './com/hotel';
import Feed from './com/feedback';
import AdminHome from './admin/home';
import AdminLogin from './admin/AdminLogin';
import SchedulerHome from './scheduler/home';
import AgentHome from './travelagent/home';
import Location_Home from './locationmanager/home';
import Newlocation from './com/newLocation';

import Schedulerlayout from './schedulerlayout';
import Travelagency from './scheduler/agency';
import PackageDetails from './scheduler/packagedetails';
import Tour from './scheduler/tours';
import Sellersignup from './scheduler/Sellersignup';





import LoginPage from './com/LoginPage';
import SignUpPage from './com/SignUpPage'; // Import the SignUpPage component


function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/LoginPage" element={<LoginPage />} />
        
        {/* Signup Route */}
        <Route path="/signup" element={<SignUpPage />} />  {/* New signup route */}

        {/* User Routes */}
        <Route path="/home" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/location" element={<UserLayout><Location /></UserLayout>} />
        <Route path="/hotel" element={<UserLayout><Hotel /></UserLayout>} />
        <Route path="/feed" element={<UserLayout><Feed /></UserLayout>} />
        <Route path="/newLocation" element={<UserLayout><Newlocation /></UserLayout>} />

        {/* Scheduler Routes */}
        <Route path="/tours" element={<Schedulerlayout><Tour /></Schedulerlayout>} />
        <Route path="/agency" element={<Schedulerlayout><Travelagency /></Schedulerlayout>} />
        <Route path="/packagedetails" element={<Schedulerlayout><PackageDetails/></Schedulerlayout>} />
        <Route path="/Sellersignup" element={<Schedulerlayout><Sellersignup/></Schedulerlayout>} />
        
        
        
        


        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />

        {/* Role-based Routes */}
        <Route path="/scheduler/home" element={<Schedulerlayout><SchedulerHome /></Schedulerlayout>} />
        <Route path="/travelagent/home" element={<AdminLayout><AgentHome /></AdminLayout>} />
        <Route path="/LocationAdmin/home" element={<LocationLayout><Location_Home /></LocationLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
