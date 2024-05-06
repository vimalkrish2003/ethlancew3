import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Slide,
} from "@mui/material";

const sampleBids = [
  {
    projectId: "1",
    clientAddress: "123 Main St, City",
    freelancerAddress: "sdadada",
    proposal: "I will create a modern and responsive design.",
    deliveryTime: "2 weeks",
    bidAmount: "$1000",
    statusFlag: 0,
  },
  {
    projectId: "2",
    clientAddress: "789 Oak St, City",
    freelancerAddress: "101 Pine St, City",
    proposal: "I will provide 3 unique logo concepts.",
    deliveryTime: "1 week",
    bidAmount: "$500",
    statusFlag: 1,
  },
  {
    projectId: "3",
    clientAddress: "222 Maple St, City",
    freelancerAddress: "333 Cedar St, City",
    proposal: "I will deliver high-quality content.",
    deliveryTime: "3 days",
    bidAmount: "$300",
    statusFlag: -1,
  },
];

const MyBidsPage = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const userAddress = "sdadada"; // Sample user address
    const filteredBids = sampleBids.filter(
      (bid) => bid.freelancerAddress === userAddress
    );
    setBids(filteredBids);
  }, []);

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
    <div style={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom style={{ color: "black" }}>
        My Bids
      </Typography>
      <Grid container spacing={2}>
        {bids.map((bid) => (
          <Grid item xs={12} key={bid.projectId}>
            <Slide direction="left" in={true} timeout={500}>
              <Card elevation={3} style={{ backgroundColor: "white" }}>
                <CardContent style={{ color: "white" }}>
                  
                  <Typography gutterBottom style={{ color: "orange" }}>
                    Proposal: {bid.proposal}
                  </Typography>
                  <Typography gutterBottom style={{ color: "orange" }}>
                    Delivery Time: {bid.deliveryTime}
                  </Typography>
                  <Typography gutterBottom style={{ color: "orange" }}>
                    Bid Amount: {bid.bidAmount}
                  </Typography>
                  <Typography style={{ color: "orange" }}>
                    Status: {getStatusLabel(bid.statusFlag)}
                  </Typography>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyBidsPage;
