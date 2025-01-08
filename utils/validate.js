const Joi = require('joi');

const schoolSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().min(10).max(15).required(),
});

const classroomSchema = Joi.object({
  name: Joi.string().min(3).required(),
  capacity: Joi.number().min(1).required(),
  schoolId: Joi.string().required(),
});

const studentSchema = Joi.object({
  name: Joi.string().min(3).required(),
  age: Joi.number().min(3).required(),
  schoolId: Joi.string().required(),
  classId: Joi.string().optional(),
});

const signUpSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('superadmin', 'schooladmin').required(),
  associatedSchool: Joi.string().when('role', {
    is: 'schooladmin',
    then: Joi.required(),
  }),
});

const siginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


const validateSchool = (data) => schoolSchema.validate(data);
const validateClassroom = (data) => classroomSchema.validate(data);
const validateStudent = (data) => studentSchema.validate(data);
const validateUserSignup = (data) => signUpSchema.validate(data);
const validateUserSignin = (data) => siginSchema.validate(data);

module.exports = {
  validateSchool,
  validateClassroom,
  validateStudent,
  validateUserSignup,
  validateUserSignin,
};
