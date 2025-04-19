const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: false,
  },
  residenceCity: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  specialization:{
    type: String,
    required: false,
  },
  numPracticeYear:{
    type: String,
    required: false,
  },
  registerYear:{
    type: String,
    required: false,
  },
  licenseNo:{
    type: String,
    required: false,
  }
},{ timestamps:true });

const Doctors = mongoose.model('doctor', doctorSchema);

module.exports = Doctors;
