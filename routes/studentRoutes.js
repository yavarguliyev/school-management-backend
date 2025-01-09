const express = require('express');
const {
  createNewStudent,
  updateExistingStudent,
  getStudent,
  listAllStudents,
  removeStudent,
} = require('../controllers/studentController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authenticate, authorize('teacher', 'admin'), createNewStudent);
router.put('/:id', authenticate, authorize('teacher', 'admin'), updateExistingStudent);
router.get('/:id', authenticate, getStudent);
router.get('/', authenticate, listAllStudents);
router.delete('/:id', authenticate, authorize('admin'), removeStudent);

module.exports = router;
