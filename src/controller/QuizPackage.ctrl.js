const QuizPackageService = require('../service/QuizPackage.service');


const addQuizPackage = async (req, res) => {
    try{
        const { quizPackage, quizzes } = req.body;
        const newQuizPackage = await QuizPackageService.addQuizPackage(quizPackage, quizzes);
        if(newQuizPackage){
            res.status(201).json(newQuizPackage);
        }else{
            res.status(400).json({message: 'Failed to add the quiz package'});
        }
    }catch(err){
        console.error('Error in addQuizPackage:', err);
        throw err;
    }
}


const getQuizPackage = async (req, res) => {
    try{
        const id = req.params.id;
        const quizPackage = await QuizPackageService.getQuizPackage(id);
        if(quizPackage){
            res.status(200).json(quizPackage);
        }else{
            res.status(404).json({message: 'Quiz package not found'});
        }
    }catch(err){
        console.error('Error in getQuizPackage:', err);
        throw err;
    }
}


const getQuizPackages = async (req, res) => {
    try{
        const quizPackages = await QuizPackageService.getQuizPackages();
        if(quizPackages){
            res.status(200).json(quizPackages);
        }else{
            res.status(404).json({message: 'No quiz packages found'});
        }
    }catch(err){
        console.error('Error in getQuizPackages:', err);
        throw err;
    }
}


const updateQuizzes = async (req, res) => {
    try{
        const id = req.params.id;
        const quiz = req.body.quiz;
        const updatedQuizPackage = await QuizPackageService.updateQuizzes(id, quiz);
        if(updatedQuizPackage){
            res.status(200).json(updatedQuizPackage);
        }else{
            res.status(400).json({message: 'Failed to update the quizzes'});
        }
    }catch(err){
        console.error('Error in updateQuizzes:', err);
        throw err;
    }
}


const updateQuizPackage = async (req, res) => {
    try{
        const id = req.params.id;
        const { quizPackage, quizzes } = req.body;
        const updatedQuizPackage = await QuizPackageService.updateQuizPackage(id, quizPackage, quizzes);
        if(updatedQuizPackage){
            res.status(200).json(updatedQuizPackage);
        }else{
            res.status(400).json({message: 'Failed to update the quiz package'});
        }
    }catch(err){
        console.error('Error in updateQuizPackage:', err);
        throw err;
    }
}

const deleteQuizPackage = async (req, res) => {
    try{
        const id = req.params.id;
        const deletedQuizPackage = await QuizPackageService.deleteQuizPackage(id);
        if(deletedQuizPackage){
            res.status(200).json({message: 'Quiz package deleted successfully'});
        }else{
            res.status(400).json({message: 'Failed to delete the quiz package'});
        }
    }catch(err){
        console.error('Error in deleteQuizPackage:', err);
        throw err;
    }
}

module.exports ={
    addQuizPackage,
    getQuizPackage,
    getQuizPackages,
    updateQuizzes,
    updateQuizPackage,
    deleteQuizPackage
}