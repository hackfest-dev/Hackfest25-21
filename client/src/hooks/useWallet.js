import { useState } from 'react';
import { ethers } from 'ethers';
import ContractABI from '../../../hardhat/artifacts/contracts/MedicalRecordsConsent.sol/MedicalRecordsConsent.json'

const useWallet = () => {
  const contractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const connectWallet = async () => {
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        alert('Please install MetaMask');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, ContractABI.abi, signer);
      console.log(contractInstance);
      
      // console.log("Contract functions:", Object.keys(contractInstance.functions));
      // console.log(signer);
      
      setContract(contractInstance);
      setSigner(signer);
      return { signer, contract:contractInstance };
    } catch (error) {
      console.error("Wallet connection failed:", error);
      throw error;
    }
  };

  const getContract = () => contract; 
  const getSigner = () => signer; 

  return { connectWallet, getContract, getSigner };
};

export default useWallet;
