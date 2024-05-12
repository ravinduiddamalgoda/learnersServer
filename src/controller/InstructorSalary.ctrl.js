const InstructorSalaryService = require('../service/InstructorSalary.service');

const addInstructorSalary = async (req, res) => {
    try {
        const { InstructorID } = req.body;
        const data = await InstructorSalaryService.addInstructorSalary(InstructorID);
        res.status(201).json(data);
    } catch (error) {
        console.error("Error in addInstructorSalary:", error);
        res.status(400).json({ message: error.message });
    }
};

const getInstructorSalary = async (req, res) => {
    try {
        const { InstructorID } = req.params;
        const data = await InstructorSalaryService.getInstructorSalary(InstructorID);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getInstructorSalary:", error);
        res.status(500).json({ message: error.message });
    }
};

const getAllInstructorSalary = async (req, res) => {
    try {
        const data = await InstructorSalaryService.getAllInstructorSalary();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getAllInstructorSalary:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addInstructorSalary,
    getInstructorSalary,
    getAllInstructorSalary
}