// server/middleware/sanitizeMiddleware.js
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const sanitize = (app) => {
  app.use(xss());
  app.use(mongoSanitize());
};

module.exports = sanitize;
