import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BidForm = ({ projectId, onSubmit }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [proposal, setProposal] = useState('');

  // Sample project details
  const sampleProjectDetails = {
    id:1,
    title: 'Create a Website for E-commerce Store',
    description: 'Build a responsive e-commerce website with product listings, cart functionality, and checkout.',
    budget: '$5000 - $7000',
    deadline: 'Deadline: 2 months',
  };

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
          <Typography variant="h6">{sampleProjectDetails.title}</Typography>
          <Typography>{sampleProjectDetails.description}</Typography>
          <Typography>{sampleProjectDetails.budget}</Typography>
          <Typography>{sampleProjectDetails.deadline}</Typography>
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
