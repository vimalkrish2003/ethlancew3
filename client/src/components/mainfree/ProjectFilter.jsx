import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
  Slider,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    width: 250,
    backgroundColor: "#f0f0f0",
    position: "fixed",
    top: 0,
    left: ({ isOpen }) => (isOpen ? 0 : -250),
    bottom: 0,
    zIndex: 1000,
    padding: theme.spacing(2),
    overflowY: "auto",
    transition: "left 0.3s ease-in-out",
  },
  closeButton: {
    marginBottom: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  filterSection: {
    marginBottom: theme.spacing(2),
  },
  applyButton: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const ProjectFilter = ({ applyFilters, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    location: "",
    skills: "",
    expertiseLevel: "",
    rateRange: [0, 100],
    availability: "",
  });
  const classes = useStyles({ isOpen });

  useEffect(() => {
    // Load filters from localStorage when component mounts
    const storedFilters = JSON.parse(localStorage.getItem("filters"));
    if (storedFilters) {
      setFilters(storedFilters);
    }
  }, []); // Empty dependency array to run only once on mount

  const handleApplyFilters = () => {
    applyFilters(filters);
    setIsOpen(false);
    onClose();
    localStorage.setItem("filters", JSON.stringify(filters)); // Store filters in localStorage
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      location: "",
      skills: "",
      expertiseLevel: "",
      rateRange: [0, 100],
      availability: "",
    });
    applyFilters({});
    setIsOpen(false);
    onClose();
    localStorage.removeItem("filters"); // Remove stored filters from localStorage
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.name;
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: prevFilters.categories.includes(selectedCategory)
        ? prevFilters.categories.filter((category) => category !== selectedCategory)
        : [...prevFilters.categories, selectedCategory],
    }));
  };

  return (
    <>
      <div className={classes.filterContainer}>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">Filter Projects</Typography><br/>
        {/* Category filter */}
        <div className={classes.filterSection}>
          <Typography variant="subtitle1">Category</Typography>
          <FormControlLabel
            control={<Checkbox checked={filters.categories.includes("Web Development")} onChange={handleCategoryChange} name="Web Development" />}
            label="Web Development"
          />
          <FormControlLabel
            control={<Checkbox checked={filters.categories.includes("Graphic Design")} onChange={handleCategoryChange} name="Graphic Design" />}
            label="Graphic Design"
          />
          <FormControlLabel
            control={<Checkbox checked={filters.categories.includes("Writing")} onChange={handleCategoryChange} name="Writing" />}
            label="Writing"
          />
        </div>
        {/* Skills filter */}
        <div className={classes.filterSection}>
          <Typography variant="subtitle1">Skills</Typography>
          <TextField
            fullWidth
            value={filters.skills}
            onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
            placeholder="Enter skills..."
          />
        </div>
        {/* Expertise Level filter */}
        <div className={classes.filterSection}>
          <Typography variant="subtitle1">Expertise Level</Typography>
          <FormControl fullWidth>
            <Select
              value={filters.expertiseLevel}
              onChange={(e) => setFilters({ ...filters, expertiseLevel: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Expert">Expert</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* Rate Range filter */}
        <div className={classes.filterSection}>
          <Typography variant="subtitle1">Rate Range</Typography>
          <Slider
            value={filters.rateRange}
            onChange={(e, newValue) => setFilters({ ...filters, rateRange: newValue })}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={100}
          />
        </div>
        {/* Availability filter */}
        <div className={classes.filterSection}>
          <Typography variant="subtitle1">Availability</Typography>
          <FormControl fullWidth>
            <Select
              value={filters.availability}
              onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Immediate">Immediate</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Full-time">Full-time</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* Apply button */}
        <Button
          variant="contained"
          color="primary"
          className={classes.applyButton}
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
        <br/><br/>
        {/* Clear button */}
        <Button
          variant="outlined"
          color="primary"
          className={classes.applyButton}
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </>
  );
};

export default ProjectFilter;
