const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../src/models/User');

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

describe('User Model', () => {
  it('should hash the password before saving', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@user.com',
      password: 'password123',
      role: 'teacher',
    });

    const savedUser = await user.save();
    expect(savedUser.password).not.toBe('password123');
  });

  it('should compare passwords correctly', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@user.com',
      password: 'password123',
      role: 'teacher',
    });

    const savedUser = await user.save();
    const isMatch = await savedUser.matchPassword('password123');
    expect(isMatch).toBe(true);
  });
});
