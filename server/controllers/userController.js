const crypto = require('crypto');
const nonces = require('../db/models/nonceSchema');
const ethers = require('ethers');
const jwt = require('jsonwebtoken');
const Doctors = require('../db/models/doctorSchema');
const Patients = require('../db/models/patientSchema');
const Staffs = require('../db/models/staffSchema');

const message = "Sign this message to authenticate: ";
const defaultUserRole = 'patient';

const getNonce = async (req, res) => {
    try {
        const { walletAddress } = req.body;

        // console.log(walletAddress);
        
        if (!walletAddress) {
            return res.status(400).json({ data: null, error: "walletAddress is required" });
        }

        // Check if a nonce already exists for the wallet address
        let existingNonce = await nonces.findOne({ walletAddress:walletAddress.toLowerCase() });

        if (existingNonce) {
            return res.status(201).json({ data: `${message}${existingNonce.nonce}`, error: null });
        }

        // Create new nonce
        const nonce = crypto.randomBytes(32).toString('hex');
        const newNonce = new nonces({ walletAddress:walletAddress.toLowerCase(), nonce });
        await newNonce.save();

        console.log(nonce);
        
        res.status(201).json({ data: `${message}${nonce}`, error: null });

    } catch (err) {
        console.error("Error generating nonce:", err);
        res.status(500).json({ data: null, error: "An error occurred while generating nonce" });
    }
};

const verifySignature = async (req, res) => {
    try {
        const { walletAddress, signature, role } = req.body;
        // console.log(signature);
        

        if (!walletAddress || !signature) {
            return res.status(400).json({ data: null, error: "walletAddress and signature are required" });
        }

        const nonceDoc = await nonces.findOne({ walletAddress: walletAddress.toLowerCase() });
        if (!nonceDoc) {
            return res.status(400).json({ data: null, error: "No nonce found" });
        }

        const verifiableMessage = `${message}${nonceDoc.nonce}`;
        const signerAddress = ethers.verifyMessage(verifiableMessage, signature);

        console.log(verifiableMessage,"  ",signerAddress);
        
        if (signerAddress.toLowerCase() !== walletAddress.toLowerCase()) {
            return res.status(401).json({ data: null, error: "Invalid signature" });
        }

        // Determine role and corresponding model
        let userModel;
        let selectedRole = role || defaultUserRole;

        switch (selectedRole.toLowerCase()) {
            case 'patient':
                userModel = Patients;
                break;
            case 'doctor':
                userModel = Doctors;
                break;
            case 'staff':
                userModel = Staffs;
                break;
            default:
                return res.status(400).json({ data: null, error: "Invalid role provided" });
        }

        const existingUser = await userModel.findOne({ walletAddress: walletAddress.toLowerCase() });

        if (!existingUser) {
            const newUser = new userModel({
                walletAddress: walletAddress.toLowerCase(),
                role: selectedRole
            });
            await newUser.save();
        }

        const token = jwt.sign(
            { address: walletAddress, role: selectedRole },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.TOKEN_EXPIRE }
        );

        await nonces.deleteOne({ walletAddress: walletAddress.toLowerCase() });

        res.status(201).json({ data: { token }, error: null });
    } catch (err) {
        console.error("Signature verification error:", err);
        res.status(500).json({ data: null, error: "An error occurred during signature verification" });
    }
};

const updateProfile = async (req, res) => {
    try {
      const { address: walletAddress, role } = req.user; // Extracted from JWT
      const updates = req.body;       // all updatable fields
  
      if (!address || !role) {
        return res.status(400).json({ error: "walletAddress (in params) and role (in body) are required." });
      }
  
      // Choose correct model
      let model;
      switch (role.toLowerCase()) {
        case 'patient':
          model = Patients;
          break;
        case 'doctor':
          model = Doctors;
          break;
        case 'staff':
          model = Staffs;
          break;
        default:
          return res.status(400).json({ error: "Invalid role provided." });
      }
  
      // Update profile
      const updatedUser = await model.findOneAndUpdate(
        { walletAddress: address.toLowerCase() },
        { $set: updates },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: `${role} not found.` });
      }
  
      res.status(200).json(updatedUser);
  
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const getProfile = async (req, res) => {
    try {
      const { walletAddress, role } = req.user;
  
      if (!walletAddress || !role) {
        return res.status(400).json({ error: 'walletAddress and role are required from token.' });
      }
  
      // Select model based on role
      let model;
      switch (role.toLowerCase()) {
        case 'patient':
          model = Patients;
          break;
        case 'doctor':
          model = Doctors;
          break;
        case 'staff':
          model = Staffs;
          break;
        default:
          return res.status(400).json({ error: 'Invalid role provided in token.' });
      }
  
      // Query user by wallet address (case-insensitive)
      const user = await model.findOne({ walletAddress: walletAddress.toLowerCase() });
  
      if (user) {
        return res.status(200).json({
          auth: true,
          userProfile: {
            id: user._id,
            walletAddress: user.walletAddress,
            role: role,
            // add any custom fields from schema
            ...user._doc  // return entire document if needed
          }
        });
      } else {
        return res.status(404).json({ auth: false,userProfile:null, error: `${role} not found.` });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ auth: false,userProfile:null,error: 'Server error' });
    }
  };
  
module.exports = { verifySignature,getNonce,updateProfile,getProfile }