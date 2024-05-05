import React, { useState, useEffect } from 'react';

const ProjectDetails = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidSubmitted, setBidSubmitted] = useState(false);

  // Sample project data
  const sampleProjects = [
    { id: 1, name: "Project 1", description: "Description of Project 1" },
    { id: 2, name: "Project 2", description: "Description of Project 2" },
    // Add more sample projects as needed
  ];

  const fetchProjectData = () => {
    try {
      // Find the project with matching ID
      const foundProject = sampleProjects.find(proj => proj.id === projectId);
      if (!foundProject) {
        throw new Error('Project not found');
      }
      setProject(foundProject);
    } catch (error) {
      console.error('Error fetching project data:', error);
      setError('Failed to fetch project data');
    }
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the bid submission logic, such as sending the bid amount to the server
    console.log('Bid submitted:', bidAmount);
    setBidSubmitted(true);
  };

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
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
