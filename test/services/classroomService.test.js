const classroomService = require('../../src/services/classroomService');
const { validateClassroom } = require('../../src/utils/validate');

jest.mock('../../src/models/Classroom');
jest.mock('../../src/utils/validate');

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
