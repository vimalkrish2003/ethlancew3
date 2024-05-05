import React from 'react';
import styles from './payment.css'
import { Link } from 'react-router-dom';

const PaymentPage = ({ projectName, freelancerName, bidAmount }) => {
  // Dummy values for demonstration
  const dummyProjectName = "Logo Design";
  const dummyFreelancerName = "John Doe";
  const dummyBidAmount = "$100";

  const handlePayNow = () => {
    // Add any functionality here if needed
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentBox}>
      <h2>Make the Payment</h2></div>
      <div className="payment-info">
        <div className="row">
          <div className="label">Project Name:</div>
          <div className="value">{projectName || dummyProjectName}</div>
          {/* Use dummyProjectName if projectName is not provided */}
        </div>
        <div className="row">
          <div className="label">Freelancer Name:</div>
          <div className="value">{freelancerName || dummyFreelancerName}</div>
          {/* Use dummyFreelancerName if freelancerName is not provided */}
        </div>
        <div className="row">
          <div className="label">Bid Amount:</div>
          <div className="value">{bidAmount || dummyBidAmount}</div>
          {/* Use dummyBidAmount if bidAmount is not provided */}
        </div>
      </div>
      <div className="payment-button">
        {/* Add your payment processing button here */}
        <button onClick={handlePayNow}>Pay Now</button>
      </div>
      <div className="cancel-button">
        {/* Add your payment processing button here */}
        <Link to="/clientpage">
          <button>Cancel</button>
        </Link>
        </div>
      </div>
   
  );
};

export default PaymentPage;
