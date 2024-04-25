const QuizModel =  require("../models/Quiz");

const addQuiz = async (quiz , answer1 , answer2 , answer3 , answer4, correctAnswer)=>
{
    const newQuiz = new QuizModel({
        quiz: quiz,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
        correctAnswer: correctAnswer
    });

    try{
        await newQuiz.save();
        return newQuiz;
    }catch(err){
        console.error(err);
        return null;
    }
    
}

const getQuiz = async (id)=>{
    try{
        const quiz = await QuizModel.findById(id);
        return quiz;
    }catch(err){
        console.error(err);
        return null;
    }
}

const getAllQuizes = async ()=>{
    try{
        const quizes = await QuizModel.find();
        return quizes;
    }catch(err){
        console.error(err);
        return null;
    }
}

const updateQuiz = async (id , quiz , answer1 , answer2 , answer3 , answer4, correctAnswer)=>{
    try{
        const updatedQuiz = await QuizModel.findByIdAndUpdate(id,{
            quiz: quiz,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4,
            correctAnswer: correctAnswer
        },{new: true});
        return updatedQuiz;
    }catch(err){
        console.error(err);
        return null;
    }
}

const deleteQuiz = async (id)=>{
    try{
        const quiz = await QuizModel.findByIdAndDelete(id);
        return quiz;
    }catch(err){
        console.error(err);
        return null;
    }
}

module.exports = {
    addQuiz,
    getQuiz,
    getAllQuizes,
    updateQuiz,
    deleteQuiz
}