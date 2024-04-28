
const EnrollPTS = require('../models/EnrollPTS');

const addEnrollPTS = async (userID, sessionID) => {
    try {
        const newEnrollPTS = new EnrollPTS({
            userID,
            sessionID
        });
        return await newEnrollPTS.save();
    } catch (error) {
        console.error("Error in addEnrollPTS:", error);
        throw error;
    }
}

const getEnrollPTS = async (id) => {
    try {
        const data = await EnrollPTS.findOne({userID:id});
        return data;
    }catch(err){
        console.error('Error in getEnrollPTS:', err);
        throw err;
    }
}


const getEnrollPTSById = async (id) => {
    try {
        const data = await EnrollPTS.findById(id);
        return data;
    }catch(err){
        console.error('Error in getEnrollPTS:', err);
        throw err;
    }
}

const getEnrollPTSBySessionID = async (id) => {
    try {
        const data = await EnrollPTS.find({sessionID : id});
        return data;
    }catch(err){
        console.error('Error in getEnrollPTS:', err);
        throw err;
    }
}

const getAllEnrollPTS  = async () => {
    try {
        const data = await EnrollPTS.find();
        return data;
    }catch(err){
        console.error('Error in getEnrollPTS:', err);
        throw err;
    }
}

const deleteEnrollByID = async (id) => {
    try {
        const data = await EnrollPTS.findByIdAndDelete(id);
        if(data){
            return data;
        }else{
            throw new Error('No Data found');
        }
    }catch(err){
        console.error('Error in getEnrollPTS:', err);
        throw err;
    }
}

const getPTSBySessionID = async (id) => {
    try {
        const data = await EnrollPTS.findOne({sessionID : id});
        return data;
    }catch(err){
        console.error('Error in getEnrollPTS:', err);
        throw err;
    }
}
module.exports = {
    addEnrollPTS,
    getEnrollPTS,
    getEnrollPTSById,
    getEnrollPTSBySessionID ,
    getAllEnrollPTS,
    deleteEnrollByID
}