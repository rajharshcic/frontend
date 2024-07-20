import React, { useState, useRef } from 'react';
import InputBox from './InputBox';
import Button from './Button';

export default function GrievanceForm() {
  const [title, setTitle] = useState('');
  const [grievance, setGrievance] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const formRef = useRef(null);
  const token = sessionStorage.getItem('token');

  const sendRequest = (data) => {
    // API Call
    fetch('https://agrim-grievance.onrender.com/add_grievance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          formRef.current.reset();
          alert('Grievance successfully Registered!!!');
          window.location.href = '/dashboard_user';
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
    var data = {};

    // Read file content as Base64 string
    if (file){
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileContent = reader.result.split(',')[1]; // Get the Base64 string
      
        data = {
          title: title,
          grievance: grievance,
          category: category,
          fileName: file.name,
          fileContent: fileContent,
        };
        sendRequest(data);
      };
      reader.readAsDataURL(file);
    } else {
      console.log(7);
      data = {
        title: title,
        grievance: grievance,
        category: category,
        fileName: '',
        fileContent: '',
      };
      sendRequest(data);
    }
  };

  return (
    <div className="flex-grow p-8">
      <h1>File Grievance</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <InputBox type="text" id="title" name="title" label="Title:" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label htmlFor="grievance" className="block text-gray-700 mt-4"> Grievance:</label>
        <textarea id="grievance" name="grievance" value={grievance} onChange={(e) => setGrievance(e.target.value)} placeholder="Grievance" className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
        <InputBox type="text" id="category" name="category" label="Category:" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <div id="file-upload-container" className="mt-4">
          <label htmlFor="file" className="block text-gray-700">
            Upload File:
          </label>
          <input type="file" id="file" name="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.mp3,.wav,.mp4,.avi,.mov" onChange={(e) => setFile(e.target.files[0])} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mt-4">
          <Button type="submit" className={'bg-green-500'}>Submit</Button>
        </div>
      </form>
    </div>
  );
}
