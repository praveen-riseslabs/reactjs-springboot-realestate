import React, { useState } from 'react';
import './Registration.scss';

const Registration = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleRegistration = () => {
      // Implement your registration logic here
      console.log('Registration clicked with:', { name, email, password, confirmPassword });
    };

  return (
    <div className="App">
      <div className="registration-container">
        <h2>Registration</h2>
        <form>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Enter your confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="button" onClick={handleRegistration}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration