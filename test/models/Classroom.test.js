const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const School = require('../../models/School');
const Classroom = require('../../models/Classroom');

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

describe('Classroom Model', () => {
  it('should not save a classroom without required fields', async () => {
    const classroom = new Classroom({});
    await expect(classroom.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('should save a classroom with valid fields', async () => {
    const school = await new School({
      name: 'Test School',
      address: '123 Test St',
      contactNumber: '1234567890',
      email: 'test@school.com',
    }).save();

    const classroom = new Classroom({
      name: 'Class A',
      capacity: 30,
      resources: ['Projector', 'Whiteboard'],
      school: school._id,
    });

    const savedClassroom = await classroom.save();
    expect(savedClassroom._id).toBeDefined();
    expect(savedClassroom.school).toEqual(school._id);
  });
});
