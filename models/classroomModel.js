const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    resources: [String], // Array of resources (e.g., projectors, computers)
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School', // Reference to the School model
      required: true,
    },
  },
  { timestamps: true }
);

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
