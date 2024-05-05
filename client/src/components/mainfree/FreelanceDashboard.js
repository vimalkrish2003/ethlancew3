import React, { useState, useEffect } from "react";
import ProjectFilter from "./ProjectFilter";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import { Typography, IconButton, Grid, Box, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import Headerfree from "./nav";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import FreeHeader from "./nav";
import { fetchProjectDetails } from "../../firebase/fetchDetails";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFA500", // Orange color
    },
    secondary: {
      main: "#ffffff", // White color
    },
    text: {
      primary: "#000000", // Black color
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.2,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: 250,
    padding: theme.spacing(2),
    backgroundColor: "#f0f0f0",
  },
  mainContent: {
    flexGrow: 1,
    padding: theme.spacing(2),
    overflowY: "auto",
  },
  projectItem: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
  },
  placeBidButton: {
    marginLeft: theme.spacing(1),
  },
  filterIcon: {
    position: "fixed",
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: theme.zIndex.appBar + 1,
  },
}));

const FreelancerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({});

  const classes = useStyles();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchAndFilterProjects = async () => {
      const projects = await fetchProjectDetails();
      // Apply filters
      const filtered = projects.filter((project) => {
        // Apply category filter
        if (filters.categories && filters.categories.length > 0) {
          if (!filters.categories.includes(project.category)) {
            return false;
          }
        }
        return true;
      });
  
      setProjects(filtered);
    };
  
    // Call the async function
    fetchAndFilterProjects();
  }, [filters]);

  const handleBidClick = (projectId) => {
   console.log("Bid clicked for project ID: ", projectId);  
  };

  return (
    <div className={classes.container}>
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        classes={{ paper: classes.sidebar }}
      >
        <ProjectFilter applyFilters={applyFilters} onClose={() => setIsSidebarOpen(false)} />
      </Drawer>
      <div className={classes.mainContent}>
      <FreeHeader/>
      <IconButton
  className={classes.filterIcon}
  onClick={toggleSidebar}
  style={{ position: "absolute", top: 35, left: 35 }} // Adjust position here
>
  <FilterList />
</IconButton> 

       
        
        <Typography variant="h5" gutterBottom>
          Project Details
        </Typography>
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid item xs={12} key={project.id}>
              <Box className={classes.projectItem}>
                <Typography variant="h6">{project.jobTitle}</Typography>
                <Typography>{project.projectOutline}</Typography>
                <Button
                  className={classes.placeBidButton}
                  variant="contained"
                  color="primary"
                  onClick={() => handleBidClick(project.id)}
                >
                  Place Bid
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

const Free = () => {
  return (
    <ThemeProvider theme={theme}>
      <FreelancerDashboard />
    </ThemeProvider>
  );
};

export default Free;
