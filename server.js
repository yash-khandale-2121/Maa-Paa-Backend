// server/server.js
require('dotenv').config();
const contactRoutes = require('./routes/contactRoutes');

const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const sanitize = require('./middleware/sanitizeMiddleware');
const errorHandler = require('./middleware/errorMiddleware');
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(helmet());
app.use(xss());  
const allowedOrigins = [
  'http://localhost:5173',
  'https://maapaacaretakers.vercel.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);

app.options('*', cors());
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));
sanitize(app);

// Routes
app.get('/', (req, res) => {
  res.send('Maa & Paa Elderly Care API is running');
});

app.use('/api/contacts', contactRoutes);

// 404
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
);
