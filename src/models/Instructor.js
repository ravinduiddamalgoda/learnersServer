const mongoose = require('mongoose');

const InstructorSchema =new mongoose.Schema({
    InstructorID:{
        type: String,
        unique: true,
        require:true
    } ,
    InstructorName:{
        type: String , 
        require:true
    } ,
    InstructorEmail: {
        type:String,
        require:true , 
        unique: true,
    } , 

    InstructorLocation:{
        type:String , 
        require: true
    } ,
    
    InstructorExpierince:{
        type:Number, 
        require: true
    } , 
    InstructorPassword:{
        type:String , 
        require: true
    }

});