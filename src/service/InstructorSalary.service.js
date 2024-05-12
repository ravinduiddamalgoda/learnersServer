const InstructorSalary = require('../models/InstructorSalary');

const addInstructorSalary = async (InstructorID) => {
    const instructorSalary = new InstructorSalary({
        InstructorID
    });
    return await instructorSalary.save();
}

const getInstructorSalary = async (InstructorID) => {
    return await InstructorSalary.find({ InstructorID });
}

const getAllInstructorSalary = async () => {
    return await InstructorSalary.find();
}

module.exports = {
    addInstructorSalary,
    getInstructorSalary,
    getAllInstructorSalary
}
