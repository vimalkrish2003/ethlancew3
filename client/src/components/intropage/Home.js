import React, { useState, useEffect } from "react";
import BannerBackground from "../../Assets/home-banner-background.png";
import BannerImage from "../../Assets/home-banner.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { useAuth } from "../../contexts/authUserContext"; // Corrected import path

const Home = () => {
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const { setUserAddress, setIsAuthenticated,userAddress,isAuthenticated } = useAuth(); // Moved useAuth to top level
  useEffect(() => {
    setMetamaskInstalled(typeof window.ethereum !== "undefined");
  }, []);
  
  
  const connectMetamask = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request access to the user's MetaMask accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // If accounts are returned, MetaMask is connected
        if (accounts.length > 0) {
          // Update state or perform any other action indicating successful connection
          setUserAddress(accounts[0]); // Set the user address to the first account
          setIsAuthenticated(true); // Set isAuthenticated to true
        } else {
          setUserAddress(null); // Set the user address to null
          setIsAuthenticated(false); // Set isAuthenticated to false
        }
      } else {
        // MetaMask is not installed, display a user-friendly message
        console.error('MetaMask is not installed.');
        setUserAddress(null); // Set the user address to null
        setIsAuthenticated(false); // Set isAuthenticated to false
      }
    } catch (error) {
      // Handle errors, e.g., user rejected the request
      console.error('Error connecting to MetaMask:', error);
      setUserAddress(null); // Set the user address to null
      setIsAuthenticated(false); // Set isAuthenticated to false
    }
  };


  

  return (
    <div className="home-container" id='about'>
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="Banner Background" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">Empowering freelancers and clients with decentralized transactions</h1>
          <p className="primary-text">A brief description of what your platform offers.</p>

          <div>
            {metamaskInstalled ? (
              <button onClick={connectMetamask} className="secondary-button">
                Connect Metamask <FiArrowRight />
              </button>
            ) : (
              <>
                <p>To get started, install Metamask, the leading Ethereum wallet extension for your browser.</p>
                <a href="https://metamask.io/" target="_blank" rel="noreferrer" className="secondary-button">
                  Install Metamask <FiArrowRight />
                </a>
              </>
            )}
          </div>
        </div>
        <div className="home-image-section">
      
          <img src={BannerImage} alt="Banner Image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
