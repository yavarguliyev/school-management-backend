const mongoose = require('mongoose');
const connectDB = require('../../config/db');

require('dotenv').config({ path: '.env.test' });

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectDB', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to MongoDB successfully', async () => {
    mongoose.connect.mockResolvedValueOnce();

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
    expect(consoleLogSpy).toHaveBeenCalledWith('MongoDB connected successfully');

    consoleLogSpy.mockRestore();
  });

  it('should log an error and exit the process when connection fails', async () => {
    const errorMessage = 'Connection failed';
    mongoose.connect.mockRejectedValueOnce(new Error(errorMessage));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error connecting to MongoDB:', errorMessage);
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});
