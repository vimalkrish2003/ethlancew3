import Web3 from "web3";
import BiddingContract from "./contracts/Bidding.json";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("Non-Ethereum browser detected. You should consider trying MetaMask!");
      }
    });
  });

const getContract = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = BiddingContract.networks[networkId];
  return new web3.eth.Contract(
    BiddingContract.abi,
    deployedNetwork && deployedNetwork.address
  );
};

export { getWeb3, getContract };
