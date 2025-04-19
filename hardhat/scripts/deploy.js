const hre = require("hardhat");

async function main() {

const MedicalRecordsConsent = await hre.ethers.getContractFactory("MedicalRecordsConsent");
  const medicalRecordsConsent = await MedicalRecordsConsent.deploy(); // creating an instance: 

  await medicalRecordsConsent.waitForDeployment();
  const address = await medicalRecordsConsent.getAddress();

  console.log(
    ` deployed to ${address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});