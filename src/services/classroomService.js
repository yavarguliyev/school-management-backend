const { validateClassroom } = require('../utils/validate');
const ErrorResponse = require('../utils/errorResponse');
const Classroom = require('../models/Classroom');

const createClassroom = async (classroomData) => {
  const { error } = validateClassroom(classroomData);
  if (error) {
    throw new ErrorResponse(error.details[0].message, 400);
  }

  const newClassroom = new Classroom(classroomData);
  await newClassroom.save();

  return newClassroom;
};

const updateClassroom = async (classroomId, classroomData) => {
  const { error } = validateClassroom(classroomData);
  if (error) {
    throw new ErrorResponse(error.details[0].message, 400);
  }

  const updatedClassroom = await Classroom.findByIdAndUpdate(classroomId, classroomData, { new: true });
  return updatedClassroom;
};

const getClassroomById = async (classroomId) => {
  const classroom = await Classroom.findById(classroomId);
  return classroom;
};

const getAllClassrooms = async () => {
  const classrooms = await Classroom.find();
  return classrooms;
};

const deleteClassroom = async (classroomId) => {
  await Classroom.findByIdAndDelete(classroomId);
};

module.exports = {
  createClassroom,
  updateClassroom,
  getClassroomById,
  getAllClassrooms,
  deleteClassroom,
};
