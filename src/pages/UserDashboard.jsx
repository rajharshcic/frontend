import { React, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { jwtDecode } from 'jwt-decode'
import UserDashboardBody from '../components/UserDashboardBody';
import { handleLogout, fetchDetails, handleUnauthorized } from '../components/Functions'

export default function UserDashboard() {
  const [userDetails, setUserDetails] = useState({});
  const [grievances, setGrievances] = useState([]);
  const links = [
    { path: '/grievance', label: 'File Grievance' },
    // { path: '/status_check', label: 'Check Status' },
    { onClick: handleLogout, label: 'Logout' },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      if (role === 'user') {
        // API Call
        fetchDetails(token, 'https://agrim-dashboard.onrender.com/user_dashboard', setUserDetails, setGrievances )
      } else {
        handleUnauthorized();
      }
    } else {
      handleUnauthorized();
    }
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Header links={links} />
      <div className="flex flex-grow">
        {/* <SideNavbar /> */}
        <UserDashboardBody
          userDetails={userDetails}
          usergrievances={grievances}
        />
      </div>
      <Footer />
    </div>
  );
}
