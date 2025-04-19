// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MedicalRecordsConsent {
    enum Role { None, Patient, Doctor, Staff }

    struct Access {
        bool isAllowed;
        uint256 expiry;
    }

    mapping(address => Role) public roles;
    mapping(address => string[]) public patientRecords;
    mapping(address => mapping(address => Access)) public accessPermissions; // patient => doctor => access

    // patient => list of pending doctor requests
    mapping(address => address[]) public pendingRequests;
    // patient => doctor => has requested
    mapping(address => mapping(address => bool)) public hasPendingRequest;

    // ========== Events ==========
    event RecordUploaded(address indexed patient, address indexed staff, string cid);
    event AccessRequested(address indexed doctor, address indexed patient);
    event AccessGranted(address indexed patient, address indexed doctor, uint256 expiry);
    event AccessRevoked(address indexed patient, address indexed doctor);

    modifier onlyRole(Role _role) {
        require(roles[msg.sender] == _role, "Access denied: Invalid role");
        _;
    }

    // ========== Role Management ==========
    function registerAsPatient() external {
        roles[msg.sender] = Role.Patient;
    }

    function registerAsDoctor() external {
        roles[msg.sender] = Role.Doctor;
    }

    function registerAsStaff() external {
        roles[msg.sender] = Role.Staff;
    }

    // ========== Uploading Records ==========
    function uploadRecordByPatient2(string calldata cid) public 
    // onlyRole(Role.Patient) 
    {
        require(roles[msg.sender] == Role.Patient, "Not a registered patient");
        patientRecords[msg.sender].push(cid);
        emit RecordUploaded(msg.sender, msg.sender, cid);
    }

    function uploadRecordByStaff(address patient, string calldata cid) external onlyRole(Role.Staff) {
        require(roles[patient] == Role.Patient, "Not a registered patient");
        patientRecords[patient].push(cid);
        emit RecordUploaded(patient, msg.sender, cid);
    }

    // ========== Doctor: Request Access ==========
    function requestAccess(address patient) external onlyRole(Role.Doctor) {
        require(roles[patient] == Role.Patient, "Invalid patient");
        require(!hasPendingRequest[patient][msg.sender], "Request already sent");

        pendingRequests[patient].push(msg.sender);
        hasPendingRequest[patient][msg.sender] = true;

        emit AccessRequested(msg.sender, patient);
    }

    // ========== Patient: View & Approve Requests ==========
    function getPendingRequests() external view onlyRole(Role.Patient) returns (address[] memory) {
        return pendingRequests[msg.sender];
    }

    function approveRequest(address doctor, uint256 durationInSeconds) external onlyRole(Role.Patient) {
        require(hasPendingRequest[msg.sender][doctor], "No pending request from doctor");

        accessPermissions[msg.sender][doctor] = Access(true, block.timestamp + durationInSeconds);

        // Remove doctor from pending requests
        _removePendingRequest(msg.sender, doctor);

        emit AccessGranted(msg.sender, doctor, block.timestamp + durationInSeconds);
    }

    function revokeAccess(address doctor) external onlyRole(Role.Patient) {
        accessPermissions[msg.sender][doctor].isAllowed = false;
        emit AccessRevoked(msg.sender, doctor); 
    }

    // ========== Doctor: View Patient Records ==========
    function getPatientRecords(address patient) external view onlyRole(Role.Doctor) returns (string[] memory) {
        Access memory permission = accessPermissions[patient][msg.sender];
        // require(permission.isAllowed && block.timestamp <= permission.expiry, "Access denied or expired");
        require(permission.isAllowed, "Access not granted by patient");
        require(block.timestamp <= permission.expiry, "Access expired");

        return patientRecords[patient];
    }

    // ========== Patient: View Own Records ==========
    function getMyRecords() external view onlyRole(Role.Patient) returns (string[] memory) {
        return patientRecords[msg.sender];
    }

    // ========== Internal Utils ==========
    function _removePendingRequest(address patient, address doctor) internal {
        address[] storage requests = pendingRequests[patient];
        for (uint256 i = 0; i < requests.length; i++) {
            if (requests[i] == doctor) {
                requests[i] = requests[requests.length - 1]; // Swap with last
                requests.pop();
                break;
            }
        }
        hasPendingRequest[patient][doctor]= false;
    }
}
