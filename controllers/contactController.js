// server/controllers/contactController.js
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../config/mailer');
const { validationResult } = require('express-validator');
const {
  sendAdminContactEmail,
  sendUserAcknowledgementEmail
} = require('../config/mailer');
exports.createContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error('Validation failed');
      err.statusCode = 422;
      err.details = errors.array();
      return next(err);
    }

    // Create contact in DB
    const contact = await Contact.create(req.body);

    // Prepare clean data for email
    const cleanData = {
      fullName: contact.fullName,
      email: contact.email,
      phone: contact.phone,
      serviceInterest: contact.serviceInterest,
      preferredPackage: contact.preferredPackage,
      address: contact.address,
      message: contact.message
    };

    // Send emails (non-blocking but awaited)
    await sendAdminContactEmail(cleanData);
    await sendUserAcknowledgementEmail(cleanData);

    res.status(201).json({
      success: true,
      message: 'Thank you! We will contact you shortly.'
    });
  } catch (err) {
    next(err);
  }
};


exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    next(err);
  }
};

exports.getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      const err = new Error('Contact not found');
      err.statusCode = 404;
      throw err;
    }
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) {
      const err = new Error('Contact not found');
      err.statusCode = 404;
      throw err;
    }
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      const err = new Error('Contact not found');
      err.statusCode = 404;
      throw err;
    }
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (err) {
    next(err);
  }
};
