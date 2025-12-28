const express = require('express');
const { body } = require('express-validator');

const {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');

const { contactFormLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

const contactValidation = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('preferredContactMethod')
    .optional()
    .isIn(['phone', 'email', 'whatsapp', 'any'])
];

router.post('/', contactFormLimiter, contactValidation, createContact);
router.get('/', getContacts);
router.get('/:id', getContactById);
router.patch('/:id', updateContactStatus);
router.delete('/:id', deleteContact);

module.exports = router;
