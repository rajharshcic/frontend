import { React, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminDashboardBody from '../components/AdminDashboardBody';
import { handleLogout, fetchDetails, handleUnauthorized } from '../components/Functions';
import { jwtDecode } from 'jwt-decode';

export default function AdminDashboard() {
  const [adminDetails, setAdminDetails] = useState({});
  const [grievances, setGrievances] = useState([]);
  const links = [
    { onClick: handleLogout, label: 'Logout' },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      // API Call
      if (role === 'admin') {
        fetchDetails(token, 'http://https://agrim-dashboard.onrender.com/admin_dashboard', setAdminDetails, setGrievances )
      } else {
        handleUnauthorized();
      }
    } else {
      handleUnauthorized();
    }
  }, []);

  const updateGrievanceStatus = async (grievanceId, status) => {
    const token = sessionStorage.getItem('token');
    try {
      // API Call
      const response = await fetch('http://https://agrim-grievance.onrender.com/update_grievance_status', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ grievanceId, status }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Grievance status updated successfully!');
        setGrievances((prevGrievances) =>
          prevGrievances.map((grievance) =>
            grievance.grievanceId === grievanceId ? { ...grievance, status } : grievance
          )
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating grievance status:', error);
      alert('An error occurred while updating grievance status.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header links={links} />
      <div className="flex flex-grow">
        <AdminDashboardBody 
          adminDetails={adminDetails}
          grievances={grievances}
          updateGrievanceStatus={updateGrievanceStatus}
        />
      </div>
      <Footer />
    </div>
  );
}
