import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail } from "../../api/auth"; 
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');

      if (!token) {
        setMessage('Invalid verification link');
        toast.error('Invalid verification link');
        return;
      }

      try {
        const response = await verifyEmail(token);
        setMessage('Email verified successfully!');
        toast.success('Email verified successfully!');
        navigate('/login'); // Redirect to login after verification
      } catch (error) {
        console.error('Verification error:', error);
        setMessage('Verification failed. Please try again.');
        toast.error('Verification failed. Please try again.');
      }
    };

    verifyToken();
  }, [location, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
