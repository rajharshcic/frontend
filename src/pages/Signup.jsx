import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideNavbar from '../components/SideNavbar';
import SignupForm from '../components/SignupForm';

export default function Signup() {
  const links = [
    { path: '/login_admin', label: 'Admin Login' },
    { path: '/login_user', label: 'User Login' },
    { onClick: () => window.history.back(), label: 'Back' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header links={links} />
      <div className="flex flex-grow">
        {/* <SideNavbar /> */}
        <SignupForm />
      </div>
      <Footer />
    </div>
  );
}
