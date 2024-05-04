import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import CountryDropdown from "./CountryDropdown";
import OtpVerification from './OtpVerification';
// import { useHistory } from "react-router-dom";
// import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-input-2/lib/style.css";

const Register = () => {
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
        // if (!isValidPhoneNumber(country)) {

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



    const handlesubmit = (e) => {

        e.preventDefault();
        if (IsValidate()) {
            setRegistrationComplete(true);

        }
        
    }

    return (
        <div>
            <ToastContainer />
            {registrationComplete ? (
                <OtpVerification
                username={username}
                name={name}
                email={email}
                country={country}
                address={address}
                gender={gender}
                dob={dob}
                type='client'
            />
            ):(<div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header">
                        <h1>Client Registration</h1>
                    </div>
                    <div className="card-body">

                        <div className="row">
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

                        </div>

                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Register</button> |
                        <Link to={'/login'} className="btn btn-danger">Close</Link>
                    </div>
                </div>
            </form>
        </div>)}
            


        </div>
    );
}

export default Register;