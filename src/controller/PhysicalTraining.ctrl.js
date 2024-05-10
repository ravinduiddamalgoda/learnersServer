const PhysicalTrainingService = require('../service/PhysicalTraining.service')
const mail = require('../service/SendEmail');
const UserServices = require('../service/User.service');
const notify = require('../service/SendSMS');

const addPTS = async (req , res) => {
    try{
        const {date , time , location , vehicleID , instructorID ,  maxCount, instructorQualification} = req.body;
        const newPTS = await PhysicalTrainingService.AddPhysicalTraining(date , time , location , vehicleID , instructorID , maxCount , instructorQualification); 
        if(newPTS){
            res.status(201).json(newPTS);
        }
        const userData = await UserServices.getUsers();
        userData.map(
            async (user) => {
                const email = user.email;
                const subject = 'Physical Training Session';
                const text = `New Physical Training Session is Scheduled on ${date} at ${time} in ${location}.If you interested you can join with US.`;
                await mail.sendmail(email, subject, text);
                const textMsg = `Physical Training Session Scheduled on ${date} at ${time} in ${location}.`;
                await notify.sendNotification(user.phoneNumber, textMsg);
            }
        )
    }catch(err){
        console.error('Error in addPTS:', err);
        res.status(400).json({message: 'Failed to add the Physical Training Session'});    
        throw err;
    }

}

const updatePTS = async (req , res) => {
    try{
        const id = req.params.id;
        const {date , time , location , vehicleID , instructorID ,  maxCount , currentCount} = req.body;
        const updatedPTS = await PhysicalTrainingService.UpdatePhysicalTrainingSession(id , date , time , location , vehicleID , instructorID , maxCount , currentCount);
        if(updatedPTS){
            res.status(200).json(updatedPTS);
        }else{
            res.status(400).json({message: 'Failed to update the Physical Training Session'});
        }
    }catch(err){
        console.error('Error in updatePTS:', err);
        throw err;
    }
}

const deletePTS = async (req , res) => {
    try{
        const id = req.params.id;
        await PhysicalTrainingService.DeletePhysicalTrainingSession(id);
        res.status(200).json({message: 'Physical Training Session deleted successfully'});
    }catch(err){
        console.error('Error in deletePTS:', err);
        res.status(400).json({message: 'Failed to delete the Physical Training Session'});
        throw err;
    }
}

const getPTS = async (req , res) => {
    try{
        const id = req.params.id;
        const PTS = await PhysicalTrainingService.GetPhysicalTrainingSession(id);
        if(PTS){
            res.status(200).json(PTS);
        }else{
            res.status(404).json({message: 'Physical Training Session not found'});
        }
    }catch(err){
        console.error('Error in getPTS:', err);
        throw err;
    }
}

const getAllPTS =  async (req , res) => {
    try{
        const PTS = await PhysicalTrainingService.GetPhysicalTrainingSession();
        if(PTS){
            res.status(200).json(PTS);
        }else{
            res.status(404).json({message: 'No Physical Training Sessions found'});
        }
    }catch(err){
        console.error('Error in getAllPTS:', err);
        throw err;
    }
}

const getPTSByInstructor = async (req , res) => {
    try{
        const id = req.params.id;
        const PTS = await PhysicalTrainingService.GetPhysicalTrainingSessionByInstructor(id);
        if(PTS){
            res.status(200).json(PTS);
        }else{
            res.status(404).json({message: 'No Physical Training Sessions found'});
        }
    }catch(err){
        console.error('Error in getPTSByInstructor:', err);
        throw err;
    }
}

const getPTSByVehicle = async (req , res) => {
    try{
        const id = req.params.id;
        const PTS = await PhysicalTrainingService.GetPhysicalTrainingSessionByVehicle(id);
        if(PTS){
            res.status(200).json(PTS);
        }else{
            res.status(404).json({message: 'No Physical Training Sessions found'});
        }
    }catch(err){
        console.error('Error in getPTSByVehicle:', err);
        throw err;
    }
}

module.exports = {
    addPTS,
    updatePTS,
    deletePTS,
    getPTS,
    getAllPTS,
    getPTSByInstructor,
    getPTSByVehicle
}