// server/models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  serviceInterest: {
    type: String,
    trim: true
  },
  address: {
  type: String,
  required: true,
  trim: true
},

  preferredPackage: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  preferredContactMethod: {
    type: String,
    enum: ['phone', 'email', 'whatsapp', 'any'],
    default: 'any'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted'],
    default: 'new'
  }
});

module.exports = mongoose.model('Contact', contactSchema);
