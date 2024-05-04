import React, { useState } from 'react';

import './signup.css';

import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    // Implement form submission logic here, including handling account type
    console.log('Signup form submitted:', accountType);
  

  if (accountType === 'employer') {
    navigate('/client'); // Redirect to /intro if employer selected
  } else if (accountType === 'freelancer') {
    navigate('/register'); // Redirect to /register if freelancer selected
  }
};

  return (
    <div className="signup-form">
      <h2 className="centered-heading">Join as a Client or Freelancer</h2>
      <form onSubmit={handleSignup}>
        <div className="account-type-container">
          {/* New container for separation */}
          <div className="account-type-heading">
            <h3>Select an account type</h3>
          </div>
          
        </div>
        <div className="account-type-selection">
          <label className="account-type-box"> {/* New class for styling */}
            <input
              type="radio"
              value="employer"
              checked={accountType === 'employer'}
              onChange={(e) => setAccountType(e.target.value)}
            />
            {/* <BsBriefcaseFill size={30} className="account-icon" />  Added icon */}
            <img  src={`${process.env.PUBLIC_URL}/images/client.png`}
        alt="Customer Support Icon"
        className="animated-icon"
      />
            Employer (I want to Hire)
          </label>
          <label className="account-type-box"> {/* New class for styling */}
            <input
              type="radio"
              value="freelancer"
              checked={accountType === 'freelancer'}
              onChange={(e) => setAccountType(e.target.value)}
            />
             <img  src={`${process.env.PUBLIC_URL}/images/freelancer.png`}
        alt="Freelancer Icon"
        className="animated-icon"
      />
            {/* <BsFillPersonFill size={30} className="account-icon" /> */}
            Freelancer (I am looking for Work)
          </label>
        </div>
        <br />
        {/* Add other signup form fields here (e.g., email, password) */}
        <button  className = "create-account-btn"type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
