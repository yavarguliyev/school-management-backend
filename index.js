const express = require('express');
const { swaggerDocs, swaggerUi } = require('./utils/swagger'); 
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const studentRoutes = require('./routes/studentRoutes');
const rateLimit = require('express-rate-limit');

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/classes', classroomRoutes);
app.use('/api/v1/schools', schoolRoutes);
app.use('/api/v1/students', studentRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello from the root route!');
});

app.use((_req, res, _next) => {
  res.status(404).json({ error: 'Resource not found' });
});

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});

process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
