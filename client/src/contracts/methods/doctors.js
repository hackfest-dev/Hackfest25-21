

const registerAsDoctor = async (contract) => { 
    if (!contract) return;
    try {
      const tx = await contract.registerAsDoctor();
      await tx.wait();
      alert("Registered as Doctor!");
    } catch (error) {
      console.error("Error registering as doctor:", error);
      alert("Registration failed!");
    }
  };


const requestAccess = async (contract,patientAddress) => {
    if (!contract) return;
    try {
      const tx = await contract.requestAccess(patientAddress);
      await tx.wait();
      alert('Access requested.');
    } catch (error) {
      console.error('Error requesting access:', error);
      alert('Failed to request access. Check if address is valid or already requested.');
    }
  };

const viewRecords = async (contract,patientAddress) => {
    if (!contract) return;
    try {
      const records = await contract.getPatientRecords(patientAddress);
      return {data:records,error:null};
    } catch (error) {
      console.error('Error viewing records:', error);
      alert('Access might not be granted yet or patient address is invalid.');
      return {data:null,error:"Error viewing records"};
    }
  };
 export { registerAsDoctor, requestAccess, viewRecords };




 