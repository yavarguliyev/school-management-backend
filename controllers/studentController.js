const {
  createStudent,
  updateStudent,
  getStudentById,
  getAllStudents,
  deleteStudent,
} = require('../services/studentService');

const createNewStudent = async (req, res, next) => {
  try {
    const studentData = req.body;
    const result = await createStudent(studentData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateExistingStudent = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const studentData = req.body;
    const result = await updateStudent(studentId, studentData);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getStudent = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const result = await getStudentById(studentId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const listAllStudents = async (req, res, next) => {
  try {
    const result = await getAllStudents();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const removeStudent = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    await deleteStudent(studentId);

    res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewStudent,
  updateExistingStudent,
  getStudent,
  listAllStudents,
  removeStudent,
};
