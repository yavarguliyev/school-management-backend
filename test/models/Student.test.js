const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const School = require('../../models/School');
const Classroom = require('../../models/Classroom');
const Student = require('../../models/Student');

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

describe('Student Model', () => {
  it('should not save a student without required fields', async () => {
    const student = new Student({});
    await expect(student.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('should save a student with valid fields', async () => {
    const school = await new School({
      name: 'Test School',
      address: '123 Test St',
      contactNumber: '1234567890',
      email: 'test@school.com',
    }).save();

    const classroom = await new Classroom({
      name: 'Class A',
      capacity: 30,
      resources: ['Projector'],
      school: school._id,
    }).save();

    const student = new Student({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('2000-01-01'),
      school: school._id,
      classroom: classroom._id,
    });

    const savedStudent = await student.save();
    expect(savedStudent._id).toBeDefined();
    expect(savedStudent.school).toEqual(school._id);
    expect(savedStudent.classroom).toEqual(classroom._id);
  });
});
