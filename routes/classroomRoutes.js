const express = require('express');
const {
  createNewClassroom,
  updateExistingClassroom,
  getClassroom,
  listAllClassrooms,
  removeClassroom,
} = require('../controllers/classroomController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authenticate, authorize('teacher', 'admin'), createNewClassroom);
router.put('/:id', authenticate, authorize('teacher', 'admin'), updateExistingClassroom);
router.get('/:id', authenticate, getClassroom);
router.get('/', authenticate, listAllClassrooms);
router.delete('/:id', authenticate, authorize('admin'), removeClassroom);

module.exports = router;
