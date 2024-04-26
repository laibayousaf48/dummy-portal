import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5'; // Import the logout icon
import { AuthContext } from '../contexts/AuthContext';

function LogoutButton() {
  const { authCtx } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useHistory hook

  const handleLogout = () => {
    localStorage.removeItem('auth.token');
    localStorage.removeItem('Response');
    localStorage.removeItem('User');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('Business ID');
    localStorage.removeItem('registrationData');
    localStorage.removeItem('OTP');
    localStorage.removeItem('pin code');
     
    console.log("Logging out...");
    window.location.href = '/login';
};
  return (
    <div className="flex gap-2 items-center" onClick={handleLogout}>
      <div><IoLogOutOutline color={"#24ACE3"} size={"24px"} /></div>
      <div><p className={"text-gray-500"}>{"Log out"}</p></div>
    </div>
  );
}

export default LogoutButton;
