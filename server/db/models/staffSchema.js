const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  role: { type: String, default: 'staff' },
  name: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required:false,
  },

  phone: {
    type: String,
    required: false,
  },

  department: {
    type: String,
    required: false,
  },

  residence: {
    type: String,
    required: false,
  },

  role: {
    type: String,
    required: false,
  },

  gender: {
    type: String,
    required: false,
  },

  yearsOfWorking: {
    type: String,
    required: false,
  },


},{ timestamps:true });

const Staffs = mongoose.model('staff',staffSchema);

module.exports = Staffs;
