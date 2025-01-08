const { validateSchool } = require('../utils/validate');
const School = require('../models/schoolModel');

const createSchool = async (schoolData) => {
  const { error } = validateSchool(schoolData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const newSchool = new School(schoolData);
  await newSchool.save();
  return newSchool;
};

const updateSchool = async (schoolId, schoolData) => {
  const { error } = validateSchool(schoolData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const updatedSchool = await School.findByIdAndUpdate(schoolId, schoolData, { new: true });
  return updatedSchool;
};

const getSchoolById = async (schoolId) => {
  const school = await School.findById(schoolId);
  return school;
};

const getAllSchools = async () => {
  const schools = await School.find();
  return schools;
};

const deleteSchool = async (schoolId) => {
  await School.findByIdAndDelete(schoolId);
};

module.exports = {
  createSchool,
  updateSchool,
  getSchoolById,
  getAllSchools,
  deleteSchool,
};
