import React from "react";

import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container" >
        <div className="nav-logo-container">
        ethLance
      </div>
        </div>
        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
           
          <span>Help</span>
          <span>Share</span>
          
        </div>
        <div className="footer-section-columns">
          <span>244-5333-7783</span>
          <span>hello@ethlance.com</span>
          <span>press@ethlance.com</span>
          <span>contact@ethlance.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
