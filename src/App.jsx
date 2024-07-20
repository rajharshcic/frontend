import React from 'react';
import Header from './components/Header';

function App() {
  const links = [
    { path: '/signup', label: 'Sign Up' },
    { path: '/login_admin', label: 'Admin Login' },
    { path: '/login_user', label: 'User Login' },
    { path: '/grievance_unregistered', label: 'File Grievance' },
    { path: '/status_check', label: 'Check Status' },
  ];

  return (
    <div className="App">
      <Header links={links} />
      <div className="p-8">
        <h1>Welcome to AGRIM</h1>
      </div>
    </div>
  );
}

export default App;
