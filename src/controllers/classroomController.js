const {
  createClassroom,
  updateClassroom,
  getClassroomById,
  getAllClassrooms,
  deleteClassroom,
} = require('../services/classroomService');

const createNewClassroom = async (req, res, next) => {
  try {
    const classroomData = req.body;
    const result = await createClassroom(classroomData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateExistingClassroom = async (req, res, next) => {
  try {
    const classroomId = req.params.id;
    const classroomData = req.body;
    const result = await updateClassroom(classroomId, classroomData);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getClassroom = async (req, res, next) => {
  try {
    const classroomId = req.params.id;
    const result = await getClassroomById(classroomId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const listAllClassrooms = async (req, res, next) => {
  try {
    const result = await getAllClassrooms();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const removeClassroom = async (req, res, next) => {
  try {
    const classroomId = req.params.id;
    await deleteClassroom(classroomId);

    res.status(200).json({ message: 'Classroom deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewClassroom,
  updateExistingClassroom,
  getClassroom,
  listAllClassrooms,
  removeClassroom,
};
