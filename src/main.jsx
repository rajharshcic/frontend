import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css'
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Grievance from './pages/Grievance.jsx';
import GrievanceUnregistered from './pages/GrievanceUnregistered.jsx';
import StatusCheck from './pages/StatusCheck.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login_admin" element={<AdminLogin />} />
        <Route path="/login_user" element={<UserLogin />} />
        <Route path="/dashboard_user" element={<UserDashboard />} />
        <Route path="/dashboard_admin" element={<AdminDashboard />} />
        <Route path="/grievance" element={<Grievance />} />
        <Route path="/grievance_unregistered" element={<GrievanceUnregistered />} />
        <Route path="/status_check" element={<StatusCheck />} />
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);
