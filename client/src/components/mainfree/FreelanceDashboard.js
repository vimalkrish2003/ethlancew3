import React, { useState, useEffect } from "react";
import ProjectFilter from "./ProjectFilter";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import { Typography, IconButton, Grid, Box, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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
  const [filters, setFilters] = useState({
    categories: [],
    expertiseLevel: "",
    rateRange: [0, 10000],
    availability: "",
  });
  const classes = useStyles();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchAndFilterProjects = async () => {
      try {
        const projects = await fetchProjectDetails();
        console.log("Fetched projects:", projects); 
        const filtered = projects.filter((project) => {
          const hasMatchingCategory = filters.categories?.length > 0
            ? project.selectedSkills?.some(skill => filters.categories.includes(skill))
            : true;
      
          if (!hasMatchingCategory) {
            return false;
          }
          
          if (filters.expertiseLevel && filters.expertiseLevel !== "") {
            if (project.experienceLevel !== filters.expertiseLevel) {
              return false;
            }
          }
      
          const [minRate, maxRate] = filters.rateRange;
          if (minRate !== undefined && project.maximumPay < minRate) {
            return false;
          }
          if (maxRate !== undefined && project.maximumPay > maxRate) {
            return false;
          }
      
          if (filters.availability && filters.availability !== "") {
            if (project.jobType !== filters.availability) {
              return false;
            }
          }
          
          return true;
        });
      
        setProjects(filtered);
      } catch (error) {
        console.error("Error fetching projects:", error); // Log any errors
      }
    };
  
    fetchAndFilterProjects();
  }, [filters]);
  

  const handleBidClick = (projectId) => {
    
         navigate(`/bid/${projectId}`)
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
        <FreeHeader />
        <IconButton
          className={classes.filterIcon}
          onClick={toggleSidebar}
          style={{ position: "absolute", top: 35, left: 35 }}
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

                <Typography variant="h6">{project.projectOutline}</Typography>
                <Typography>{project.jobTitle}</Typography>
                <Typography>{project.maximumPay}</Typography>
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
