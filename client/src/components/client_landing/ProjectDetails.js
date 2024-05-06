import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Web3 from 'web3';
import PlaceBidABI from '../../contracts/PlaceBid.json';
import { fetchProjectDetailsById } from "../../firebase/fetchDetails";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [bids, setBids] = useState([]);
  const [showBids, setShowBids] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidSubmitted, setBidSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const projectDetails = await fetchProjectDetailsById(projectId);
      setProject(projectDetails);
    };

    fetchData();
  }, [projectId]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = PlaceBidABI.networks[networkId];
        const contract = new web3.eth.Contract(PlaceBidABI.abi, deployedNetwork && deployedNetwork.address);

        const bidsCount = await contract.methods.getBidsCount(projectId).call();
        const fetchedBids = [];
        for (let i = 0; i < bidsCount; i++) {
          const bid = await contract.methods.getBid(projectId, i).call();
          fetchedBids.push({
            freelancer: bid[0],
            email: bid[1],
            country: bid[2],
            amount: bid[4]
          });
        }
        setBids(fetchedBids);
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    };

    fetchBids();
  }, [projectId]);

  const handleViewBids = () => {
    setShowBids(!showBids);
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    console.log('Bid submitted:', bidAmount);
    setBidSubmitted(true);
  };

  return (
    <div className="project-details">
      <h2>Project Details</h2>
      <h3>{project?.jobTitle}</h3>
      <p>Description: {project?.projectOutline}</p>
      <p>Maximum Pay: {project?.maximumPay}</p>
      <p>Expected Delivery: {project?.expectedDelivery}</p>
      {isPaymentSuccessful ? (
        <button className="verify-project-button">Verify Project</button>
      ) : (
        <div>
          <button onClick={handleViewBids} className="view-bids-button">
            {showBids ? "Hide Bids" : "View Bids"}
          </button>
          {showBids && (
            <div className="bids-box">
              <h3>Bids for {project?.jobTitle}</h3>
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
        </div>
      )}
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
      <Link to={`/clientpage`} className="back-to-projects-button">Back to Projects</Link>
    </div>
  );
};

export default ProjectDetails;
