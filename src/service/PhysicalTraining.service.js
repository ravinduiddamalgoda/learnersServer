const PhysicalTraining = require("../models/PhysicalTraining");

async function findID(accNo) {
  const existingAccount = await PhysicalTraining.findOne({
    sessionID: accNo,
  });
  if(!existingAccount)
      return true
    else
      return false
}

function generateID() {
  let chars = "1234567890";
  let accID = "QP";
  for (let i = 0; i < 6; i++) {
    accID += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const existingAccNO =  findID(accID);
  if (!existingAccNO) {
    return generateID();
  } else {
    return accID;
  }
}
const AddPhysicalTraining = async (
  date,
  time,
  location,
  vehicleID,
  instructorID,
  maxCount
) => {
  const sessionID = generateID();
  try {
    const newPhysicalTraining = new PhysicalTraining({
      sessionID,
      date,
      time,
      location,
      vehicleID,
      instructorID,
      maxCount,
    });
    return await newPhysicalTraining.save();
  } catch (error) {
    console.error("Error in addPhysicalTraining:", error);
    throw error;
  }
};

const UpdatePhysicalTrainingSession = async (
  id,
  date,
  time,
  vehicleID,
  instructorID,
  location,
  maxcount ,
  currentCount
) => {
    try{
         await PhysicalTraining.findOneAndUpdate({sessionID: id},{date,time,vehicleID,instructorID,location,maxCount: maxcount , currentCount},{new: true});
        // return data;
        const data = await PhysicalTraining.findOne({sessionID : id});
        return data;
    }catch(err){
        console.error('Error in updatePhysicalTrainingSession:', err);
        throw err;
    } 
};

const DeletePhysicalTrainingSession = async (id) => {
    try{
    await PhysicalTraining.findOneAndDelete({sessionID:id});
    }catch(err){
        console.log('Error in Delete :' , err);
        throw err;
    }    
}


const GetPhysicalTrainingSession = async () => {
    try{
        const data = await PhysicalTraining.find()
        return data
    }catch(err){
        console.log("error in get all : " , error);
        throw err;
    }
}

const GetPTSByID = async (id) => {
    try{ 
        const data =  await PhysicalTraining.findOne({sessionID:id});

        return data;
    }catch(err){
        console.log('error in get by ID' , err);
    }
}

const GetPhysicalTrainingSessionByInstructor = async (id) => {
    try{
        const data = await PhysicalTraining.find({instructorID:id});
        // return data;
        if(data){
            return data;
        }else {
            throw new Error("No Physical Training Sessions found");
        }
    }catch(err){
        console.log('Error in getPTSByInstructor:', err);
        throw err;
    }

}

const GetPhysicalTrainingSessionByVehicle = async (id) => {
    try{
        const data = await PhysicalTraining.find({vehicleID:id});
        // return data;
        if(data){
            return data;
        }else {
            throw new Error("No Physical Training Sessions found");
        }
    }catch(err){
        console.log('Error in getPTSByVehicle:', err);
        throw err;
    }

}


module.exports = {
    AddPhysicalTraining ,
    UpdatePhysicalTrainingSession ,
    DeletePhysicalTrainingSession , 
    GetPhysicalTrainingSession ,
    GetPTSByID ,
    GetPhysicalTrainingSessionByInstructor ,
    GetPhysicalTrainingSessionByVehicle
}

