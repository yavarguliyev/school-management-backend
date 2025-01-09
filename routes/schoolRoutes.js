const express = require('express');
const {
  createNewSchool,
  updateExistingSchool,
  getSchool,
  listAllSchools,
  removeSchool,
} = require('../controllers/schoolController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authenticate, authorize('admin'), createNewSchool);
router.put('/:id', authenticate, authorize('admin'), updateExistingSchool);
router.get('/:id', authenticate, getSchool);
router.get('/', authenticate, listAllSchools);
router.delete('/:id', authenticate, authorize('admin'), removeSchool);

module.exports = router;
