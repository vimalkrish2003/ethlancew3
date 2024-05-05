import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { fetchProjectDetailsById } from '../../firebase/fetchDetails';

const BidForm = ({ onSubmit }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [proposal, setProposal] = useState('');
  const [projectDetails, setProjectDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { projectId } = useParams();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bidAmount || !deliveryTime || !proposal) {
      alert('Please fill out all fields');
      return;
    }
    onSubmit({
      projectId,
      bidAmount,
      deliveryTime,
      proposal,
    });
    setBidAmount('');
    setDeliveryTime('');
    setProposal('');
  };

  const OrangeButton = styled(Button)({
    backgroundColor: '#fe9e0d',
    color: 'white',
    '&:hover': {
      backgroundColor: '#fe9e0d',
    },
  });

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
          <Typography variant="h6" gutterBottom>Bid Details</Typography>
          <TextField
            label="Bid Amount ($)"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Delivery Time (days)"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Proposal"
            placeholder="Enter proposal..."
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <OrangeButton type="submit" variant="contained" fullWidth>
            Submit Bid
          </OrangeButton>
        </form>
      </Paper>
    </Box>
  );
};

export default BidForm;
