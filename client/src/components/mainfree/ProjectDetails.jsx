import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProjectDetailsById } from '../../firebase/fetchDetails';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);

  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const details = await fetchProjectDetailsById(projectId);
        setProject(details);
        setProjectDetails(details); // Set projectDetails here
      } catch (error) {
        console.error('Error fetching project details:', error);
        setError('Failed to fetch project data');
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
   
    // Here, you can handle the bid submission logic, such as sending the bid amount to the server
    console.log('Bid submitted:', bidAmount);
    setBidSubmitted(true);
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{projectDetails.projectOutline}</h2>
      <p>{projectDetails.description}</p>
      {/* Render other project details here */}
      {bidSubmitted ? (
        <div>Bid submitted successfully!</div>
      ) : (
        <form onSubmit={handleBidSubmit}>
          <label>
            Bid Amount:
            <input 
              type="number" 
              value={bidAmount} 
              onChange={(e) => setBidAmount(e.target.value)} 
            />
          </label>
          <button type="submit">Submit Bid</button>
        </form>
      )}
    </div>
  );
};

export default ProjectDetails;
