import React from 'react';
import './payment.css' // Assuming your CSS file
import { Link } from 'react-router-dom';

const PaymentPage = ({ projectName, freelancerName, bidAmount }) => {
  // Dummy values for demonstration
  const dummyProjectName = "Logo Design";
  const dummyFreelancerName = "John Doe";
  const dummyBidAmount = "$100";

  // Empty function for the Pay Now button
  const handlePayNow = () => {
    // Add any functionality here if needed
  };

  return (
    <div className="payment-container">
      <div className="payment-box payment-box--primary">  {/* Added modifier class */}
        <h2>Make the Payment</h2>
      </div>
      <div className="payment-details">
        <div className="payment-detail">
          <span className="payment-detail__label">Project Name:</span>
          <span className="payment-detail__value">{projectName || dummyProjectName}</span>
        </div>
        <div className="payment-detail">
          <span className="payment-detail__label">Freelancer Name:</span>
          <span className="payment-detail__value">{freelancerName || dummyFreelancerName}</span>
        </div>
        <div className="payment-detail">
          <span className="payment-detail__label">Bid Amount:</span>
          <span className="payment-detail__value">{bidAmount || dummyBidAmount}</span>
        </div>
      </div>
      <div className="payment-button">
        {/* Add your payment processing button here */}
        <button onClick={handlePayNow}>Pay Now</button>
      </div>
      <div className="cancel-button">
        {/* Add your payment processing button here */}
        <Link to="/projectdetails/:projectId">
          <button className="cancel-button__button">  {/* Added modifier class */}
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentPage;
