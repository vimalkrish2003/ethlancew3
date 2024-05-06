import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "16px",
  },
  card: {
    marginBottom: "16px",
  },
}));

const sampleBids = [
  {
    projectId: "1",
    clientAddress: "123 Main St, City",
    freelancerAddress: "456 Elm St, City", // Unique key representing freelancer
    proposal: "I will create a modern and responsive design.",
    deliveryTime: "2 weeks",
    bidAmount: "$1000",
    statusFlag: 0, // Pending
  },
  {
    projectId: "2",
    clientAddress: "789 Oak St, City",
    freelancerAddress: "101 Pine St, City", // Unique key representing freelancer
    proposal: "I will provide 3 unique logo concepts.",
    deliveryTime: "1 week",
    bidAmount: "$500",
    statusFlag: 1, // Accepted
  },
  {
    projectId: "3",
    clientAddress: "222 Maple St, City",
    freelancerAddress: "333 Cedar St, City", // Unique key representing freelancer
    proposal: "I will deliver high-quality content.",
    deliveryTime: "3 days",
    bidAmount: "$300",
    statusFlag: -1, // Rejected
  },
];

const MyBidsPage = ({ freelancerAddress }) => {
  const classes = useStyles();
  const [bids, setBids] = useState([]);

  useEffect(() => {
    // Filter bids for the current freelancer
    const filteredBids = sampleBids.filter((bid) => bid.freelancerAddress === freelancerAddress);
    setBids(filteredBids);
  }, [freelancerAddress]);

  const getStatusLabel = (statusFlag) => {
    switch (statusFlag) {
      case 0:
        return "Pending";
      case 1:
        return "Accepted";
      case -1:
        return "Rejected";
      default:
        return "";
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        My Bids
      </Typography>
      <Grid container spacing={2}>
        {bids.map((bid) => (
          <Grid item xs={12} key={bid.projectId}>
            <Paper>
              <Card className={classes.card}>
                <CardHeader title={`Project ID: ${bid.projectId}`} />
                <CardContent>
                  <Typography gutterBottom variant="body1">
                    Client Address: {bid.clientAddress}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Freelancer Address: {bid.freelancerAddress}
                  </Typography>
                  <Divider />
                  <Typography gutterBottom variant="body1">
                    Proposal: {bid.proposal}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Delivery Time: {bid.deliveryTime}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Bid Amount: {bid.bidAmount}
                  </Typography>
                  <Typography variant="body1">
                    Status: {getStatusLabel(bid.statusFlag)}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyBidsPage;
