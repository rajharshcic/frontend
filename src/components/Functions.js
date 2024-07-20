export async function handleLogout() {
  const token = sessionStorage.getItem('token');
  try {
    // API Call
    const response = await fetch('http://https://agrim-auth.onrender.com/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.success) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('email');
      window.location.href = '/';
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error logging out:', error);
    alert('An error occurred while logging out.');
  }
}


export async function fetchDetails(token, apiUrl, setDetails, setGrievances ) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.success) {
      data.user ? setDetails(data.user) : setDetails(data.admin);
      setGrievances(data.grievances);
    } else {
      handleUnauthorized();
    }
  } catch (error) {
    console.error('Error fetching details:', error);
    handleUnauthorized();
  }
}

export const handleUnauthorized = () => {
  console.log('Not Logged In');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('role');
  sessionStorage.removeItem('email');
  window.location.href = '/';
};