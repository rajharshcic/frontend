import { React, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import { jwtDecode } from 'jwt-decode'

export default function UserLogin() {
  const links = [
    { path: '/signup', label: 'Sign Up' },
    { path: '/login_admin', label: 'Admin Login' },
    { onClick: () => window.history.back(), label: 'Back' },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      if (role === 'admin') {
        alert("Redirecting to admin dashboard.");
        window.location.href = '/dashboard_admin';
      
      } else {
        alert("Redirecting to user dashboard.");
        window.location.href = '/dashboard_user';
      }
    }
  }, []);
  // API Call
  return (
    <div className="flex flex-col min-h-screen">
      <Header links={links} />
      <div className="flex flex-grow">
        {/* <SideNavbar /> */}
        <LoginForm fetchUrl="https://agrim-auth.onrender.com/login_user" title="User Login" />
      </div>
      <Footer />
    </div>
  );
}
