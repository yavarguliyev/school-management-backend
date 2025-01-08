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

const validateSchool = (data) => schoolSchema.validate(data);
const validateClassroom = (data) => classroomSchema.validate(data);
const validateStudent = (data) => studentSchema.validate(data);

module.exports = {
  validateSchool,
  validateClassroom,
  validateStudent,
};
