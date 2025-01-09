const studentService = require('../../services/studentService');
const Student = require('../../models/Student');
const { validateStudent } = require('../../utils/validate');

jest.mock('../../models/Student');
jest.mock('../../utils/validate');

describe('Student Service', () => {
  describe('createStudent', () => {
    it('should throw an error if validation fails', async () => {
      const studentData = { firstName: 'John' };
      validateStudent.mockReturnValue({ error: { details: [{ message: 'Invalid data' }] } });

      await expect(studentService.createStudent(studentData)).rejects.toThrow('Invalid data');
    });
  });

  describe('updateStudent', () => {
    it('should throw an error if validation fails', async () => {
      const studentData = { firstName: 'Jane' };
      validateStudent.mockReturnValue({ error: { details: [{ message: 'Invalid data' }] } });

      await expect(studentService.updateStudent('1', studentData)).rejects.toThrow('Invalid data');
    });

    it('should update a student successfully', async () => {
      const studentData = { firstName: 'Jane', lastName: 'Doe' };
      const updatedStudent = { _id: '1', firstName: 'Jane', lastName: 'Doe' };
      validateStudent.mockReturnValue({ error: null });
      Student.findByIdAndUpdate.mockResolvedValue(updatedStudent);

      const result = await studentService.updateStudent('1', studentData);
      expect(result.firstName).toBe('Jane');
    });
  });
});
