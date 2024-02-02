import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        `http://ec2-54-90-254-70.compute-1.amazonaws.com:8080/api/public/reset_password?token=${token}`,
        { password }
      );

      console.log('Password reset successful', response);
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password', error.message);
    }
  };

  return (
    <div className='container bg-light p-5 m-5'>
      <label className='form-label'>New Password:</label>
      <input
        className='form-control'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='btn btn-info mt-3' onClick={handleResetPassword}>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
