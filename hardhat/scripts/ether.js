const { ethers } = require("ethers");

// Create a provider for the local Hardhat network
const provider = new ethers.JsonRpcProvider("http://localhost:8545");

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Contract address to check

const checkContract = async () => {
  try {
    const code = await provider.getCode(contractAddress);
    if (code === "0x") {
      console.log("This is not a contract address.");
    } else {
      console.log("This is a contract address.");
    }
  } catch (error) {
    console.error("Error fetching contract code:", error);
  }
};

// Execute the function
checkContract();
