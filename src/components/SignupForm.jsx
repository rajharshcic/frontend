import React, { useState, useRef } from 'react';
import InputBox from './InputBox';
import SelectBox from './SelectBox';
import Button from './Button';

export default function SignupForm() {
  const [showOtherIdType, setShowOtherIdType] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [readOnlyEmail, setReadOnlyEmail] = useState(false);
  const [readOnlyOtp, setReadOnlyOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const formRef = useRef(null);

  const handleIdTypeChange = (event) => {
    setShowOtherIdType(event.target.value === 'Others');
  };

  const idTypeOptions = [
    { value: 'Select', label: 'Select' },
    { value: 'Aadhar', label: 'Aadhar' },
    { value: 'Voter Card', label: 'Voter Card' },
    { value: 'Driving Licence', label: 'Driving Licence' },
    { value: 'Pan Card', label: 'Pan Card' },
    { value: 'Passport', label: 'Passport' },
    { value: 'Others', label: 'Others' },
  ];

  const roleOptions = [
    { value: 'Select', label: 'Select' },
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' },
  ];

  const handleSendOTP = () => {
    if (email.trim() === '') {
      alert('Email field cannot be empty.');
      return;
    }
    // API Call
    fetch('http://https://agrim-auth.onrender.com/email_verify_otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setOtpSent(true);
          setReadOnlyEmail(true);
          alert(data.message + ' Please Verify');
        } else {
          alert(data.message);
        }
      })
      .catch(() => {
        alert('An error occurred');
      });
  };

  const handleVerify = () => {
    if (otp.trim() === '') {
      alert('Otp field cannot be empty.');
      return;
    }
    // API Call
    fetch('http://https://agrim-auth.onrender.com/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setOtpVerified(true);
          setReadOnlyOtp(true);
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch(() => {
        alert('An error occurred');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    // API Call
    fetch('http://https://agrim-auth.onrender.com/signup', {
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
          window.location.href = data.role === 'user' ? '/login_user' : '/login_admin';
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
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <InputBox type="text" id="name" name="name" required={true} label="Name" />

        <InputBox type="email" id="email" name="email" readOnly={readOnlyEmail} required={true} label="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={(e) => setEmail(e.target.value)} />

        <Button type="button" className="bg-green-500" disabled={otpSent} onClick={handleSendOTP} name="send_otp" id="send_otp">Send OTP</Button>

        {otpSent && (
          <>
            <InputBox type="text" id="otp" name="otp" required={true} readOnly={readOnlyOtp} label="OTP" onChange={(e) => setOtp(e.target.value)} />
            <Button type="button" className="bg-green-500" onClick={handleVerify} name="verify" id="verify" disabled={otpVerified}>Verify</Button>
          </>
        )}

        <InputBox type="number" id="phone" name="phone" required={true} label="Phone Number" />

        <SelectBox id="idtype" name="idtype" required={true} label="Id Type" options={idTypeOptions} onChange={handleIdTypeChange} />
        {showOtherIdType && (
          <InputBox type="text" id="otherIdType" name="otherIdType" label="Please specify other ID type" />
        )}

        <InputBox type="text" id="uniqueid" name="uniqueid" required={true} label="Unique Id" />

        <SelectBox id="role" name="role" required={true} label="Role" options={roleOptions} />

        <InputBox type="password" id="password" name="password" required={true} label="Password" />

        <Button type="submit" className="bg-blue-500" disabled={!otpVerified}>Sign Up</Button>
      </form>
    </div>
  );
}
