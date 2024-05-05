import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import CountryDropdown from "./CountryDropdown";
import OtpVerification from "./OtpVerification";
import WorkExperienceForm from "./WorkExperienceModal";
import { FaTrash } from "react-icons/fa";
// import { useHistory } from "react-router-dom";
import "react-phone-input-2/lib/style.css";

const RegisterFree = () => {
    const [registrationComplete, setRegistrationComplete] = useState(false);

    const [username, idchange] = useState("");
    const [name, namechange] = useState("");
    // const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    // const [phone, phonechange] = useState("");
    const [country, countrychange] = useState("india");
    const [address, addresschange] = useState("");
    const [gender, genderchange] = useState("female");
    const [dob, dobchange] = useState("");
    const [goal, setGoal] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [professionalRole, setProfessionalRole] = useState("Ex: software engineer");
    const [workExperiences, setWorkExperiences] = useState([]);
    const [showWorkExperienceForm, setShowWorkExperienceForm] = useState(false);
    const [hourlyRate, setHourlyRate] = useState("");
    const [showRateWarning, setShowRateWarning] = useState(false);
    const [skills, setSkills] = useState([]);
    const [availableSkills] = useState([
        "Web Development",
        "Mobile App Development",
        "Graphic Design",
        "Data Entry",
        "Content Writing",
        "Digital Marketing",
        "Photography",
        "Video Editing",
        "Customer Service",
        "Sales",
        "SEO/SEM",
        "Project Management"
    ]);
    const [englishProficiency, setEnglishProficiency] = useState("");
    const [educationStatus, setEducationStatus] = useState("");
    const [institution, setInstitution] = useState("");
    const [degreeDomain, setDegreeDomain] = useState("");

    const navigate = useNavigate();

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setSelectedPhoto(file); // Update state with selected file
    };

    const toggleSkill = (skill) => {
        if (skills.includes(skill)) {
            setSkills(skills.filter((s) => s !== skill));
        } else {
            setSkills([...skills, skill]);
        }
    };

    const handleWorkExperienceSave = (newExperience) => {
        setWorkExperiences([...workExperiences, newExperience]);
        setShowWorkExperienceForm(false); // Hide the work experience form after saving
    };

    const handleDeleteWorkExperience = (experienceToDelete) => {
        const updatedExperiences = workExperiences.filter(
            (experience) => experience !== experienceToDelete
        );
        setWorkExperiences(updatedExperiences);

    };

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (username === null || username === '') {
            isproceed = false;
            errormessage += ' Username';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        // if (password === null || password === '') {
        //     isproceed = false;
        //     errormessage += ' Password';
        // }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }
        //Validate phone number
        // if (phone === null || phone === '') {
        //     isproceed = false;
        //     errormessage += ' phone';
        // } 
        // if (!isValidPhoneNumber(phone)) {

        //     toast.warning('Please enter a valid phone number');
        // }


        if (!isproceed) {
            toast.warning(errormessage)
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                // Check if the username is valid (contains only letters, numbers, and underscores)
                if (!/^\w+$/.test(username)) {
                    isproceed = false;
                    toast.warning('Username can only contain letters, numbers, and underscores');
                }

                else if (username.length < 6) {
                    isproceed = false;
                    toast.warning('Username must be at least 6 characters long');
                }
                // else if(!isValidPhoneNumber(phone)){
                //     isproceed = false;

                //     toast.warning('Please enter a valid phone number');
                // }
            } else {
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }
    // const isValidPhoneNumber = (phoneNumber) => {
    //     // Regular expression for validating phone numbers
    //     const phonePattern = /^\+[0-9]{1,3}[0-9]{10}$/;
    //     return phonePattern.test(phoneNumber);
    // };

    // Function to handle hourly rate change
    const handleHourlyRateChange = (e) => {
        const rate = e.target.value;
        setHourlyRate(rate);

        // Show warning if rate is out of range
        if (rate < 3 || rate > 999) {
            setShowRateWarning(true);
        } else {
            setShowRateWarning(false);
        }
    };

    const handleSkillClick = (skill) => {
        setSkills([...skills, skill]);
    };
    const handlesubmit = (e) => {
        e.preventDefault();
        if (IsValidate()) {
            setRegistrationComplete(true);
            console.log("inside verification complete :",username,name)
        }
    }
    return (
        <div>
            <ToastContainer />
            {
                registrationComplete ? (<OtpVerification
                    username={username}
                    name={name}
                    email={email}
                    country={country}
                    address={address}
                    gender={gender}
                    dob={dob}
                    type='freelancer'
                    goal={goal}
                    selectedPhoto={selectedPhoto}
                    professionalRole={professionalRole}
                    workExperiences={workExperiences}
                    hourlyRate={hourlyRate}
                    skills={skills}
                    englishProficiency={englishProficiency}
                    educationStatus={educationStatus}
                    institution={institution}
                    degreeDomain={degreeDomain}
                />
                ) : (<div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card">
                            <div className="card-header">
                                <h1>Freelancer Registration</h1>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">

                                            <div class="upload-photo-container">
                                            <img
    src={selectedPhoto ? URL.createObjectURL(selectedPhoto) : process.env.PUBLIC_URL + '/images/photo-icon.png'}
    alt="Upload Photo Icon"
    className="photo-icon"
/>
                                                <label for="profilePhoto" class="upload-photo-label">
                                                    <span class="upload-icon">+</span>

                                                    Upload Photo
                                                </label>
                                                <input
                                                    type="file"
                                                    id="profilePhoto"
                                                    name="profilePhoto"
                                                    accept="image/*" // Accept only image files
                                                    className="form-control"
                                                    onChange={handlePhotoChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>User Name <span className="errmsg">*</span></label>
                                            <input required value={username} onChange={e => idchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Full Name <span className="errmsg">*</span></label>
                                            <input required value={name} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Date of Birth <span className="errmsg">*</span></label>
                                            <input
                                                type="date" required value={dob} onChange={e => dobchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Email <span className="errmsg">*</span></label>
                                            <input required value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Phone <span className="errmsg">*</span></label>
                                    <input required value={phone} onChange={e => phonechange(e.target.value)} className="form-control"></input>
                                </div>
                            </div> */}
                                    <div className="col-lg-6 country-select">
                                        <div className="form-group">
                                            <label>Country <span className="errmsg">*</span></label>
                                            <CountryDropdown required value={country} onChange={countrychange} />

                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <textarea value={address} onChange={e => addresschange(e.target.value)} className="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <br></br>
                                            <input type="radio" checked={gender === 'male'} onChange={e => genderchange(e.target.value)} name="gender" value="male" className="app-check"></input>
                                            <label>Male</label>
                                            <input type="radio" checked={gender === 'female'} onChange={e => genderchange(e.target.value)} name="gender" value="female" className="app-check"></input>
                                            <label>Female</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>What is your primary goal for freelancing?</label>
                                            <select
                                                value={goal}
                                                onChange={(e) => setGoal(e.target.value)}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Choose a goal...</option>
                                                <option value="earn_income">To earn my main income</option>
                                                <option value="get_experience">To gain experience for a full-time job</option>
                                                <option value="network">For expanding network</option>
                                                <option value="no_goal_yet">I don't have a specific goal yet</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Professional Role</label> <input
                                                value={professionalRole}
                                                onChange={(e) => setProfessionalRole(e.target.value)}
                                                onFocus={(e) => setProfessionalRole('')}
                                                className="form-control"
                                                placeholder="Enter your professional role"
                                            />
                                        </div>
                                    </div>

                                    {/* Box to toggle work experience form */}
                                    <div
                                        className="work-experience-toggle"
                                        onClick={() => setShowWorkExperienceForm(!showWorkExperienceForm)}
                                    >
                                        <div className="toggle-box">
                                            <div className="toggle-icon">+</div>
                                            <div className="toggle-text">
                                                {showWorkExperienceForm ? "Hide Work Experience Form" : "Add Work Experience"}</div>
                                        </div>
                                    </div>

                                    {/* Render work experience form if showWorkExperienceForm is true */}
                                    {showWorkExperienceForm && (
                                        <div className="work-experience-form-container">
                                            <WorkExperienceForm onSave={handleWorkExperienceSave} />
                                        </div>
                                    )}

                                    {/* Display existing work experiences */}
                                    {workExperiences.length > 0 && (
                                        <div className="existing-work-experiences">
                                            <h2>Work Experiences:</h2>
                                            <ul>
                                                {workExperiences.map((experience, index) => (
                                                    <li key={index}>
                                                        {experience.title} at {experience.company}, {experience.country}
                                                        <span
                                                            style={{ cursor: "pointer" }}
                                                            className="delete-icon"
                                                            onClick={() => handleDeleteWorkExperience(experience)}
                                                        >
                                                            <FaTrash />
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Hourly Rate</label>
                                            <input
                                                value={hourlyRate}
                                                onChange={handleHourlyRateChange}
                                                className="form-control"
                                                type="number"
                                                placeholder="Enter hourly rate"
                                            />
                                            {showRateWarning && (
                                                <span className="text-danger">Hourly rate must be between $3.00 and $999.00</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Skills</label>
                                            <div className="input-group">
                                                <input
                                                    value={skills.join(", ")}
                                                    readOnly
                                                    className="form-control"
                                                />
                                                <div className="input-group-append">
                                                    <button type="button" className="btn btn-primary" onClick={() => setSkills([])}>Clear</button>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                {availableSkills.map((skill, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn btn-outline-primary mr-2 mb-2 ${skills.includes(skill) ? 'active' : ''}`}
                                                        onClick={() => toggleSkill(skill)}
                                                    >
                                                        {skill}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Highest Degree Pursued</label>
                                            <select
                                                value={educationStatus}
                                                onChange={(e) => setEducationStatus(e.target.value)}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Select highest degree...</option>
                                                <option value="high_school">High School</option>
                                                <option value="associate_degree">Associate Degree</option>
                                                <option value="bachelor_degree">Bachelor's Degree</option>
                                                <option value="master_degree">Master's Degree</option>
                                                <option value="doctorate">Doctorate (Ph.D.)</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Institution</label>
                                            <input
                                                value={institution}
                                                onChange={(e) => setInstitution(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter institution"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Domain of Degree</label>
                                            <input
                                                value={degreeDomain}
                                                onChange={(e) => setDegreeDomain(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter domain of degree"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>English Proficiency:</label>
                                        <select
                                            value={englishProficiency}
                                            onChange={(e) => setEnglishProficiency(e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="">Select Proficiency Level</option>
                                            <option value="Basic">Basic</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                            <option value="Fluent">Fluent</option>
                                        </select>
                                    </div>

                                </div>

                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Register</button> |
                                <Link to={'/login'} className="btn btn-danger">Close</Link>
                            </div>
                        </div>
                    </form>
                </div>
                )
            }



        </div>
    );
};

export default RegisterFree;