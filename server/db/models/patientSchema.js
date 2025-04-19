const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  role: { type: String, default: 'patient' },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },

  age: {
    type: String,
    required: false,
  },

  bloodGroup: {
    type: String,
    required: false
  },

  phone: {
    type: String,
    required:false,
  },

  residenceCity: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
},{ timestamps:true });

const Patients = mongoose.model('patient', patientSchema);

module.exports = Patients;
