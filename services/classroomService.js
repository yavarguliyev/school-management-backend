const { validateClassroom } = require('../utils/validate');
const Classroom = require('../models/classroomModel');

const createClassroom = async (classroomData) => {
  const { error } = validateClassroom(classroomData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const newClassroom = new Classroom(classroomData);
  await newClassroom.save();
  return newClassroom;
};

const updateClassroom = async (classroomId, classroomData) => {
  const { error } = validateClassroom(classroomData);
  if (error) {
    throw new Error(error.details[0].message);
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
