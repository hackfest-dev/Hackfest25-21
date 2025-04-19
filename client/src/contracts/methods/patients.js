const registerAsPatient = async (contract) => {
  // console.log("contract",contract);
  
    if (!contract) return;
    try {
      const tx = await contract.registerAsPatient();
      await tx.wait();
      alert("Registered as Patient!");
    } catch (error) {
      console.error("Error registering as patient:", error);
      alert("Registration failed!");
    }
  };

  const uploadRecord = async (contract,cid) => {
  console.log("contract",contract);
  
    if (!contract) return;
    try {
      const tx = await contract.uploadRecordByPatient2(cid);
      console.log("tx",tx);
      
      const _ = await tx.wait();
      console.log("_",_);
      
      alert('Record uploaded successfully.');
      // fetchMyRecords();
    } catch (error) {
      console.error('Error uploading record:', error);
    }
  };

  const approveAccess = async (contract,doctorAddress,duration) => {
    if (!contract) return;
    try {
      const tx = await contract.approveRequest(doctorAddress, duration);
      await tx.wait();
      alert('Access approved.');
    } catch (error) {
      console.error('Error approving access:', error);
    }
  };

  const revokeAccess = async (contract,doctorAddress) => {
    if (!contract) return;
    try {
      const tx = await contract.revokeAccess(doctorAddress);
      await tx.wait();
      alert('Access revoked.');
    } catch (error) {
      console.error('Error revoking access:', error);
    }
  };

  const fetchPendingRequests = async (contract) => {
    if (!contract) return;
    try {
      const requests = await contract.getPendingRequests();
      return { data:requests, error:null }
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      return { data:null, error:"Error fetching pending requests" }
    }
  };

  const fetchMyRecords = async (contract) => {
    if (!contract) return;
    try {
      const records = await contract.getMyRecords();
      return { data:records,error:null }
    } catch (error) {
      console.error('Error fetching records:', error);
      return { data:null,error:"Error fetching records" }
    }
  };

  export {
    registerAsPatient,
    uploadRecord,
    approveAccess,
    revokeAccess,
    fetchPendingRequests,
    fetchMyRecords
  };
  