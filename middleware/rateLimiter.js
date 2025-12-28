// server/middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

export const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 submissions per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many requests. Please try again after some time.'
  }
});
