import React, { Component } from 'react';

class AdminDashboardBody extends Component {
  render() {
    const { adminDetails, grievances, updateGrievanceStatus } = this.props;
    
    return (
      <div className="flex-grow p-8">
        <h2 className="text-2xl mb-4">Welcome, {adminDetails.name}!</h2>
        <ul>
          <li>Name: {adminDetails.name}</li>
          <li>Email: {adminDetails.email}</li>
          <li>Phone: {adminDetails.phone}</li>
          <li>ID Type: {adminDetails.idtype}</li>
          <li>Unique ID: {adminDetails.uniqueid}</li>
        </ul>
        <table className="min-w-full divide-y divide-gray-200 mt-4">
          <thead>
            <tr>
              <th>Grievance ID</th>
              <th>Title</th>
              <th>Grievance</th>
              <th>Category</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map((grievance) => (
              <tr key={grievance.grievanceId}>
                <td>{grievance.grievanceId}</td>
                <td>{grievance.title}</td>
                <td>{grievance.grievance}</td>
                <td>{grievance.category}</td>
                <td>{grievance.submissionDate}</td>
                <td>{grievance.status}</td>
                <td>
                  <select
                    value={grievance.status}
                    onChange={(e) => updateGrievanceStatus(grievance.grievanceId, e.target.value)}
                  >
                    <option value="Submitted">Submitted</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminDashboardBody;
