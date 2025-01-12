const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const School = require('../../src/models/School');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
});

describe('School Model', () => {
  it('should not save a school without required fields', async () => {
    const school = new School({});
    await expect(school.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('should save a school with valid fields', async () => {
    const school = new School({
      name: 'Test School',
      address: '123 Test St',
      contactNumber: '1234567890',
      email: 'test@school.com',
    });
    const savedSchool = await school.save();
    expect(savedSchool._id).toBeDefined();
    expect(savedSchool.name).toBe('Test School');
  });
});
