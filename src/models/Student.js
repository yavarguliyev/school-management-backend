const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School', // Reference to the School model
      required: true,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom', // Reference to the Classroom model
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    transferred: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
