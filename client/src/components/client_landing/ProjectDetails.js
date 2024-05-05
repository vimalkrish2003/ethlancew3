import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import './ClientPage.css'

const ProjectDetails = () => {
  const { projectId } = useParams(); // Get the projectId from the URL params
  const [project] = useState({
    jobTitle: "Logo Design",
    projectOutline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    prize: "$100",
    expectedDelivery: "1 week"
  });
  const [bids] = useState([
    { 
      freelancer: "John Doe", 
      email: "john@example.com", 
      country: "USA", 
      amount: "$80" 
    },
    { 
      freelancer: "Jane Smith", 
      email: "jane@example.com", 
      country: "Canada", 
      amount: "$90" 
    },
    { 
      freelancer: "Michael Johnson", 
      email: "michael@example.com", 
      country: "UK", 
      amount: "$95" 
    }
  ]);
  const [showBids, setShowBids] = useState(false); // State to store the project data

  // Function to handle button click and toggle visibility of bids
  const handleViewBids = () => {
    setShowBids(!showBids);
  };

  // Render project details and bids
  return (
    <div className="project-details">
      <h2>Project Details</h2>
      <h3>{project.jobTitle}</h3>
      <p>Description: {project.projectOutline}</p>
      <p>Prize: {project.prize}</p>
      <p>Expected Delivery: {project.expectedDelivery}</p>
      <button onClick={handleViewBids} className="view-bids-button">
        {showBids ? "Hide Bids" : "View Bids"}
      </button>
      {showBids && (
        <div className="bids-box">
          <h3>Bids for {project.jobTitle}</h3>
          {/* Render bid details */}
          {bids.map((bid, index) => (
            <div className="bid-box" key={index}>
              <div className="bid-info">
              <div className="profile-icon-circle">
                <span className="profile-icon">👤</span>
                </div>
                <p>Freelancer: {bid.freelancer}</p>
                </div>
                <div>
                <p>Email: {bid.email}</p>
                <p>Country: {bid.country}</p>
                <p>Bid Amount: {bid.amount}</p>
              </div>
              <div className="hire-button-container">
              <Link to={`/payment/${projectId}`} className="hire-button">Hire</Link>
    </div>
            </div>
          ))}
        </div>
      )}
      <Link to={`/clientpage`} className="back-to-projects-button">Back to Projects</Link>
    </div>
  );
};

export default ProjectDetails;
