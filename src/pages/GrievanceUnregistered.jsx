import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GrievanceUnregisteredForm from '../components/GrievanceUnregisteredForm';

export default function GrievanceUnregistered() {
  const links = [
    // { onClick: () => window.location.href = '/', label: 'Back' },
    { onClick: () => window.history.back(), label: 'Back' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header links={links} />
      <div className="flex flex-grow">
        {/* <SideNavbar /> */}
        <GrievanceUnregisteredForm />
      </div>
      <Footer />
    </div>
  );
}
