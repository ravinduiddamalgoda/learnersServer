const EnrollPTS = require('../models/EnrollPTS');

// Controller function to generate the report
exports.generateReport = async (req, res) => {
    console.log("report")
    try {
        const sessionReport = await EnrollPTS.aggregate([
            {
                $group: {
                    _id: "$sessionID",
                    date: { $first: "$date" },
                    numStudents: { $sum: 1 }
                }
            }
        ]);

        res.json(sessionReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
