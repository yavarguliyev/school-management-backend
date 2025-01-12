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

/**
 * @openapi
 * /api/v1/classes:
 *   post:
 *     summary: Create a new classroom
 *     description: Creates a new classroom with the provided data.
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the classroom.
 *               capacity:
 *                 type: integer
 *                 description: The maximum number of students in the classroom.
 *     responses:
 *       201:
 *         description: Classroom created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 capacity:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', authenticate, authorize('schooladmin'), createNewClassroom);

/**
 * @openapi
 * /api/v1/classes/{id}:
 *   put:
 *     summary: Update an existing classroom
 *     description: Updates an existing classroom by ID.
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the classroom to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Classroom updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Classroom not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/:id', authenticate, authorize('schooladmin'), updateExistingClassroom);

/**
 * @openapi
 * /api/v1/classes/{id}:
 *   get:
 *     summary: Get a classroom by ID
 *     description: Retrieve the details of a classroom by its ID.
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the classroom to retrieve.
 *     responses:
 *       200:
 *         description: Classroom details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 capacity:
 *                   type: integer
 *       404:
 *         description: Classroom not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticate, getClassroom);

/**
 * @openapi
 * /api/v1/classes:
 *   get:
 *     summary: List all classrooms
 *     description: Retrieve a list of all classrooms.
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of classrooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   capacity:
 *                     type: integer
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, authorize('schooladmin'), listAllClassrooms);

/**
 * @openapi
 * /api/v1/classes/{id}:
 *   delete:
 *     summary: Delete a classroom
 *     description: Deletes an existing classroom by its ID.
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the classroom to delete.
 *     responses:
 *       200:
 *         description: Classroom deleted successfully
 *       404:
 *         description: Classroom not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', authenticate, authorize('schooladmin'), removeClassroom);

module.exports = router;
