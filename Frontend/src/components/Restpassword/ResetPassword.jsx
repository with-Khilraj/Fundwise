import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging logs
    console.log(`New Password: ${newPassword}`);
    console.log(`Confirm Password: ${confirmPassword}`);

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const payload = { newPassword, confirmPassword };
      console.log('Request Payload:', payload); // Log the payload

      const response = await axios.post(`http://localhost:5500/api/auth/reset/${token}`, payload);
      console.log('Response:', response.data); // Log response data
      setMessage(response.data.msg);
    } catch (err) {
      console.log('Error:', err.response ? err.response.data : err); // Log error details
      setMessage('Error resetting password');
    }
  };

  return (
    <div className="reset-password-container">
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
