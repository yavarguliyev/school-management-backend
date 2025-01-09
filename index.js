const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'X-Requested-With,Content-Type,Authorization',
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*');

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  next();
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/classes', classroomRoutes);
app.use('/api/v1/schools', schoolRoutes);
app.use('/api/v1/students', studentRoutes);

app.use(errorHandler);

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
