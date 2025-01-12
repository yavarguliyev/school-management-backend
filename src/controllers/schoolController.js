const {
  createSchool,
  updateSchool,
  getSchoolById,
  getAllSchools,
  deleteSchool,
} = require('../services/schoolService');

const createNewSchool = async (req, res, next) => {
  try {
    const schoolData = req.body;
    const result = await createSchool(schoolData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateExistingSchool = async (req, res, next) => {
  try {
    const schoolId = req.params.id;
    const schoolData = req.body;
    const result = await updateSchool(schoolId, schoolData);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getSchool = async (req, res, next) => {
  try {
    const schoolId = req.params.id;
    const result = await getSchoolById(schoolId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const listAllSchools = async (req, res, next) => {
  try {
    const result = await getAllSchools();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const removeSchool = async (req, res, next) => {
  try {
    const schoolId = req.params.id;
    await deleteSchool(schoolId);

    res.status(200).json({ message: 'School deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewSchool,
  updateExistingSchool,
  getSchool,
  listAllSchools,
  removeSchool,
};
