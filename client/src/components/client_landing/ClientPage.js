import React, { useState, useEffect } from "react";
import { Link,  useNavigate } from "react-router-dom";
import "./ClientPage.css";
import Navbar from "./Header/Header";
const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-box" onClick={onClick}>  {/* Wrap entire card in a clickable element */}
      <h3>{project.jobTitle}</h3>
      <p>Description: {project.projectOutline}</p>
      <p>Rate: {project.rate}</p>
      <p>Expected Delivery: {project.expectedDelivery}</p>
    </div>
  );
};
const ClientPage = ({ location }) => {
  // Check if location or state is undefined, then default to empty object and empty string respectively
  const username = location?.state?.username || "";
  const [projects, setProjects] = useState([
    {
      id: 1,
      jobTitle: " Logo Desginer for EthLance",
      projectOutline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      rate: "100",
      expectedDelivery:"1 week"
    },
    {
      id: 2,
      jobTitle: "Video Editing",
      projectOutline: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      rate: "200",
      expectedDelivery:"1 month"
    },
    {
      id: 3,
      jobTitle: " Logo Desgining for Shopify",
      projectOutline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      rate: "100",
      expectedDelivery:"1 week"
    },
     
    // Add more dummy projects as needed
  ]);
  
  useEffect(() => {
    fetchProjects();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  // Function to fetch the list of projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8000/user");
      if (response.ok) {
        const data = await response.json();
        const projectData = data.user.filter((entry) => entry.jobTitle);
        setProjects(projectData);// Update the projects state with the fetched data
      } else {
        throw new Error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
const navigate = useNavigate();
  // Function to handle button click and navigate to project details page
  const handleProjectClick = (projectId) => {
    navigate(`/projectdetails/${projectId}`);
  };

  return (
    <div>
      <div className="client-page">
        <div>
          <Navbar/>
        </div>
        <h1>Welcome, {username || "Guest"}!</h1>
        <p>This is your dashboard where you can manage your projects.</p>
        <Link to="/createproject" className="create-project-button">
          Create New Project
        </Link>
      </div>
      <div className="project-list">
        <h2>My Projects</h2>
        <div className="project-container">
          {projects.map((project) => (
             <ProjectCard
             key={project.id}
             project={project}
             onClick={() => handleProjectClick(project.id)} // Pass handleProjectClick as onClick handler
           />
         ))}
       </div>
     </div>
   </div>
 );
};

export default ClientPage;