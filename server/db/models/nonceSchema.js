const mongoose = require('mongoose');

const nonceSchema = mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  nonce: {
    type:String,
    required:true
  }
},{ timestamps:true });

const nonces = mongoose.model('nonce',nonceSchema);

module.exports = nonces;