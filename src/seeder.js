const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const School = require('./models/School');
const Classroom = require('./models/Classroom');
const User = require('./models/User');
const Student = require('./models/Student');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const schoolsData = JSON.parse(fs.readFileSync('./_data/schools.json', 'utf-8'));
const classroomsData = JSON.parse(fs.readFileSync('./_data/classrooms.json', 'utf-8'));
const usersData = JSON.parse(fs.readFileSync('./_data/users.json', 'utf-8'));
const studentsData = JSON.parse(fs.readFileSync('./_data/students.json', 'utf-8'));

const importData = async () => {
  try {
    const schools = await School.create(schoolsData);
    const findSchoolByIdOrName = (schoolIdentifier) => {
      const isObjectId = mongoose.Types.ObjectId.isValid(schoolIdentifier);

      return schools.find((school) =>
        isObjectId ? school._id.toString() === schoolIdentifier : school.name === schoolIdentifier
      );
    };

    const classroomsWithRefs = classroomsData.map((classroom) => {
      const school = findSchoolByIdOrName(classroom.school);
      if (!school) {
        throw new Error(`School "${classroom.school}" not found for classroom "${classroom.name}"`);
      }

      return { ...classroom, school: school._id };
    });
    const classrooms = await Classroom.create(classroomsWithRefs);

    const studentsWithRefs = studentsData.map((student) => {
      const school = findSchoolByIdOrName(student.school);
      const classroom = classrooms.find((classroom) => classroom.name === student.classroom);
      if (!school) {
        throw new Error(`School "${student.school}" not found for student "${student.firstName} ${student.lastName}"`);
      }

      if (!classroom) {
        throw new Error(`Classroom "${student.classroom}" not found for student "${student.firstName} ${student.lastName}"`);
      }

      return { ...student, school: school._id, classroom: classroom._id };
    });
    await Student.create(studentsWithRefs);

    const usersWithRefs = usersData.map((user) => {
      const school = findSchoolByIdOrName(user.associatedSchool);
      if (!school) {
        throw new Error(`School "${user.associatedSchool}" not found for user "${user.username}"`);
      }

      return { ...user, associatedSchool: school._id };
    });
    await User.create(usersWithRefs);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (err) {
    console.error(`Error importing data: ${err.message}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await School.deleteMany();
    await Classroom.deleteMany();
    await User.deleteMany();
    await Student.deleteMany();

    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Check database before seeding data
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
