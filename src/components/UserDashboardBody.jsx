import React, { Component } from 'react';

class UserDashboardBody extends Component {
  render() {
    const { userDetails, usergrievances } = this.props;
    
    return (
      <div className="flex-grow p-8">
        <h2 className="text-2xl mb-4">Welcome, {userDetails.name}!</h2>
        <ul>
          <li>Name: {userDetails.name}</li>
          <li>Email: {userDetails.email}</li>
          <li>Phone: {userDetails.phone}</li>
          <li>ID Type: {userDetails.idtype}</li>
          <li>Unique ID: {userDetails.uniqueid}</li>
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
            </tr>
          </thead>
          <tbody>
            {usergrievances.map((grievance) => (
              <tr key={grievance.grievanceId}>
                <td>{grievance.grievanceId}</td>
                <td>{grievance.title}</td>
                <td>{grievance.grievance}</td>
                <td>{grievance.category}</td>
                <td>{grievance.submissionDate}</td>
                <td>{grievance.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserDashboardBody;
