const classroomService = require('../../services/classroomService');
const { validateClassroom } = require('../../utils/validate');

jest.mock('../../models/Classroom');
jest.mock('../../utils/validate');

describe('Classroom Service', () => {
  describe('createClassroom', () => {
    it('should throw an error if validation fails', async () => {
      const classroomData = { name: 'Class A' };
      validateClassroom.mockReturnValue({ error: { details: [{ message: 'Invalid data' }] } });

      await expect(classroomService.createClassroom(classroomData)).rejects.toThrow('Invalid data');
    });
  });

  describe('updateClassroom', () => {
    it('should throw an error if validation fails', async () => {
      const classroomData = { name: 'Class B' };
      validateClassroom.mockReturnValue({ error: { details: [{ message: 'Invalid data' }] } });

      await expect(classroomService.updateClassroom('1', classroomData)).rejects.toThrow('Invalid data');
    });
  });
});
