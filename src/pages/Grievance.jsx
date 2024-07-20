import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GrievanceForm from '../components/GrievanceForm';

export default function Grievance() {
  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      alert('No token found, please login first.');
      window.location.href = '/login_user'; // Replace with appropriate redirect
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        const email = decodedToken.email;
        if (role !== 'user') {
          alert('Invalid user role, please login with a valid user account.');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('role');
          sessionStorage.removeItem('email');
          window.location.href = '/login_user'; // Replace with appropriate redirect
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        alert('Error decoding token, please login again.');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('email');
        window.location.href = 'signup.html'; // Replace with appropriate redirect
      }
    }
  }, []);

  const links = [
    { onClick: () => window.history.back(), label: 'Back' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header links={links} />
      <div className="flex flex-grow">
        {/* <SideNavbar /> */}
        <GrievanceForm />
      </div>
      <Footer />
    </div>
  );
}
