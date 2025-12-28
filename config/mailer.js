
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send email to admin when new contact form is submitted
 */
const sendAdminContactEmail = async (contactData) => {
  const {
    fullName,
    email,
    phone,
    serviceInterest,
    preferredPackage,
    message
  } = contactData;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM, 
    to: process.env.NOTIFY_EMAIL,
    subject: '📩 New Contact Request – Maa & Paa',
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service Interest:</strong> ${serviceInterest || 'Not specified'}</p>
      <p><strong>Package:</strong> ${preferredPackage || 'Not specified'}</p>
      <p><strong>Address:</strong> ${contactData.address}</p>

      <p><strong>Message:</strong></p>
      <p>${message || 'No message'}</p>
      <hr/>
      <small>Maa & Paa Elderly Care</small>
    `
  });
};

/**
 * Send acknowledgement email to user
 */
const sendUserAcknowledgementEmail = async (contactData) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: contactData.email,
    subject: 'Thank you for contacting Maa & Paa',
    html: `
      <p>Dear ${contactData.fullName},</p>

      <p>Thank you for reaching out to <strong>Maa & Paa Elderly Care Services</strong>.</p>

      <p>We have received your request and our team will contact you soon </p>
      

      <p>If you need urgent help, please call us at
      <strong>+91 93598 15924</strong>.</p>
      <strong>+91 8329849235</strong>.</p>

      <p>Warm regards,<br/>
      <strong>Team :- Maa & Paa Caretakers</strong></p>
    `
  });
};

module.exports = {
  sendAdminContactEmail,
  sendUserAcknowledgementEmail
};
