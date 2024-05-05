import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import './ClientPage.css'
// Reusable ProjectCard component


const ProjectDetails = () => {
  const { projectId } = useParams(); // Get the projectId from the URL params
  const [project, setProject] = useState(null);
  const [bids, setBids] = useState([]);
  const [showBids, setShowBids] = useState(false); // State to store the project data
  const navigate = useNavigate();

  useEffect(() => {
    const dummyProject = {
        jobTitle: "Logo Design",
        projectOutline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        prize: "$100",
        expectedDelivery: "1 week",
      };
    // Empty dependency array to run this effect only once when the component mounts

  // Function to fetch project details from the backend
  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/user/${projectId}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data); // Update the project state with the fetched data
      } else {
        throw new Error("Failed to fetch project details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchBids = async () => {
    try {
      // Fetch bids for the project
      const bidsResponse = await fetch(`http://localhost:8000/bids/${projectId}`);
      if (bidsResponse.ok) {
        const bidsData = await bidsResponse.json();
        setBids(bidsData);
      } else {
        throw new Error("Failed to fetch bids");
      }
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };
  setProject(dummyProject);
  fetchProjectDetails();
  fetchBids();
}, [projectId]);

  

  // Function to handle button click and navigate to view bids page
  const handleViewBids = () => {
    setShowBids(!showBids);
  };

  // Render loading message while project details are being fetched
  if (!project) {
    return <p>Loading project details...</p>;
  }

  // Render project details once fetched
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
            <div key={index}>
              <p>Freelancer: {bid.freelancer}</p>
              <p>Amount: {bid.amount}</p>
            </div>
          ))}
        </div>
      )}
      <Link to={`/clientpage`} className="back-to-projects-button">Back to Projects</Link>
    </div>
  );
};



export default ProjectDetails;
