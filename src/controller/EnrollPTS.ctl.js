const EnrollPTSService = require('../service/EnrollPTS.service');
const PhysicalTrainingService = require('../service/PhysicalTraining.service');
const UserServices = require('../service/User.service');
const mail = require('../service/SendEmail');
const notify = require('../service/SendSMS');

const enrollPTS = async (req, res) => {
    try {
        const { userID, sessionID } = req.body;
        const data = await EnrollPTSService.addEnrollPTS(userID, sessionID);
        const session = await PhysicalTrainingService.GetPTSByID(sessionID);
        session.currentCount += 1;
        await session.save();
        const userData = await UserServices.getUserProfile(userID);
        const sessionData = await PhysicalTrainingService.GetPTSByID(sessionID);
        const email = userData.email;
        const subject = 'Physical Training Session';
        const text = `You have successfully enrolled in the Physical Training Session on ${sessionData.date.toISOString().split("T")[0]} at ${sessionData.time} in ${session.location}.`;
        //console.log("date:", sessionData.date.toISOString().split("T")[0]);
        await mail.sendmail(email, subject, text);
        await notify.sendNotification(userData.phoneNumber, text);

        res.status(201).json(session);
    } catch (error) {
        console.error("Error in enrollPTS:", error);
        res.status(500).json({ message: error.message });
    }
}

const getAllEnrollPTS = async (req, res) => {
    try {
        const data = await EnrollPTSService.getAllEnrollPTS();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getAllEnrollPTS:", error);
        res.status(500).json({ message: error.message });
    }
}

const deleteByStudentID = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await EnrollPTSService.deleteEnrollByStudentID(id);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in deleteByStudentID:", error);
        res.status(500).json({ message: error.message });
    }
}
const getEnrollPTSBySessionID = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await EnrollPTSService.getEnrollPTSBySessionID(id);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getEnrollPTSBySessionID:", error);
        res.status(500).json({ message: error.message });
    }

}

module.exports = {
    enrollPTS,
    getAllEnrollPTS,
    deleteByStudentID,
    getEnrollPTSBySessionID
}
