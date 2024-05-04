import React, { useState } from "react";
import CountryDropdown from "./CountryDropdown";

const WorkExperienceForm = ({ onSave }) => {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [country, setCountry] = useState("India");
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [currentlyWorking, setCurrentlyWorking] = useState(false);

    const handleSave = () => {
        if (!title || !company || !country || !yearsOfExperience) {
            alert("Please fill in all work experience fields.");
            return;
        }

        const newExperience = {
            title,
            company,
            country,
            yearsOfExperience: parseInt(yearsOfExperience),
            currentlyWorking,
        };

        onSave(newExperience); // Call parent component's onSave function with the new experience
        // Clear form fields after saving
        setTitle("");
        setCompany("");
        setCountry("India");
        setYearsOfExperience("");
        setCurrentlyWorking(false);
    };

   

    return (
        <div className="work-experience-form">
            <h2>Add Work Experience</h2>
            <div className="form-group">
                <label>Title</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    
                    className="form-control"
                    placeholder="Ex: Software Engineer"
                />
            </div>
            <div className="form-group">
                <label>Company</label>
                <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    
                    className="form-control"
                    placeholder="Ex: Microsoft"
                />
            </div>
            <div className="form-group">
                <label>Country</label>
                <CountryDropdown
                    value={country}
                    onChange={(val) => setCountry(val)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Years of Experience</label>
                <input
                    type="number"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                   
                    className="form-control"
                    placeholder="Years of Experience"
                />
            </div>
            <div className="form-group">
                <input
                    type="checkbox"
                    checked={currentlyWorking}
                    onChange={(e) => setCurrentlyWorking(e.target.checked)}
                    className="form-check-input"
                />
                <label className="form-check-label">Currently working</label>
            </div>
            <button onClick={handleSave} className="btn btn-primary">
                Save
            </button>
        </div>
    );
};

export default WorkExperienceForm;
