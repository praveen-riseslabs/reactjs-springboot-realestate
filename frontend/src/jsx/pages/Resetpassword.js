// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// const ResetPassword = () => {
//   const navigate = useNavigate();
//  const {token} = useParams();
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleResetPassword = async () => {
//     try {
//       if (password !== confirmPassword) {
//         setError('Passwords do not match');
//         return;
//       }
 
//       const response = await axios.post(
//         `http://localhost:8086/api/public/reset_password?token=${token}&password=${password}`
//       );

//       console.log('Password reset successful', response);
//       navigate('/login');
//     } catch (error) {
//       console.error('Error resetting password', error.message);
//       setError('Error resetting password. Please try again.');
//     }
//   };
//   console.log(token)

//   return (
//     <div className='container bg-light p-5 m-5'>
//       <label className='form-label'>New Password:</label>
//       <input
//         className='form-control'
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <label className='form-label mt-3'>Confirm Password:</label>
//       <input
//         className='form-control'
//         type="password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//       />
//       {error && <div className="text-danger mt-2">{error}</div>}
//       <button className='btn btn-info mt-3' onClick={handleResetPassword}>
//         Reset Password
//       </button>
//     </div>
//   );
// };

// export default ResetPassword;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const location = useLocation();
  const [token, setToken] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    // Set the token state variable
    setToken(token);
  }, [location.search]);




 
  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
 
      const response = await axios.post(
        `http://localhost:8086/api/public/reset_password?token=${token}&password=${password}`
        
      );

      console.log('Password reset successful', response);
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password', error.message);
      setError('Error resetting password. Please try again.');
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
      <label className='form-label mt-3'>Confirm Password:</label>
      <input
        className='form-control'
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <div className="text-danger mt-2">{error}</div>}
      <button className='btn btn-info mt-3' onClick={handleResetPassword}>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;