import React, { useState, useRef } from 'react';
import InputBox from './InputBox';
import Button from './Button';
import SelectBox from './SelectBox';
import ReCAPTCHAComponent from './ReCAPTCHAComponent';
import config from './config';

export default function GrievanceUnregisteredForm() {
  const [file, setFile] = useState(null);
  const [showOtherIdType, setShowOtherIdType] = useState(false);
  const formRef = useRef(null);

  const handleIdTypeChange = (event) => {
    setShowOtherIdType(event.target.value === 'Others');
  };
  // ReCAPTCHA
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [verifiedRecaptcha, setVerifiedRecaptcha] = useState(false);
  const [reloadRecaptcha, setReloadRecaptcha] = useState(false);
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setVerifiedRecaptcha(true);
  };
  // ReCAPTCHA

  const idTypeOptions = [
    { value: 'Select', label: 'Select' },
    { value: 'Aadhar', label: 'Aadhar' },
    { value: 'Voter Card', label: 'Voter Card' },
    { value: 'Driving Licence', label: 'Driving Licence' },
    { value: 'Pan Card', label: 'Pan Card' },
    { value: 'Passport', label: 'Passport' },
    { value: 'Others', label: 'Others' },
  ];

  const sendRequest = (data) => {
    // API Call
    fetch('http://https://agrim-grievance.onrender.com/add_grievance_unregistered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          formRef.current.reset();
          alert('Grievance successfully Registered!!!');
          window.location.href = '/dashboard_user';
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataAll = Object.fromEntries(formData.entries());
    var data = {};

    // Read file content as Base64 string
    if (file){
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileContent = reader.result.split(',')[1]; // Get the Base64 string
      
        data = {
          name : dataAll.name,
          email : dataAll.email,
          phone : dataAll.phone,
          idtype : dataAll.idtype,
          otherId : dataAll.otherId,
          uniqueid : dataAll.uniqueid,
          title : dataAll.title,
          grievance : dataAll.grievance,
          category : dataAll.category,
          fileName : file.name,
          fileContent : fileContent,
        };
        if (config.enableRecaptcha) {
          data.recaptchaToken = recaptchaToken;
        }
        sendRequest(data);
      };
      reader.readAsDataURL(file);
    } else {
      data = {
        name : dataAll.name,
        email : dataAll.email,
        phone : dataAll.phone,
        idtype : dataAll.idtype,
        otherId : dataAll.otherId,
        uniqueid : dataAll.uniqueid,
        title : dataAll.title,
        grievance : dataAll.grievance,
        category : dataAll.category,
        fileName : '',
        fileContent : '',
      };
      if (config.enableRecaptcha) {
        data.recaptchaToken = recaptchaToken;
      }
      sendRequest(data);
    }
  };

  return (
    <div className="flex-grow p-8">
      <h1>File a Grievance</h1> <br />
      <form ref={formRef} onSubmit={handleSubmit}>
        <InputBox type="text" id="name" name="name" required={true} label="Name" />
      
        <InputBox type="email" id="email" name="email" required={true} label="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />

        <InputBox type="number" id="phone" name="phone" required={true} label="Phone Number" />

        <SelectBox id="idtype" name="idtype" required={true} label="Id Type" options={idTypeOptions} onChange={handleIdTypeChange} />
        {showOtherIdType && (
          <InputBox type="text" id="otherIdType" name="otherIdType" label="Please specify other ID type" />
        )}

        <InputBox type="text" id="uniqueid" name="uniqueid" required={true} label="Unique Id" />

        <InputBox type="text" id="title" name="title" label="Title:" required={true} />
        
        <label htmlFor="grievance" className="block text-gray-700 mt-4"> Grievance:</label>
        <textarea id="grievance" name="grievance" placeholder="Grievance" className="w-full px-3 py-2 border border-gray-300 rounded-md" required={true} />
        
        <InputBox type="text" id="category" name="category" label="Category:" required={true} />
        
        <div id="file-upload-container" className="mt-4">
          <label htmlFor="file" className="block text-gray-700">Upload File:</label>
          <input type="file" id="file" name="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.mp3,.wav,.mp4,.avi,.mov" onChange={(e) => setFile(e.target.files[0])} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        {/* ReCAPTCHA */}
        {config.enableRecaptcha && (
          <ReCAPTCHAComponent key={reloadRecaptcha ? 'reload' : 'normal'} onChange={(token) => handleRecaptchaChange(token)} />
        )}
        {/* ReCAPTCHA */}
        <div className="mt-4">
          <Button type="submit" className={'bg-green-500'} disabled={config.enableRecaptcha && !verifiedRecaptcha}>Submit</Button>
        </div>
      </form>
    </div>
  );
}
