import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusCheckForm from '../components/StatusCheckForm';

export default function StatusCheck() {
  const links = [
    { onClick: () => window.history.back(), label: 'Back' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header links={links} />
      <div className="flex flex-grow">
        <StatusCheckForm />
      </div>
      <Footer />
    </div>
  );
}
