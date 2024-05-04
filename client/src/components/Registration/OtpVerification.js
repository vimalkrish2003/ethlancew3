

import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import React from "react";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../contexts/authUserContext";
// import '../index.css';

import { addClientDetails, addFreelancerDetails } from "../../firebase/addDetails";

import './otpVerification.css';


const OtpVerification = ({ 
  username = null, 
  name = null, 
  email = null, 
  country = null, 
  address = null, 
  gender = null, 
  dob = null, 
  type = null, 
  goal = null, 
  selectedPhoto = null, 
  professionalRole = null, 
  workExperiences = null, 
  hourlyRate = null,  
  skills = null,  
  englishProficiency = null, 
  educationStatus = null, 
  institution = null, 
  degreeDomain = null 
}) => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const { userAddress } = useAuth();
  console.log("inside otpverification :",username,name)

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      const recaptchaElement = document.getElementById('recaptcha-container');
      if (recaptchaElement) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              onSignup();
            },
            "expired-callback": () => {},
          },
          auth
        );
      } else {
        console.error('Element with id "recaptcha-container" not found');
      }
    }
  }

  async function onSignup() {
    //const formatPh = "+918547831498"; // replace with your test phone number
    setLoading(true);
    onCaptchVerify();
  
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;
  
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      window.confirmationResult = confirmationResult;
      setLoading(false);
      setShowOTP(true);
      toast.success("OTP sended successfully!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function onOTPVerify() {
    setLoading(true);
    try {
      //const otp = "111111"; // replace with your test code
      const res = await window.confirmationResult.confirm(otp);
      console.log(res);
     setUser(res.user);
      if (type=='client')
      {
        const details = {
          username: username,
          name: name,
          email: email,
          country: country,
          address: address,
          gender: gender,
          dob: dob,
          type :type,
          phoneNo:ph
        };
        addClientDetails(details,userAddress);
      }
      else if (type=='freelancer')
      {
        const details = {
          username,
          name,
          email,
          country,
          address,
          gender,
          dob,
          type,
          phoneNo:ph,
          goal,
          selectedPhoto,
          professionalRole,
          workExperiences,
          hourlyRate,
          skills,
          englishProficiency,
          educationStatus,
          institution,
          degreeDomain
        };
        addFreelancerDetails(details,userAddress);
      }
      else
      {
        console.log("User type neither freelancer nor client \n type: ",type,username);
      }
      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  const onChangeNumber = () => {
    setShowOTP(false);
    setOtp("");
  };

  const onResendOTP = () => {
    setShowOTP(false);
    setOtp("");
    onSignup();
  };


  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4 flex-wrap justify-center items-center">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              PHONE VERIFICATION
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
                <button onClick={onChangeNumber}>Change Number</button>
                <button onClick={onResendOTP}>Resend OTP</button>
              </>
              
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold te
            ]=.xt-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
                {/* <button onClick={onResendOTP}>Resend OTP</button> */}
              </>
              
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default OtpVerification;