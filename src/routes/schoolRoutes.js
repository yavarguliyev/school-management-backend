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

/**
 * @openapi
 * /api/v1/schools:
 *   post:
 *     summary: Create a new school
 *     description: Creates a new school with the provided data.
 *     tags: [Schools]
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
 *                 description: The name of the school.
 *               address:
 *                 type: string
 *                 description: The address of the school.
 *               contactNumber:
 *                 type: string
 *                 description: The contact number of the school.
 *     responses:
 *       201:
 *         description: School created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 contactNumber:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', authenticate, authorize('superadmin', 'admin'), createNewSchool);

/**
 * @openapi
 * /api/v1/schools/{id}:
 *   put:
 *     summary: Update an existing school
 *     description: Updates an existing school by ID.
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the school to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: School updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: School not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/:id', authenticate, authorize('superadmin', 'admin'), updateExistingSchool);

/**
 * @openapi
 * /api/v1/schools/{id}:
 *   get:
 *     summary: Get a school by ID
 *     description: Retrieve the details of a school by its ID.
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the school to retrieve.
 *     responses:
 *       200:
 *         description: School details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 contactNumber:
 *                   type: string
 *       404:
 *         description: School not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticate, getSchool);

/**
 * @openapi
 * /api/v1/schools:
 *   get:
 *     summary: List all schools
 *     description: Retrieve a list of all schools.
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of schools
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
 *                   address:
 *                     type: string
 *                   contactNumber:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, listAllSchools);

/**
 * @openapi
 * /api/v1/schools/{id}:
 *   delete:
 *     summary: Delete a school
 *     description: Deletes an existing school by its ID.
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the school to delete.
 *     responses:
 *       200:
 *         description: School deleted successfully
 *       404:
 *         description: School not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', authenticate, authorize('superadmin', 'admin'), removeSchool);

module.exports = router;
