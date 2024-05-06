import React, { useState, useEffect } from "react";
import { Link,  useNavigate } from "react-router-dom";
import "./ClientPage.css";
import Navbar from "./Header/Header";
import {useAuth} from "../../contexts/authUserContext";
import {fetchProjectDetailsByClient} from "../../firebase/fetchDetails";
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
  const [projects, setProjects] = useState([]);
  const {userAddress} = useAuth();
  useEffect(() => {
    async function fetchData() {
      const projectdetails = await fetchProjectDetailsByClient(userAddress);
      setProjects(projectdetails || []);
    }
    fetchData();
  }, []); // Empty dependency array to run this effect only once when the component mounts

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