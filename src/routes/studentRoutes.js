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

/**
 * @openapi
 * /api/v1/students:
 *   post:
 *     summary: Create a new student
 *     description: Creates a new student with the provided data.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the student.
 *               lastName:
 *                 type: string
 *                 description: The last name of the student.
 *               age:
 *                 type: integer
 *                 description: The age of the student.
 *               grade:
 *                 type: string
 *                 description: The grade of the student.
 *               schoolId:
 *                 type: string
 *                 description: The ID of the school the student belongs to.
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 grade:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', authenticate, authorize('schooladmin', 'teacher'), createNewStudent);

/**
 * @openapi
 * /api/v1/students/{id}:
 *   put:
 *     summary: Update an existing student
 *     description: Updates an existing student by ID.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: integer
 *               grade:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/:id', authenticate, authorize('schooladmin', 'teacher'), updateExistingStudent);

/**
 * @openapi
 * /api/v1/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     description: Retrieve the details of a student by their ID.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student to retrieve.
 *     responses:
 *       200:
 *         description: Student details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 grade:
 *                   type: string
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticate, getStudent);

/**
 * @openapi
 * /api/v1/students:
 *   get:
 *     summary: List all students
 *     description: Retrieve a list of all students.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   grade:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, authorize('schooladmin'), listAllStudents);

/**
 * @openapi
 * /api/v1/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     description: Deletes an existing student by their ID.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student to delete.
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', authenticate, authorize('schooladmin', 'admin'), removeStudent);

module.exports = router;
