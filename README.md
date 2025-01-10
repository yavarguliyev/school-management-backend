# School Management API

Welcome to the **School Management API**! This is a RESTful API built with **Node.js**, **Express**, and **MongoDB** designed to manage schools, classrooms, students, and users. It provides features such as user authentication, CRUD operations, and data validation. 

The application is deployed on **AWS EC2**, making it accessible online for real-world usage.

---

## Table of Contents
1. [Features](#features)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the App](#running-the-app)
4. [API Documentation](#api-documentation)
5. [Environment Variables](#environment-variables)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [License](#license)

---

## Features
- **User Authentication**: Sign up, sign in, and JWT token generation for secure user authentication.
- **School Management**: Manage school records, including classrooms and associated users.
- **Classroom Management**: Manage classroom records with references to schools.
- **Student Management**: Manage student records with references to schools and classrooms.
- **Swagger API Documentation**: Fully documented API using Swagger for easy integration.
- **Rate Limiting**: Protects against too many requests using **express-rate-limit**.
- **Error Handling**: Centralized error handling with detailed error responses.
- **Data Validation**: Ensure correct data input with **Joi** for model validation.
- **Seeding & Data Destruction**: Utility for importing and deleting sample data.

---

## Technologies
- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for routing and middleware.
- **MongoDB**: NoSQL database for storing school, classroom, student, and user data.
- **Mongoose**: MongoDB object modeling tool for managing schema and database operations.
- **JWT**: JSON Web Tokens for authentication and session management.
- **Joi**: Data validation library to ensure correct input data.
- **Swagger UI**: API documentation for easy integration.
- **dotenv**: Loads environment variables from `.env` file.
- **Bcrypt.js**: Secure password hashing.
- **express-rate-limit**: Protects the API from excessive requests.

---

## Getting Started

To get started with the School Management API, follow the steps below to set up the application on your local machine.

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (or use a cloud MongoDB service like MongoDB Atlas)
- **npm** (Node Package Manager)

### Installation
1. Clone this repository to your local machine:
   ```bash
   git clone git@github.com:yavarguliyev/school-management-backend.git
   cd school-management-backend
   npm install
   cp .env.example .env

## Modify the `.env` file
Modify the `.env` file with your environment-specific configurations, such as:
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `CLIENT_URL`: URL of the frontend (if applicable).

Run the application in development mode:
```bash
npm run dev

The API will be accessible at [http://localhost:3000](http://localhost:3000).

For production, use the following:

```bash
npm start

# API Documentation

You can explore and test the API using Swagger UI. After running the app, navigate to the following URL:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

The API supports the following routes:

### Authentication Routes
- **POST /api/v1/auth/register**: Register a new user.
- **POST /api/v1/auth/login**: Log in a user and return a JWT token.

### School Routes
- **GET /api/v1/schools**: Get all schools.
- **GET /api/v1/schools/:id**: Get a specific school by ID.
- **POST /api/v1/schools**: Create a new school.
- **PUT /api/v1/schools/:id**: Update a school.
- **DELETE /api/v1/schools/:id**: Delete a school.

### Classroom Routes
- **GET /api/v1/classrooms**: Get all classrooms.
- **GET /api/v1/classrooms/:id**: Get a specific classroom by ID.
- **POST /api/v1/classrooms**: Create a new classroom.
- **PUT /api/v1/classrooms/:id**: Update a classroom.
- **DELETE /api/v1/classrooms/:id**: Delete a classroom.

### Student Routes
- **GET /api/v1/students**: Get all students.
- **GET /api/v1/students/:id**: Get a specific student by ID.
- **POST /api/v1/students**: Create a new student.
- **PUT /api/v1/students/:id**: Update a student.
- **DELETE /api/v1/students/:id**: Delete a student.

## Environment Variables

The following environment variables need to be defined in the `.env` file:

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT authentication.
- `CLIENT_URL`: URL for your frontend (if applicable).
- `PORT`: Port to run the application on (default is `3000`).

## Testing

You can run tests using the following command:

```bash
npm run test

To run tests in watch mode (automatically running tests on file changes), use:

```bash
npm run test:watch

## Deployment

The application is deployed on **AWS EC2** for production use. You can deploy the app by following these steps:

1. Set up an AWS EC2 instance.
2. Clone the repository onto the EC2 instance.
3. Set up environment variables using the `.env` file.
4. Install dependencies and run the app in production mode:

```bash
npm install
npm start
