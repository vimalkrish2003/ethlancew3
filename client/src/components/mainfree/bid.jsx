import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3'; // Import web3 library
import PlaceBidABI from '../../contracts/PlaceBid.json';
import { useParams } from 'react-router-dom';
import { fetchProjectDetailsById } from '../../firebase/fetchDetails';

const BidForm = ({ onSubmit }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [proposal, setProposal] = useState('');
  const [projectDetails, setProjectDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const abi = PlaceBidABI.abi;
  useEffect(() => {
    const fetchProjectDetails = async () => {
      const details = await fetchProjectDetailsById(projectId);
      setProjectDetails(details);
      setIsLoading(false);
    };

    fetchProjectDetails();
  }, [projectId]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  
  const handleProposalChange = (e) => {
    setProposal(e.target.value);
  };

  const handleDeliveryTimeChange = (e) => {
    setDeliveryTime(e.target.value);
  };

  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };
  
 const handleSubmit = async (e) => {

    e.preventDefault();
  
    if (!window.ethereum) {
      toast.error('MetaMask extension not detected. Please install MetaMask to place bids.');
      return;
    }
  
    try {
      // Request MetaMask to connect
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Connect to Ethereum provider
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      // Initialize contract instance
      const contractAddress = '0x628cD4e2c1a93Da850E06B829d20d41a99d52168';
      const contract = new web3.eth.Contract(abi, contractAddress);
  
      // Get the project ID from your state or another source
      const projectId = 1; // Replace this with your project ID
      const clientAddress = accounts[0]; // Assuming the client's address is the current account
      const freelancerAddress = accounts[0]; // Replace this with the freelancer's address
  
      // Call contract method to place bid with bidStatus set to Pending
      await contract.methods.placeBid(
        projectId,
        freelancerAddress,
        proposal,
        parseInt(deliveryTime),
        parseInt(bidAmount),
        0
      ).send({ from: clientAddress });
  
      toast.success('Bid placed successfully!');
  
      // Retrieve and display bid data after placing the bid
      const updatedBidData = await getBidData(contract, projectId);
      setBidData(updatedBidData);
      console.log(updatedBidData);
  
      // navigate('/freelancerdashboard');
    } catch (error) {
      console.error('Error placing bid: ', error);
      toast.error('Failed to place bid: ' + error.message);
    }
  };
    const OrangeButton = styled(Button)({
    backgroundColor: '#fe9e0d',
    color: 'white',
    '&:hover': {
      backgroundColor: '#fe9e0d',
    },
  });

  const getBidData = async (contract, projectId) => {
    try {
      const bidsCount = await contract.methods.getBidsCount(projectId).call();
      console.log('Bids Count:', bidsCount);
  
      const bids = [];
      for (let i = 0; i < bidsCount; i++) {
        const bid = await contract.methods.getBid(projectId, i).call();
        console.log('Bid:', bid);
        bids.push(bid);
      }
      console.log('Bids:', bids); // Log the bid data to the console
      return bids;
    } catch (error) {
      console.error('Error retrieving bid data: ', error);
      toast.error('Failed to retrieve bid data: ' + error.message);
      return [];
    }
  };
  
  
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px' }}>

        {/* Project Details */}
          
        <Box mb={2} textAlign="center">
          <Typography variant="h6">{projectDetails.jobTitle}</Typography>
          <Typography>{projectDetails.projectOutline}</Typography>
          <Typography>{projectDetails.description}</Typography>
          <Typography>{projectDetails.maximumPay}</Typography>
        </Box>

        {/* Bid Form */}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Bid Amount ($)"
            value={bidAmount}
            onChange={handleBidAmountChange}
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Delivery Time (days)"
            value={deliveryTime}
            onChange={handleDeliveryTimeChange}
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Proposal"
            placeholder="Enter proposal..."
            value={proposal}
            onChange={handleProposalChange}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          {/* No need to include BidStatus field in the form since it's always Pending */}
          <OrangeButton type="submit" variant="contained" fullWidth>
            Submit Bid
          </OrangeButton>
        </form>
      </Paper>
    </Box>
  );
};

export default BidForm;
