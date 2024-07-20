import React, { useState, useRef } from 'react';
import InputBox from './InputBox';
import Button from './Button';
import ReCAPTCHAComponent from './ReCAPTCHAComponent';
import config from './config';

export default function StatusCheckForm() {
  const [statusData, setStatusData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const formRef = useRef(null);
  // ReCAPTCHA
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [verifiedRecaptcha, setVerifiedRecaptcha] = useState(false);
  const [reloadRecaptcha, setReloadRecaptcha] = useState(false);
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setVerifiedRecaptcha(true);
  };
  // ReCAPTCHA


  const handleSubmit = (event) => {
    event.preventDefault();
    setStatusData(null);
    setUserStatus(null);
    setUserData(null);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (config.enableRecaptcha) {
      data.recaptchaToken = recaptchaToken;
    }
    // API Call
    fetch('https://agrim-grievance.onrender.com/check_status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          formRef.current.reset(); 
          if (data.user === 'UR') {
            setStatusData(data.status[0]);
          } else if (data.user === 'R') {
            setUserStatus(data.status[0]);
            setUserData(data.status[1]);
          } else {
            alert(data.message);
          }
          // ReCAPTCHA
          setReloadRecaptcha(prevState => !prevState);
          setRecaptchaToken(null);
          setVerifiedRecaptcha(false);
          // ReCAPTCHA
        } else {
          alert(data.message);
        }
      })
      .catch(() => {
        alert('An error occurred');
      });
  };

  return (
    <div className="flex-grow p-8">
      <h1>Check Grievance Status</h1> <br />
      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="grievanceId">Grievance ID:</label><br />
        <InputBox type="text" name="grievanceId" id="grievanceId" placeholder="Enter Grievance ID" required />
        {/* ReCAPTCHA */}
        {config.enableRecaptcha && (
          <ReCAPTCHAComponent key={reloadRecaptcha ? 'reload' : 'normal'} onChange={(token) => handleRecaptchaChange(token)} />
        )}
        {/* ReCAPTCHA */}
        <Button type="submit" className={'bg-green-500'} disabled={config.enableRecaptcha && !verifiedRecaptcha}>Check Status</Button>
      </form>
      <br />
      {statusData && (
        <div className="status-container">
          <p><strong>Grievance ID:</strong> {statusData.grievanceId}</p>
          <p><strong>Name:</strong> {statusData.name}</p>
          <p><strong>Email:</strong> {statusData.email}</p>
          <p><strong>Phone:</strong> {statusData.phone}</p>
          <p><strong>ID Type:</strong> {statusData.idtype}</p>
          <p><strong>Unique ID:</strong> {statusData.uniqueid}</p>
          <p><strong>Title:</strong> {statusData.title}</p>
          <p><strong>Grievance:</strong> {statusData.grievance}</p>
          <p><strong>Category:</strong> {statusData.category}</p>
          <p><strong>Submission Date:</strong> {statusData.submissionDate}</p>
          <p><strong>Status:</strong> {statusData.status}</p>
        </div>
      )}

      {userStatus && (
        <div className="status-container">
          <p><strong>Grievance ID:</strong> {userStatus.grievanceId}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>ID Type:</strong> {userData.idtype}</p>
          <p><strong>Unique ID:</strong> {userData.uniqueid}</p>
          <p><strong>Title:</strong> {userStatus.title}</p>
          <p><strong>Grievance:</strong> {userStatus.grievance}</p>
          <p><strong>Category:</strong> {userStatus.category}</p>
          <p><strong>Submission Date:</strong> {userStatus.submissionDate}</p>
          <p><strong>Status:</strong> {userStatus.status}</p>
        </div>
      )}
      <br />
    </div>
  );
}
