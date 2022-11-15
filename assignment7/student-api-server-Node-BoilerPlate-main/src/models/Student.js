const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    currentClass: { type: Number, required: true },
    division: { type: String, required: true },
});

const Student = mongoose.model('students', studentSchema);

module.exports = Student;
