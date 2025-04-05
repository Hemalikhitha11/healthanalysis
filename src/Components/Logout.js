import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login'); // Redirect to login page
  }, [navigate]);

  return null;
}

export default Logout;
