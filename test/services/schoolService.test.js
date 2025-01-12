const schoolService = require('../../src/services/schoolService');
const { validateSchool } = require('../../src/utils/validate');

jest.mock('../../src/models/School');
jest.mock('../../src/utils/validate');

describe('School Service', () => {
  describe('createSchool', () => {
    it('should throw an error if validation fails', async () => {
      const schoolData = { name: 'School A' };
      validateSchool.mockReturnValue({ error: { details: [{ message: 'Invalid data' }] } });

      await expect(schoolService.createSchool(schoolData)).rejects.toThrow('Invalid data');
    });
  });

  describe('updateSchool', () => {
    it('should throw an error if validation fails', async () => {
      const schoolData = { name: 'Updated School' };
      validateSchool.mockReturnValue({ error: { details: [{ message: 'Invalid data' }] } });

      await expect(schoolService.updateSchool('1', schoolData)).rejects.toThrow('Invalid data');
    });
  });
});
