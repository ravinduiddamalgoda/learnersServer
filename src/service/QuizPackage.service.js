const QuizPackage = require('../models/QuizPackage');

async function findID(accNo){
    const existingAccount = await QuizPackage.findOne({quizPackageID: accNo}).exec();
    return !existingAccount;
}

async function generateID() {
    let chars = '1234567890';
    let accID = 'QP';
    for (let i = 0; i < 6; i++) {
        accID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    const existingAccNO = await findID(accID);
    if (!existingAccNO) {
        return generateID();
    } else {
        return accID;
    }
}

const addQuizPackage = async (quizPackage, quizzes) => {   
    try {
        const quizPackageID = await generateID();
        const newQuizPackage = new QuizPackage({quizPackageID, quizPackage, quizzes});
        return await newQuizPackage.save();
    } catch (error) {
        console.error('Error in addQuizPackage:', error);
        throw error; 
    }
}

const getQuizPackage = async (id) => {
    try {
        const data = await QuizPackage.findOne({quizPackageID: id});
        return data;
    } catch (err) {
        console.error('Error in getQuizPackage:', err);
        throw err;
    }
}

const getQuizPackages = async () => {
    try {
        const data = await QuizPackage.find();
        return data;
    } catch (err) {
        console.error('Error in getQuizPackages:', err);
        throw err;
    }
}

const updateQuizzes = async (id, quiz) => {
    try {
        return await QuizPackage.findOneAndUpdate(
            {quizPackageID: id}, 
            {$push: {quizzes: quiz}},
            {new: true}
        );
    } catch (err) {
        console.error('Error in updateQuizzes:', err);
        throw err;
    }
}

const updateQuizPackage = async (id, quizPackage, quizzes) => {
    try {
        return await QuizPackage.findOneAndUpdate(
            {quizPackageID: id}, 
            {quizPackage, quizzes},
            {new: true}
        );
    } catch (err) {
        console.error('Error in updateQuizPackage:', err);
        throw err;
    }
}

const deleteQuizPackage = async (id) => {
    try {
        return await QuizPackage.findOneAndDelete({quizPackageID: id});
    } catch (err) {
        console.error('Error in deleteQuizPackage:', err);
        throw err;
    }
}

module.exports = {
    addQuizPackage,
    getQuizPackage,
    getQuizPackages,
    updateQuizPackage,
    deleteQuizPackage,
    updateQuizzes
};
